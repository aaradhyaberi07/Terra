from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('profile/', ProfileGetView.as_view(), name="profile"),
    path('profile/<str:owner_id__username>',
         ProfileUpdateView.as_view(),
         name="profile"),
    path('login/', LoginApiView.as_view(), name="login"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]