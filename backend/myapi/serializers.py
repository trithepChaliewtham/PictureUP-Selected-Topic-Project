from rest_framework import serializers
from .models import Image


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        # fields = ('id','name','last_upload','upload_by')
        fields = ('id', 'image' , 'alt_text' , 'upload_by')