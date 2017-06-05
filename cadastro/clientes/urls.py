from django.conf.urls import url
from clientes import views

urlpatterns = [
    url(r'^$', views.home, name='clientes.home')
]