from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("get_data/", views.get_data, name="get_data"),
    path("delete_data/<int:id>", views.delete_data, name="delete_data"),
    path("update_data/<int:id>", views.update_data, name="update_data"),
]
