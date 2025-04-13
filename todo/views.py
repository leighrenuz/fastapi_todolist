from django.shortcuts import render
from rest_framework import generics
from .models import Task
from .serializers import ToDoSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class SecureHelloView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({"message": f"Hello, {request.user.username}!"})


class ToDoList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = ToDoSerializer

class ToDoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = ToDoSerializer