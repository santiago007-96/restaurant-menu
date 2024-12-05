from rest_framework.serializers import ModelSerializer

from vat.models import Vat

class VatSerializer(ModelSerializer):
    class Meta:
        model = Vat
        fields = [
            'id',
            'vatPercentage'
        ]