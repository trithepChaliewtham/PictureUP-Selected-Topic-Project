from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .serializers import PictureSerializer
from .models import Picture
from rest_framework import generics


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

# def test(request):
# 	print("test")
# 	data = {
# 		"msg":"This is text from /test",
# 	}
# 	return JsonResponse(data)