# Description du projet
Mon application, construite avec Node.js et hébergée sur Azure, repose sur une architecture robuste qui tire parti de Cosmos DB et MongoDB.
En optant pour une approche NoSql, mon application simplifie considérablement les opérations de base de données, accélère le développement, réduit les risques d'erreurs humaines, et facilite la maintenance à long terme. Cette solution offre une agilité accrue dans la gestion des données, permettant de répondre rapidement aux besoins changeants de l'application sans compromettre la stabilité.

L'intégration de Cosmos DB enrichit l'expérience en offrant une gestion évolutive et une haute disponibilité des données. En combinant ces technologies puissantes, mon application offre une solution complète, moderne et efficace pour répondre aux exigences croissantes du traitement des données dans le cloud.
Endpoints: "/" et "/users"
DNS : webappdaddy.azurewebsites.net

Technologies utilisées : Microsoft Azure (App Services, CosmosDB avec mongoDB...), Docker, Node.js

# Build et run du projet

### clône du github
git clone <URL_DU_PROJET_GITHUB>
cd <NOM_DU_REPERTOIRE_DU_PROJET>

### Installation des dependances
npm install

### Construction de l'image docker
docker build -t expressappazure .

### Execution du conteneur docker
docker run -p 3000:3000 expressappazure

# Artillery-test-peroformance
Ce réferentiel contient les scripts et les résultats d'un test de performance réalisé avec Artillery pour évaluer les performances de notre application web dévelopée en Node.js et hébergée sur Azure.

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

## Méthode GET pour récupérer tous les documents de la BDD

![image](https://github.com/sidyjames/Artillery-test-peroformance/assets/95179072/cb73704d-2fa5-4a24-b5c8-cd7563727e9c)

## Méthode PUT pour modifier un document de la BDD

![image](https://github.com/sidyjames/Artillery-test-peroformance/assets/95179072/5fe2e4fe-37ff-4390-8a34-f7bf3fc90eda)

## Méthode DELETE pour supprimer un document de la BDD
![image](https://github.com/sidyjames/Artillery-test-peroformance/assets/95179072/5aac35eb-ca94-43a0-a159-f95d9c4ca3b6)

## Push de l'image Docker sur DockerHub
![image](https://github.com/sidyjames/Artillery-test-peroformance/assets/95179072/d71fe0fb-f095-4baa-8f3e-d38137e455c0)

