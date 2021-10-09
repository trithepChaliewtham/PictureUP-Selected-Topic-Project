from django.db import models


class Picture(models.Model):
    name = models.CharField(max_length=255, null=False)
    last_upload  = models.DateTimeField(auto_now=True)
    upload_by = models.CharField(max_length=255, null=False, default="test")
    # photo = models.ImageField()

    def __str__(self):
    	return f'id : {self.id} , name : {self.name} , upload time : {self.last_upload}, uploadBy : {self.upload_by}' 