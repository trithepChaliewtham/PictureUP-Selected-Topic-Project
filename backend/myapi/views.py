from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from .serializers import PictureSerializer
from .models import Picture

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json


class PictureList(generics.ListAPIView):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer

    # Only an authenticated user can access this API endpoint
    # permission_classes = [permissions.IsAuthenticated]
    
# Create your views here.

def get_csrf(request):
	response = JsonResponse({'Info' : 'Success - Set CSRF cookie'})
	response["X-CSRFToken"] = get_token(request)
	return response

@login_required
# @api_view(['POST'])
def uploadpicture(request):
	# if request.method == 'GET':
	# 	picture = Picture.objects.all()
	# 	serializer = PictureSerializer(snippets, many=True)
	# 	return Response(serializer.data)

	# if request.method == 'POST':
	# 	serializer = PictureSerializer(data=request.data)
	# 	if serializer.is_valid():
	# 		serializer.save()
	# 		return Response(serializer.data, status=status.HTTP_201_CREATED)
	# 	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	return JsonResponse({'test login required' : 'Success'})

def signup(request):
	try:
		if request.method == "POST":
			print('From Frontend : ', json.loads(request.body))
			req = json.loads(request.body)

			# check if user already exist
			if User.objects.filter(username=req['username']):
				print(User.objects.filter(username=req['username']))
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
		print('Error Found : ', track)
		response = {'Response' : 'Create User Failed! ! ', 'status' : 400}
		return JsonResponse(response)

def userlogin(request):
	if request.user.is_authenticated:
		response = {"Response" : "Already login" , "status" : 200}
		return JsonResponse(response)
	if request.method == "POST":
		print('From Frontend : ', json.loads(request.body))
		req = json.loads(request.body)			
		user = authenticate(request, username=req["username"], password=req["password"])
		print(user)	
		if user is not None:
			login(request, user)
			response = {"Response" : "Login Success!" , "status" : 200}			
			return JsonResponse(response)
		else:
			response = {"Response" : "Login Failed! Username or Password didn't match"	 , "Status" : 400}			
			return JsonResponse(response)
	response = {"Response" : "Ready" , "status" : 200}			
	return JsonResponse(response)		