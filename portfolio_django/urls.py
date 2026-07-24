from django.contrib import admin
from django.urls import path
from portfolio_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('api/projects/', views.api_projects, name='api_projects'),
    path('api/contact/', views.api_contact, name='api_contact'),
]
