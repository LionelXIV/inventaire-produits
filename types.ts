/**
 * FICHIER TYPES.TS
 * 
 * Ce fichier contient les définitions de types et interfaces TypeScript.
 * 
 * CONCEPT DU COURS : "Bases du Typage" - TypeScript
 * 
 * Les interfaces définissent la "forme" ou la "structure" que doivent avoir les objets.
 * C'est comme un contrat : tout objet qui utilise cette interface DOIT avoir ces propriétés.
 * 
 * Avantages (selon le cours) :
 * - Typage statique → moins d'erreurs
 * - Détection d'erreurs avant l'exécution
 * - Meilleure compréhension du code
 * - IntelliSense et autocomplétion dans l'éditeur
 */

/**
 * INTERFACE IPRODUIT
 * 
 * Définit la structure qu'un produit DOIT avoir.
 * 
 * En JavaScript pur, on n'a pas de vérification de types.
 * En TypeScript, cette interface garantit que :
 * - nom sera toujours une chaîne de caractères (string)
 * - prix sera toujours un nombre (number)
 * - quantite sera toujours un nombre (number)
 * 
 * Si on essaie de créer un Produit avec un prix en texte, TypeScript nous avertira AVANT l'exécution !
 */
export interface IProduit {
    // nom : string = le nom du produit doit être du texte
    nom: string;
    
    // prix : number = le prix doit être un nombre (décimal autorisé)
    prix: number;
    
    // quantite : number = la quantité doit être un nombre entier
    quantite: number;
    
    // calculerValeurTotale : méthode qui retourne un number
    calculerValeurTotale(): number;
}

/**
 * INTERFACE IINVENTAIRE
 * 
 * Définit la structure qu'un inventaire DOIT avoir.
 * 
 * produits : IProduit[] = un tableau (array) qui contient uniquement des objets de type IProduit
 * Le [] signifie "tableau de"
 * 
 * Exemple : si on essaie d'ajouter une chaîne de caractères dans ce tableau,
 * TypeScript nous avertira que ce n'est pas un IProduit !
 */
export interface IInventaire {
    // produits : IProduit[] = tableau contenant uniquement des produits
    produits: IProduit[];
}

/**
 * TYPE PERSONNALISÉ : CATEGORIEPRODUIT
 * 
 * CONCEPT DU COURS : "Types personnalisés" - TypeScript
 * 
 * Un "type" est une façon de créer nos propres types de données.
 * Ici, on crée un type qui ne peut avoir QUE ces 4 valeurs possibles.
 * 
 * C'est comme une énumération : on limite les choix possibles.
 * 
 * Avantage : si on essaie d'utiliser une autre catégorie (ex: "Vêtements"),
 * TypeScript nous dira que ce n'est pas valide !
 */
export type CategorieProduit = 
    | "Électronique"    // Option 1
    | "Alimentaire"      // Option 2
    | "Mobilier"         // Option 3
    | "Autre";           // Option 4

/**
 * INTERFACE IPRODUITAVANCE (BONUS)
 * 
 * Version améliorée du produit avec une catégorie.
 * 
 * CONCEPT DU COURS : "Structures avancées" - TypeScript
 * 
 * On peut combiner plusieurs concepts :
 * - Propriétés obligatoires (nom, prix, quantite)
 * - Propriétés optionnelles (categorie?) - le ? signifie "optionnel"
 * 
 * Si categorie n'est pas fournie, elle sera undefined.
 * Mais si elle est fournie, elle DOIT être une des valeurs de CategorieProduit.
 */
export interface IProduitAvance extends IProduit {
    // extends IProduit = hérite de toutes les propriétés de IProduit
    // + ajoute la propriété categorie
    
    // categorie? : CategorieProduit = optionnel, doit être une des catégories définies
    categorie?: CategorieProduit;
}

/**
 * TYPE : FORMATPRIX
 * 
 * Définit les formats de prix possibles.
 * 
 * Utile pour la fonction de formatage des prix.
 */
export type FormatPrix = "CAD" | "USD" | "EUR";

/**
 * INTERFACE : CONFIGURATION INVENTAIRE
 * 
 * Exemple d'interface pour une configuration.
 * 
 * CONCEPT DU COURS : "Interfaces complexes"
 * 
 * On peut créer des interfaces avec des propriétés de différents types,
 * y compris des objets imbriqués ou des fonctions.
 */
export interface IConfigInventaire {
    // devise : FormatPrix = la devise utilisée
    devise: FormatPrix;
    
    // afficherCategories : boolean = afficher ou non les catégories
    afficherCategories: boolean;
    
    // nombreDecimales : number = nombre de décimales à afficher
    nombreDecimales: number;
}

