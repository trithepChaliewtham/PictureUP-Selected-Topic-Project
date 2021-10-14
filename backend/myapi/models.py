from django.db import models
from django.contrib.auth.models import User

class Imageupload(models.Model):
		owner = models.ForeignKey(User, on_delete=models.CASCADE ,related_name='modify_by', null=True)
		image = models.ImageField(upload_to='uploads/%Y/%m/%d/')
		alt_text = models.CharField(max_length=255)
		upload_by = models.CharField(max_length=255, null=True)

		def __str__(self):
			return f"Picture : {self.image}, Name : {self.alt_text} , Upload By : {self.upload_by}"