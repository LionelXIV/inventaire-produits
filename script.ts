/**
 * FICHIER SCRIPT.TS
 * 
 * Version TypeScript de script.js
 * 
 * CONCEPT DU COURS : "Bases du Typage" et "Fonctions & Structures avancées"
 * 
 * Ce fichier utilise les interfaces définies dans types.ts
 * pour garantir la sécurité des types.
 */

// IMPORT : On importe les interfaces depuis types.ts
// CONCEPT DU COURS : "Export/Import" - réutiliser le code
import { IProduit, IInventaire } from './types.js';

/**
 * CLASSE PRODUIT (Version TypeScript)
 * 
 * CONCEPT DU COURS : "Bases du Typage" - Classes typées
 * 
 * En TypeScript, on précise le TYPE de chaque propriété.
 * Cela empêche les erreurs de type avant l'exécution.
 */
class Produit implements IProduit {
    // implements IProduit = garantit que cette classe respecte l'interface IProduit
    // Si on oublie une propriété, TypeScript nous avertira !
    
    // Déclaration des propriétés avec leurs types
    // CONCEPT : Typage explicite des propriétés
    nom: string;        // nom DOIT être une chaîne de caractères
    prix: number;      // prix DOIT être un nombre
    quantite: number;  // quantite DOIT être un nombre
    
    /**
     * CONSTRUCTEUR
     * 
     * CONCEPT DU COURS : "Bases du Typage" - Paramètres typés
     * 
     * Chaque paramètre a un type explicite.
     * Si on essaie de passer un string pour prix, TypeScript dira ERREUR !
     */
    constructor(nom: string, prix: number, quantite: number) {
        // this.nom = nom : assigne la valeur du paramètre à la propriété
        this.nom = nom;
        this.prix = prix;
        this.quantite = quantite;
    }
    
    /**
     * MÉTHODE : calculerValeurTotale
     * 
     * CONCEPT DU COURS : "Fonctions & Structures avancées" - Retour typé
     * 
     * : number = cette méthode RETOURNE un nombre
     * TypeScript vérifie qu'on retourne bien un number, pas autre chose !
     */
    calculerValeurTotale(): number {
        // return this.prix * this.quantite : retourne le résultat du calcul
        // TypeScript sait que prix et quantite sont des numbers, donc le résultat est un number
        return this.prix * this.quantite;
    }
}

/**
 * CLASSE INVENTAIRE (Version TypeScript)
 * 
 * CONCEPT DU COURS : "Bases du Typage" - Classes avec types génériques
 */
class Inventaire implements IInventaire {
    // implements IInventaire = garantit que cette classe respecte l'interface IInventaire
    
    // produits: IProduit[] = tableau qui contient UNIQUEMENT des objets de type IProduit
    // CONCEPT : Typage des tableaux
    produits: IProduit[] = [];
    // = [] = initialise le tableau vide au moment de la déclaration
    
    /**
     * CONSTRUCTEUR
     * 
     * Pas de paramètres ici, mais on initialise produits dans la déclaration
     */
    constructor() {
        // Le tableau est déjà initialisé dans la déclaration de la propriété
    }
    
    /**
     * MÉTHODE : ajouterProduit
     * 
     * CONCEPT DU COURS : "Fonctions & Structures avancées" - Paramètres typés
     * 
     * produit: IProduit = le paramètre DOIT être un objet qui respecte l'interface IProduit
     * : void = cette méthode ne retourne rien (void = vide)
     */
    ajouterProduit(produit: IProduit): void {
        // this.produits.push(produit) : ajoute le produit au tableau
        // TypeScript vérifie que produit est bien un IProduit avant de l'ajouter
        this.produits.push(produit);
    }
    
    /**
     * MÉTHODE : calculerValeurTotale
     * 
     * CONCEPT DU COURS : "Fonctions & Structures avancées" - Retour typé
     * 
     * : number = retourne un nombre
     */
    calculerValeurTotale(): number {
        // let total: number = 0 : déclare une variable total de type number, initialisée à 0
        // CONCEPT : Typage des variables
        let total: number = 0;
        
        // Boucle for typée
        // CONCEPT : Typage dans les boucles
        for (let i: number = 0; i < this.produits.length; i++) {
        // this.produits[i] : accède au produit à l'index i
        // TypeScript sait que this.produits[i] est de type IProduit
        // calculerValeurTotale() : appelle la méthode du produit
        // total += : ajoute le résultat au total
        let produit: IProduit = this.produits[i];
        total += produit.calculerValeurTotale();
        }
        
        // return total : retourne le total calculé
        // TypeScript vérifie qu'on retourne bien un number
        return total;
    }
}

/**
 * VARIABLE GLOBALE : inventaire
 * 
 * CONCEPT DU COURS : "Bases du Typage" - Variables typées
 * 
 * let inventaire: Inventaire = variable de type Inventaire
 * new Inventaire() = crée une nouvelle instance de la classe Inventaire
 */
let inventaire: Inventaire = new Inventaire();

/**
 * FONCTION : mettreAJourAffichage
 * 
 * CONCEPT DU COURS : "Fonctions & Structures avancées" - Fonctions typées
 * 
 * : void = cette fonction ne retourne rien
 */
function mettreAJourAffichage(): void {
    // document.getElementById('tableauProduits') : récupère l'élément HTML
    // as HTMLTableSectionElement = dit à TypeScript que c'est un élément tbody
    // CONCEPT : Type assertions (affirmations de type)
    let tbody: HTMLTableSectionElement | null = document.getElementById('tableauProduits') as HTMLTableSectionElement | null;
    
    // Vérification que l'élément existe
    if (!tbody) {
        console.error('Élément tableauProduits non trouvé');
        return;
    }
    
    // tbody.innerHTML = '' : vide le contenu du tableau
    tbody.innerHTML = '';
    
    // Boucle for typée pour parcourir les produits
    for (let i: number = 0; i < inventaire.produits.length; i++) {
        // let produit: IProduit = récupère le produit actuel
        // TypeScript sait que c'est un IProduit grâce au typage du tableau
        let produit: IProduit = inventaire.produits[i];
        
        // document.createElement('tr') : crée un élément <tr> (ligne de tableau)
        // as HTMLTableRowElement = dit à TypeScript que c'est un élément tr
        let ligne: HTMLTableRowElement = document.createElement('tr') as HTMLTableRowElement;
        
        // Création des cellules avec typage
        let celluleNom: HTMLTableCellElement = document.createElement('td') as HTMLTableCellElement;
        celluleNom.textContent = produit.nom;  // produit.nom est de type string ✅
        
        let cellulePrix: HTMLTableCellElement = document.createElement('td') as HTMLTableCellElement;
        cellulePrix.textContent = formaterPrix(produit.prix);  // produit.prix est de type number ✅
        
        let celluleQuantite: HTMLTableCellElement = document.createElement('td') as HTMLTableCellElement;
        celluleQuantite.textContent = produit.quantite.toString();  // .toString() convertit number en string
        
        let celluleValeur: HTMLTableCellElement = document.createElement('td') as HTMLTableCellElement;
        // produit.calculerValeurTotale() retourne un number ✅
        // On doit vérifier que produit a la méthode calculerValeurTotale
        let valeur: number = produit.calculerValeurTotale();
        celluleValeur.textContent = formaterPrix(valeur);
        
        // Ajout des cellules à la ligne
        ligne.appendChild(celluleNom);
        ligne.appendChild(cellulePrix);
        ligne.appendChild(celluleQuantite);
        ligne.appendChild(celluleValeur);
        
        // Ajout de la ligne au tableau
        tbody.appendChild(ligne);
    }
    
    // Mise à jour de la valeur totale
    let valeurTotaleElement: HTMLElement | null = document.getElementById('valeurTotale');
    if (!valeurTotaleElement) {
        console.error('Élément valeurTotale non trouvé');
        return;
    }
    // inventaire.calculerValeurTotale() retourne un number ✅
    valeurTotaleElement.textContent = formaterPrix(inventaire.calculerValeurTotale());
}

/**
 * FONCTION : formaterPrix
 * 
 * CONCEPT DU COURS : "Fonctions & Structures avancées" - Paramètres et retour typés
 * 
 * @param prix - Le prix à formater (DOIT être un number)
 * @returns Le prix formaté en string (ex: "25,50 $ CAD")
 * 
 * prix: number = paramètre de type number
 * : string = retourne une chaîne de caractères
 */
function formaterPrix(prix: number): string {
    // .toFixed(2) = garde 2 décimales, retourne un string
    // .replace('.', ',') = remplace le point par une virgule (format français)
    // + ' $ CAD' = ajoute le texte à la fin
    return prix.toFixed(2).replace('.', ',') + ' $ CAD';
}

/**
 * CODE D'INITIALISATION
 * 
 * CONCEPT DU COURS : "Manipulation du DOM et gestion d'événements"
 * 
 * document.addEventListener('DOMContentLoaded', ...) = attend que le HTML soit chargé
 */
document.addEventListener('DOMContentLoaded', function(): void {
    // : void = la fonction callback ne retourne rien
    
    // Récupération du formulaire avec typage
    let formulaire: HTMLFormElement | null = document.getElementById('formProduit') as HTMLFormElement;
    
    if (!formulaire) {
        console.error('Formulaire non trouvé');
        return;
    }
    
    // Écoute de l'événement submit
    formulaire.addEventListener('submit', function(event: Event): void {
        // event: Event = le paramètre event est de type Event
        // : void = la fonction ne retourne rien
        
        // event.preventDefault() = empêche le rechargement de la page
        event.preventDefault();
        
        // Récupération des valeurs avec typage
        // as HTMLInputElement = dit à TypeScript que c'est un input
        let nomInput: HTMLInputElement | null = document.getElementById('nomProduit') as HTMLInputElement;
        let prixInput: HTMLInputElement | null = document.getElementById('prixProduit') as HTMLInputElement;
        let quantiteInput: HTMLInputElement | null = document.getElementById('quantiteProduit') as HTMLInputElement;
        
        if (!nomInput || !prixInput || !quantiteInput) {
            console.error('Champs du formulaire non trouvés');
            return;
        }
        
        let nom: string = nomInput.value;  // .value retourne toujours un string
        
        // parseFloat() convertit string en number
        // TypeScript sait que parseFloat retourne un number
        let prix: number = parseFloat(prixInput.value);
        
        // parseInt() convertit string en number (entier)
        let quantite: number = parseInt(quantiteInput.value);
        
        // Validation des valeurs
        if (isNaN(prix) || isNaN(quantite) || nom.trim() === '') {
            alert('Veuillez remplir tous les champs correctement');
            return;
        }
        
        // Création d'un nouveau produit
        // new Produit(nom, prix, quantite) = crée une instance de Produit
        // TypeScript vérifie que les types correspondent !
        let nouveauProduit: Produit = new Produit(nom, prix, quantite);
        
        // Ajout du produit à l'inventaire
        // TypeScript vérifie que nouveauProduit est bien un IProduit ✅
        inventaire.ajouterProduit(nouveauProduit);
        
        // Mise à jour de l'affichage
        mettreAJourAffichage();
        
        // Réinitialisation du formulaire
        formulaire.reset();
    });
});

