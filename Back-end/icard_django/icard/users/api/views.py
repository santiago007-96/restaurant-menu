from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password


from users.models import User
from users.api.serializers import UserSerializer

# Entension de ModelViewSet
class UserApiViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]
    #permission_classes = []
    serializer_class = UserSerializer
    queryset = User.objects.all()

    #Override
    def create(self, request, *args, **kwargs):
        request.data['password'] = make_password(request.data['password'])
        return super().create(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        password = request.data['password']
        if password:
            request.data['password'] = make_password(password)
        else:
            request.data['password'] = request.user.password

        return super().update(request, *args, **kwargs)
            
# Endpoint solo de lectura para el propio usuario
class UserView(APIView):
    permission_classes = [IsAuthenticated]
    #permission_classes = []
    def get(self, request):
        serializer = UserSerializer(request.user)

        return Response(serializer.data)
