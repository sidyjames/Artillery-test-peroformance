from django.shortcuts import render
from django.http import HttpResponse
from . import models
# Liste de tout les films
# route film
def films(request):
	liste_films = Film.objects.all()
	template = loader.get_template('demo/index.html')
	context = {
	'films': liste_films,
	 }
	 return HttpResponse(template.render(context, request))

# Fiche d'un film
# route film/1
def film(request, film_id):
	f =Film.objects.get(id=film_id)
	html = '<h1>{}</h1>'.format(f.nom)
	html += '<div>un film de {} tourné en {}</div>'.format(f.realisateur.nom,f.annee.year)
	return HttpResponse(html)


# Create your views here.
