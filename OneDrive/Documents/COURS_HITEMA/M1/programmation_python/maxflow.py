import networkx as nx

# Création d'un graphe dirigé
G = nx.DiGraph()

# Demandez à l'utilisateur de saisir les arcs et leurs capacités
print("Entrez les arcs et leurs capacités (source, destination, capacité) :")
while True:
    user_input = input("Saisissez 'quitter' pour terminer : ")
    if user_input.lower() == 'quitter':
        break

    try:
        source, destination, capacite = user_input.split(',')
        capacite = int(capacite)
        # Enlever les epaces dans dans source et destination
        G.add_edge(source.strip(), destination.strip(), capacite=capacite)
    except ValueError:
        print("Format invalide.")

# Calcul du flux maximal
flow_value, flow_dict = nx.maximum_flow(G, 'source', 'sink')

print("Flux maximal:", flow_value)
