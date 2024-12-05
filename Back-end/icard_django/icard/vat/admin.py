from django.contrib import admin
from vat.models import Vat

# Register your models here.
@admin.register(Vat)
class VatAdmin(admin.ModelAdmin):
    list_display = ['vatPercentage']