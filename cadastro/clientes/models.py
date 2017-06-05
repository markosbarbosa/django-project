# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Cliente(models.Model):
    nome = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=255)
    tel_cel = models.CharField(max_length=15)
    tel_fixo = models.CharField(max_length=15)
    sexo = models.CharField(max_length=2)
    cep = models.CharField(max_length=9)
    uf = models.CharField(max_length=2)
    cidade = models.CharField(max_length=255)
    endereco = models.CharField(max_length=255)
