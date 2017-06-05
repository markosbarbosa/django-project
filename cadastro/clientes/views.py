# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'clientes/home.html')

def create(request):

    nome = request.POST.get('nome');
    email = request.POST.get('email');
    tel_celular = request.POST.get('tel_celular');
    tel_fixo = request.POST.get('tel_fixo');
    sexo = request.POST.get('sexo');
    cep = request.POST.get('cep');
    uf = request.POST.get('uf');
