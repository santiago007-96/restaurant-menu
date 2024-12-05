from rest_framework.viewsets import ModelViewSet

from vat.models import Vat
from vat.api.serializers import VatSerializer

class VatApiViewSet(ModelViewSet):
    serializer_class = VatSerializer
    queryset = Vat.objects.all()
    