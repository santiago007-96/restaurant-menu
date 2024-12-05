"""
URL configuration for icard project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
#Para poder cargar imagenes en el front end
from django.conf import settings 
from django.conf.urls.static import static

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from users.api.router import router_user
from categories.api.router import router_category
from products.api.router import router_product
from tables.api.router import router_table
from orders.api.router  import router_order
from payments.api.router import router_payments
from vat.api.router import router_vat

schema_view = get_schema_view(
   openapi.Info(
      title="iCard - APIDoc",
      default_version='v1',
      description="Documentación de la API iCard",
      terms_of_service="https://github.com/santiago007-96",
      contact=openapi.Contact(email="santialexcate@hotmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docsjson/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redocs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    #Auth me
    path('api/', include('users.api.router')),
    path('api/', include(router_user.urls)),
    # Categorias
    path('api/', include(router_category.urls)),
    # Productos
    path('api/', include(router_product.urls)),
    # Mesas
    path('api/', include(router_table.urls)),
    # Ordenes
    path('api/', include(router_order.urls)),
    # Pagos
    path('api/', include(router_payments.urls)),
    # IVA
    path('api/', include(router_vat.urls))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)