from django.db import models

PaymentTypeEnum = [
    ("CARD", "card"),
    ("CASH", "cash")
]

StatusPaymentEnum = [
    ("PENDING", "pending"),
    ("PAID", "paid")
]
# Create your models here.
class Payment(models.Model):
    table = models.ForeignKey(
        'tables.Table', on_delete=models.SET_NULL, null=True)
    subTotalPayment = models.DecimalField(max_digits=10, decimal_places=2)
    vatPercentage = models.ForeignKey(
        'vat.Vat', on_delete=models.SET_NULL, null=True, blank=True)
    totalPayment = models.DecimalField(max_digits=10, decimal_places=2)
    paymentType = models.CharField(max_length=255, choices=PaymentTypeEnum)
    statusPayment = models.CharField(max_length=255, choices=StatusPaymentEnum)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.table)