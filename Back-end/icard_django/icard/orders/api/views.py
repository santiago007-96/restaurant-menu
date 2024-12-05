from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from orders.models import Order
from orders.api.serializers import OrderSerializer

class OrderApiViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    # Filtros
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    # campos del filtro
    filterset_fields = ['table', 'status', 'payment', 'close']
    # ordenar por cualquiera
    ordering_fields = '__all__'

