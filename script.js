class Produit{
    constructor(nom, prix, quantite){
        this.nom = nom;
        this.prix = prix;
        this.quantite= quantite;
    }
    calculerValeurTotale(){
        return this.prix * this.quantite;
    }
}

class Inventaire{
    constructor(){
        this.produits = []
    }
    ajouterProduit(produit){
        this.produits.push(produit);
    }
    calculerValeurTotale(){
        let total = 0;
        for(let i = 0; i < this.produits.length; i++){
            total += this.produits[i].calculerValeurTotale();
        }
        return total;
    }
}

// Créer une instance de l'inventaire (une seule pour toute l'application)
let inventaire = new Inventaire();

// Attendre que le HTML soit complètement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {
    // Récupère le formulaire par son id
    let formulaire = document.getElementById('formProduit');
    
    // Écoute l'événement "submit" (quand on clique sur le bouton "Ajouter")
    formulaire.addEventListener('submit', function(event) {
        // Empêche le rechargement de la page (comportement par défaut d'un formulaire)
        event.preventDefault();
        
        // Récupère les valeurs saisies dans les champs du formulaire
        let nom = document.getElementById('nomProduit').value;
        // .value = récupère le texte saisi dans le champ
        let prix = parseFloat(document.getElementById('prixProduit').value);
        // parseFloat() = convertit le texte en nombre décimal
        let quantite = parseInt(document.getElementById('quantiteProduit').value);
        // parseInt() = convertit le texte en nombre entier
        
        // Crée un nouveau produit avec les valeurs récupérées
        let nouveauProduit = new Produit(nom, prix, quantite);
        
        // Ajoute le produit à l'inventaire
        inventaire.ajouterProduit(nouveauProduit);
        
        // Met à jour l'affichage
        mettreAJourAffichage();
        
        // Réinitialise le formulaire (vide les champs)
        formulaire.reset();
    });
});
// Fonction : met à jour l'affichage du tableau et de la valeur totale
function mettreAJourAffichage() {
    // Récupère le tbody du tableau (où on va ajouter les lignes)
    let tbody = document.getElementById('tableauProduits');
    
    // Vide le contenu actuel du tableau (pour tout réafficher à neuf)
    tbody.innerHTML = '';
    // innerHTML = contenu HTML de l'élément, '' = vide
    
    // Boucle : parcourt tous les produits de l'inventaire
    for (let i = 0; i < inventaire.produits.length; i++) {
        // Récupère le produit actuel
        let produit = inventaire.produits[i];
        
        // Crée une nouvelle ligne de tableau (<tr>)
        let ligne = document.createElement('tr');
        // createElement('tr') = crée un élément HTML <tr> (table row)
        
        // Crée la cellule pour le nom (<td>)
        let celluleNom = document.createElement('td');
        // createElement('td') = crée un élément HTML <td> (table data)
        celluleNom.textContent = produit.nom;
        // textContent = texte à afficher dans la cellule
        
        // Crée la cellule pour le prix
        let cellulePrix = document.createElement('td');
        cellulePrix.textContent = formaterPrix(produit.prix);
        // formaterPrix() = fonction qu'on créera pour formater le prix en $ CAD
        
        // Crée la cellule pour la quantité
        let celluleQuantite = document.createElement('td');
        celluleQuantite.textContent = produit.quantite;
        
        // Crée la cellule pour la valeur totale du produit
        let celluleValeur = document.createElement('td');
        celluleValeur.textContent = formaterPrix(produit.calculerValeurTotale());
        // Appelle la méthode du produit pour calculer sa valeur totale
        
        // Ajoute toutes les cellules à la ligne
        ligne.appendChild(celluleNom);
        // appendChild() = ajoute un élément enfant à un élément parent
        ligne.appendChild(cellulePrix);
        ligne.appendChild(celluleQuantite);
        ligne.appendChild(celluleValeur);
        
        // Ajoute la ligne complète au tableau
        tbody.appendChild(ligne);
    }
    
    // Met à jour l'affichage de la valeur totale de l'inventaire
    let valeurTotaleElement = document.getElementById('valeurTotale');
    // Récupère l'élément qui affiche la valeur totale
    valeurTotaleElement.textContent = formaterPrix(inventaire.calculerValeurTotale());
    // Calcule la valeur totale et la formate en $ CAD
}

// Fonction : formate un nombre en prix canadien (ex: 25.5 → "25,50 $ CAD")
function formaterPrix(prix) {
    // .toFixed(2) = garde 2 décimales (ex: 25.5 → "25.50")
    // .replace('.', ',') = remplace le point par une virgule (format français)
    return prix.toFixed(2).replace('.', ',') + ' $ CAD';
}