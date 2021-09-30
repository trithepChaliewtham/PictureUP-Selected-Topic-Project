from django.shortcuts import render
from django.http import HttpResponse, JsonResponse



# Create your views here.
def index(request):
	print("index")
	data = {
		"msg":"Please let me fetch this data",
		"2":"Hope you can get what you want",
	}
	return JsonResponse(data)

def test(request):
	print("test")
	data = {
		"msg":"This is text from /test",
	}
	return JsonResponse(data)