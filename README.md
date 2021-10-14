# selected-topic-project
เว็บที่จะทำ : PictureUP

รายละเอียดเว็บ : เป็นเว็บอัพโหลดรูปภาพ แสดงรูปภาพง่ายๆ

Front-end : Next js

Back-end : Django

# ขั้นตอนการติดตั้งเครื่องมืสำหหรับ Frontend Nextjs

Tool :  frontend - axios, material-ui v^5.0.1

เข้าไปที่โฟล์เดอร์ frontend แล้วพิมพ์คำสั่งด้านล่างใน cmd(Window) หรือ terminal(linux)
!! โปรดเช็คให้แน่ใจว่าคุณอยู่ใน frontend เรียบร้อยแล้วก่อนที่จะใช้คำสั่งด้านล่าง 

	yarn install หรือ npm install


# ขั้นตอนการติดตั้งเครื่องมืสำหหรับ Backend Django
backend - Django, django-cors-headers , rest_framework

1.เข้าไปที่โฟล์เดอร์ backend จากนั้นให้ใช้คำสั่งต่อไปนี้
	
	pip install -r requirement.txt

เมื่อลงเสร็จแล้วให้ไปตั่งค่าสำหรับ corsheaders , rest_framework และ media , media_root ใน setting.py

2.setting.py
ส่วนที่ 1 ใน INSTALLED_APPS ให้เพิ่ม 'corsheaders','rest_framework', เข้าไป
	
	INSTALLED_APPS =[
		....,
		'corsheaders',
		'rest_framework',
		....,
	]

ส่วนที่ 2 หากยังไม่มีใน setting.py ให้ใส่เพิ่มเข้าไป(วางไว้ตรงไหนก็ได้ ห้ามวางใน body ของตัวอื่น)
	
	CORS_ORIGIN_WHITELIST = (
    'http://localhost:8000',
    'http://localhost:3000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
	) 

	CORS_ALLOW_CREDENTIALS = True
	CORS_EXPOSE_HEADERS = ["Content-Type","X-CSRFToken"]

3.MEDIA_URL , MEDIA_ROOT

!! MEDIA_ROOT ในส่วนของ /home/carrot/Desktop/project ให้เปลี่ยนเป็น current path ที่ทำการ git clone ลงมาสามารถเช็ค path ได้ใน terminal หรือ command-line(cmd) 
โดยคำสั่งต่อไปนี้ 

linux - terminal

	$ pwd
	/home/carrot/Desktop/project/PictureUP-Selected-Topic-Project

 Window - cmd หรือ powershell

	$ echo %cd%
	C:\home\carrot\project\PictureUP-Selected-Topic-Project


จากนั้นเติมสำหรับ linux ให้เติม /media  ส่วน Window ให้เตืม \media จะได้เป็น 

linux : /home/carrot/Desktop/project//PictureUP-Selected-Topic-Project/media
Window : C:\home\carrot\project\PictureUP-Selected-Topic-Project\media


	MEDIA_ROOT = '/home/carrot/Desktop/project/PictureUP-Selected-Topic-Project/media'

เช่น /home/anonymous/PictureUP-Selected-Topic-Project/media

	$MEDIA_URL = '/media/'
	$MEDIA_ROOT = '<your_path>/PictureUP-Selected-Topic-Project/media'



# วิธีการใช้งาน 
ต้องรัน django และ frontend แยกกัน

django port default = http://localhost:8000/
Nextjs port default = http://localhost:3000/

เข้าไปที่โฟล์เดอร์ backend แล้วใช้คำสั่ง 

	$python manage.py runserver

เข้าไปที่โฟล์เดอร์ frontend แล้วใช้คำสั่ง 

	yarn run dev
