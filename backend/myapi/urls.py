from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    # path('', views.index, name='index'),
    path('fetchone', views.fetchOne , name='fetchone'),
    path('isauth' , views.isAuthenticated, name="isauth"),
    path('userprofile', views.userprofile, name="userprofile"),
    path('editprofile', views.editprofile, name='editprofile'),
    path('csrf', views.get_csrf, name='csrf'),
    path('upload', views.uploadpicture, name="upload"),
    path('login', views.userlogin, name='login'),
    path('signup', views.signup, name='signup'),
    path('api/picture/', views.ImageuploadList.as_view()),
    path('logout', auth_views.LogoutView.as_view(), name='logout'),
]