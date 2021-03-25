from django.db import models
from django.db import models
import datetime
class Realisateur(models.Model):
 nom = models.CharField(max_length=255)
 def __str__(self):
 	return "({}) : {}".format(self.id,self.nom)

class Film(models.Model):
 realisateur = models.ForeignKey(Realisateur, on_delete=models.CASCADE)
 nom = models.CharField(max_length=255)
 note = models.IntegerField(blank=True, default=0)
 annee = models.DateField('date published', default=datetime.date.today)
# Create your models here.
def __str__(self):
 	return "({}) : {} ({}) - Réal : {} - Note : {}".format(self.id,self.nom,self.annee,self.realisateur.id,self.note)

