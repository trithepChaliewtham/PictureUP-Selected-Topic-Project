from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('csrf', views.get_csrf, name='csrf'),
    path('login', views.login, name='login'),
    path('signup', views.signup, name='signup'),
    path('api/picture/', views.PictureList.as_view()),
]