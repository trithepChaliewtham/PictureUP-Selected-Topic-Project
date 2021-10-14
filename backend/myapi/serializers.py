from rest_framework import serializers
from .models import Imageupload


class ImageuploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Imageupload
        # fields = ('id','name','last_upload','upload_by')
        fields = ('id', 'image' , 'alt_text' , 'upload_by')