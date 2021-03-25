from django.urls import path
from . import views
urlpatterns = [
# Route /film
path('', views.films, name='films'),
 # Route film/n
path('<int:film_id>', views.film, name='film'),
 
]