# django
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
# model and serailizer
from .serializers import ImageuploadSerializer
from .models import Imageupload
# restframework
from rest_framework import generics
# python library
import json


class ImageuploadList(generics.ListAPIView):
    queryset = Imageupload.objects.all()
    serializer_class = ImageuploadSerializer

# Create your views here.

def get_csrf(request):
	response = JsonResponse({'Info' : 'Success - Set CSRF cookie'})
	response["X-CSRFToken"] = get_token(request)
	return response

def fetchOne(request):
	response = {'Response' : 'filter picture Success', 'status' : '200' , }
	return	JsonResponse(response)

@login_required
def uploadpicture(request):
	if request.method == 'POST':
		img = Imageupload.objects.create(
			owner= request.user,
			upload_by = str(request.user),
			image = request.FILES['image'],
			alt_text = request.POST['alt_text'], 
		)	
		img.save()
		response = {'Response' : 'Upload Success !', 'status' : '201'}
		return JsonResponse(response)

@login_required
def userprofile(request):
	try:
		if request.user.is_authenticated:
			user = User.objects.get(id=request.user.id)
			response = {
				"Response" : "Already login" ,
				"status" : 200, "user" : str(user) ,
				"fisrt_name" : request.user.first_name , 
				"last_name" : request.user.last_name,
				"email" : request.user.email,
				}
			return JsonResponse(response)
		else:
			response = {"Response" : "Please log in first" , "status" : 401}			
			return JsonResponse(response)
	except Exception as err:
		response = {'Response' : 'Bad request ', 'status' : 400}
		return JsonResponse(response)

@login_required
def editprofile(request):
	if request.method == "POST":
		req = json.loads(request.body)
		user = User.objects.get(id=request.user.id)
		user.username = req['user']
		user.first_name = req['firstname']
		user.last_name = req['lastname']
		user.email = req['email']
		user.save()
		response = {'Response' : 'Accepted', 'status' : 202}
		return JsonResponse(response)
	else:
		response = {'Response' : 'Ready to edit ', 'status' : 200}
		return JsonResponse(response)


def signup(request):
	try:
		if request.method == "POST":
			req = json.loads(request.body)
			# check if user already exist
			if User.objects.filter(username=req['username']):
				response = { 'Response' : "This accoount is already exist ", 'status' : '403' }
				return JsonResponse(response)
			# otherwise create user
			else:
				user = User.objects.create_user(
					username = req["username"],
					password = req["password"],
					email = req["email"],
					first_name = req["firstname"],
					last_name = req["lastname"],
				)
				user.save()
				response = { 'Response' : "Created User Success ", 'status' : 201 }
				return JsonResponse(response)
	except Exception as track:
		response = {'Response' : 'Create User Failed! ! ', 'status' : 400}
		return JsonResponse(response)

def userlogin(request):
	if request.user.is_authenticated:
		response = {"Response" : "Already login" , "status" : 200, "user" : str(request.user)}
		return JsonResponse(response)
	if request.method == "POST":
		req = json.loads(request.body)			
		user = authenticate(request, username=req["username"], password=req["password"])
		if user is not None:
			login(request, user)
			response = {"Response" : "Login Success!" , "status" : 200, "user" : str(request.user)}			
			return JsonResponse(response)
		else:
			response = {"Response" : "Login Failed! Username or Password didn't match"	 , "Status" : 400}			
			return JsonResponse(response)
	response = {"Response" : "Please log in first" , "status" : 401}			
	return JsonResponse(response)

def isAuthenticated(request):
	if request.user.is_authenticated:
		user = User.objects.get(id=request.user.id)
		response = {"Response" : "Already login" ,
				"status" : 200, 
				"user" : str(user) ,
				"fisrt_name" : request.user.first_name , 
				"last_name" : request.user.last_name,
				"email" : request.user.email,}
		return JsonResponse(response)		
	else:
		response = {"Response" : "Please log in first" , "status" : 401}
		return JsonResponse(response)