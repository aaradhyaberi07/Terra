from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField
from .models import User, Profile
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_decode
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
import requests, json
from .exception import *
import re


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68,
                                     min_length=6,
                                     write_only=True)
    type = serializers.CharField(required=True, max_length = 1)

    class Meta:
        model = User
        fields = ['email', 'username', 'type','password']

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')
        type = attrs.get('type', None)
        print(type)
        if type == None:
            return ValidationException("Type is not provided.")
        # if not username.isalnum():
        #     raise ValidationException("The username should only contain alphanumeric characters")
        if re.match(r'^(?![-._])(?!.*[_.-]{2})[\w.-]{1,75}(?<![-._])$',
                    username) is None:
            raise ValidationException("Username is invalid")
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            type = validated_data['type'])
        user.set_password(validated_data['password'])
        user.save()
        return user



class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=68,
                                     min_length=6,
                                     write_only=True)
    type = serializers.CharField(max_length=1, read_only=True)
    username = serializers.CharField(max_length=100)
    tokens = serializers.SerializerMethodField()
    first_time_login = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = User.objects.get(username=obj['username'])
        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }

    def get_first_time_login(self, obj):
        qs = Profile.objects.get(owner__username=obj['username'])
        if qs.name is None:
            return True
        return False

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password','type' , 'tokens', 'first_time_login'
        ]

    def validate(self, attrs):
        username = attrs.get('username', '')
        password = attrs.get('password', '')
        # type = attrs.get('type',None)
        # if type == None:
        #     return ValidationException("Type is not provided.")
        user_obj_email = User.objects.filter(email=username).first()
        user_obj_username = User.objects.filter(username=username).first()
        if user_obj_email:
            user = auth.authenticate(username=user_obj_email.username,
                                     password=password)
            if user_obj_email.auth_provider != 'email':
                raise AuthenticationException(
                    'Please continue your login using ' +
                    user_obj_email.auth_provider)
            if not user:
                raise AuthenticationException('Invalid credentials. Try again')
            if not user.is_active:
                raise AuthenticationException(
                    'Account disabled. contact admin')
            return {
                'email': user.email,
                'username': user.username,
                'type' : user.type,
                'tokens': user.tokens
            }
            return super().validate(attrs)
        if user_obj_username:
            user = auth.authenticate(username=username, password=password)
            if not user:
                raise AuthenticationException('Invalid credentials. Try again')
            if not user.is_active:
                raise AuthenticationException(
                    'Account disabled. contact admin')
            return {
                'email': user.email,
                'username': user.username,
                'type' : user.type,
                'tokens': user.tokens
            }
            return super().validate(attrs)
        raise AuthenticationException('Invalid credentials. Try again')


class ProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required = True)
    sex = serializers.CharField(required=True)
    age = serializers.IntegerField(required=True)
    hospital_name = serializers.CharField(required=False)
    hospital_address = serializers.CharField(required = False)
    

    class Meta:
        model = Profile
        fields = [
            'name',
            'age',
            'sex',
            'hospital_name',
            'hospital_address'
        ]