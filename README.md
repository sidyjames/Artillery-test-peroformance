# Artillery-test-peroformance
Ce réferentiel contient les scripts et les résultats d'un test de performance réalisé avec Artillery pour évaluer les performances de notre application web dévelopée en node js et hébergée sur Azure.

## Commande pour installer Artillery
### npm install -g artillery@latest
![arillerie1](https://github.com/sidyjames/Artillery-test-peroformance/assets/95179072/38f15cd8-57ce-46b7-ab4d-e96b8c95f17b)

### Fichier du load test
Créer un fichier en format .yml et y mettre ce code :
![image](https://github.com/sidyjames/Artillery-test-peroformance/assets/95179072/4f11c8e8-be89-45ce-8b71-00f54cd98519)

Dans target, nous avons l'application web que nous souhaitons tester.

Ensuite nous avons differentes phases : 
- La 1ère phase appelée Warm up correspond à l'augmentation progressive du taux d'arrivés de 1 à 5 utilisateurs par seconde pour une durée totale de 60 sec, 
- La 2e phase appelée Ram up load correspond à l'augmentation progressive du taux d'arrivés de 5 à 10 utilisateurs par seconde pour une durée totale de 60 sec,
- Et la dernière appelée spike, de 10 à 30 utilisateurs par secondes pour une durée totale de 30 sec.

Nous avons ensuite différents plugins qui fournissent des fonctionnalités supplémentaires pour évaluer les performances et la qualité de l'application.
- Apdex (satisfaction de l'utilisateur) : toutes les réponses avec un temps de réponse inférieur à 100 ms sont considérées comme satisfaisantes.
- ensure : Cette section définit des seuils pour les temps de réponse. Elle indique que le test doit s'assurer que 99% des réponses ont un temps de réponse inférieur à 100 ms et que 95% des réponses ont un temps de réponse inférieur à 75 ms.

Enfin, les scénarios consistent à effectuer 100 boucles où chaque boucle effectue une requête GET vers les differents endpoints.

## Résultats de test

![image](https://github.com/sidyjames/Artillery-test-peroformance/assets/95179072/3814c89e-b966-4f19-9e4b-e5f640de7c88)

