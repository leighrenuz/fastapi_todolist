from django.urls import path
from .views import ToDoList, ToDoDetail
from rest_framework.authtoken.views import obtain_auth_token
from .views import SecureHelloView

urlpatterns = [
    path('todos/', ToDoList.as_view(), name='todo-list'),
    path('todos/<int:pk>/', ToDoDetail.as_view(), name='todo-detail'),
    path('api-token-auth/', obtain_auth_token),
    path('secure-hello/', SecureHelloView.as_view()),
]