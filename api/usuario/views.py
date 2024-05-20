# views.py
import requests
from decouple import config
from django.http import JsonResponse

def verificar_captcha(request):
    token = request.POST.get('token', '')
    recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify'
    payload = {
        'secret': config('RECAPTCHA_PRIVATE_KEY'),
        'response': token,
        'remoteip': request.META.get('REMOTE_ADDR', ''),
    }
    response = requests.post(recaptcha_url, data=payload)
    result = response.json()
    return JsonResponse(result)


# Create your views here.
