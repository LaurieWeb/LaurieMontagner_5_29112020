// Créé un panier dans localstorage

if(localStorage.getItem("userPanier")){
	console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
}else{
	console.log("Administration : Le panier n'existe pas, il va être créé et envoyer vers le localStorage");
  	//Le panier est un tableau de produits
  	let panierInit = [];
  	localStorage.setItem("userPanier", JSON.stringify(panierInit));
  };

  	//Tableau et objet demandé par l'API pour la commande
  	let contact;
	let products = [];
	let colorschoise = []

	//L'user a maintenant un panier
	let userPanier = JSON.parse(localStorage.getItem("userPanier"));

addition = () =>{
     //Vérifie si il y a un produit dans le panier
     if(JSON.parse(localStorage.getItem("userPanier")).length > 0){
         //S'il n'est pas vide on supprime le message de panier vide
          document.getElementById("panierVide").remove();
     }
}