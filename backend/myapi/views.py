from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.contrib.auth import authenticate, login
from .serializers import PictureSerializer
from .models import Picture
from rest_framework import generics
import json


class PictureList(generics.ListAPIView):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer

    # Only an authenticated user can access this API endpoint
    # permission_classes = [permissions.IsAuthenticated]
    
# Create your views here.
def index(request):
	print("index")
	data = {
		"msg":"Please let me fetch this data",
		"2":"Hope you can get what you want",
	}
	return JsonResponse(data)

def get_csrf(request):
	response = JsonResponse({'Info' : 'Success - Set CSRF cookie'})
	response["X-CSRFToken"] = get_token(request)
	return response

def login(request):
	ok = { 'status' : 200}
	bad = { 'status' : 400}
	unknow = {'status' : 'unknow'}
	if request.user.is_authenticated:
		return JsonResponse(ok) # ok status 200
	if request.method == 'POST':
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(request, username=username, password=password)
		if user is not None:
			login(request, user)
			return JsonResponse(ok)
	else:
		# messages.error(request, 'ชื่อผู้ใช้และรหัสผ่านของคุณไม่ตรงกัน กรุณาลองอีกครั้ง.')
		return JsonResponse(bad) # Bas request status 400
	return JsonResponse(unknow)

# @required_POST
def signup(request):
	temp = {'status' : 'ready'}
	ok = { 'status' : 200}
	bad = { 'status' : 400}
	unknow = {'status' : 'unknow'}
	exist = {'status' : 'already exist'}
	passcheck = {'status' : 'must longer than 4 character'}
	print('You do it !!!!')
	# if request.method == "POST":
	# 	print(request.POST)
	return JsonResponse(temp)