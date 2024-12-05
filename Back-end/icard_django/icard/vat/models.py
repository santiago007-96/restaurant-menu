from django.db import models

# Create your models here.
class Vat(models.Model):
    vatPercentage = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return str(self.vatPercentage)