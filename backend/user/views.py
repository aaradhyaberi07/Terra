from django.shortcuts import render
from rest_framework import generics, status, views
from .serializers import *
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Profile
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.conf import settings
import jwt
from .permissions import *
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.generics import UpdateAPIView, ListAPIView
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.shortcuts import redirect
from django.contrib.auth import authenticate




class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        """
        Endpoint for registering a user 
        """
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = User.objects.get(email=user_data['email'])
        user.is_verified = True
        user.save()
        return Response(user_data, status=status.HTTP_201_CREATED)


class LoginApiView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        """
        Endpoint for logging in a user
        """
        serializer = self.serializer_class(
            data=request.data,
            context={'current_site': get_current_site(request).domain})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileGetView(ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [Authenticated, IsOwner]
    queryset = Profile.objects.all()

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)


class ProfileUpdateView(UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [Authenticated, IsOwner]
    queryset = Profile.objects.all()
    lookup_field = "owner_id__username"

    def get_serializer_context(self, **kwargs):
        data = super().get_serializer_context(**kwargs)
        data['user'] = self.request.user.username
        return data

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)
