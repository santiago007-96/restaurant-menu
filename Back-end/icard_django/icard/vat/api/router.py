from rest_framework.routers import DefaultRouter

from vat.api.views import VatApiViewSet

router_vat = DefaultRouter()

router_vat.register(
    prefix='vat', basename='vat', viewset=VatApiViewSet
)