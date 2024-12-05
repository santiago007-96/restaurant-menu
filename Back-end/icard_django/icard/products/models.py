from django.db import models

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=150)
    image = models.ImageField(upload_to='products')
    description = models.CharField(max_length=255, null=True, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    active = models.BooleanField(default=False)
    # Se relaciona con el modelo Category
    # Se setea en null la categoria del producto si se elimina con la categoría 
    # Es decir, el campo categoria puede ser nulo o blanco
    category = models.ForeignKey(
        'categories.Category', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title

