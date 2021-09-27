from django.shortcuts import render
from django.http import HttpResponse, JsonResponse



# Create your views here.
def index(request):
	print("index")
	data = {
		"msg":"This is long text"
	}
	return JsonResponse(data)

def test(request):
	return HttpResponse("<h1>Test</h1>")