from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/picture/', views.PictureList.as_view()),
    # path('test', views.test, name='test'),
]