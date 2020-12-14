/********* Préparation du panier dans localStorage **********/

if(localStorage.getItem("userPanier")){
	console.log("Administration : le panier de l'utilisateur existe dans le localStorage"); // Panier déjà existant, on ne fait rien
}else{
	console.log("Administration : Le panier n'existe pas, il va être créé et envoyé vers le localStorage");
  
  	let panierInit = [];	// Le panier est un tableau de produits
  	localStorage.setItem("userPanier", JSON.stringify(panierInit)); // Envoi vers localStorage
  };

//L'user a maintenant un panier
	let userPanier = JSON.parse(localStorage.getItem("userPanier"));

/********* Préparation du choix de la couleur dans localStorage ***********/

	if(localStorage.getItem("colorChoise")){
		console.log("Administration : le choix de la couleur existe dans le localStorage"); // Choix de la couleur déjà existant, on ne fait rien
	}else{
		console.log("Administration : le choix de la couleur n'existe pas, il va être créé et envoyé vers le localStorage");
		  
		  let colorInit = []; // Le choix de la couleur est un tableau des couleurs choisies
		  localStorage.setItem("colorChoise", JSON.stringify(colorInit)); // Envoi vers localStorage
	  };
	
//L'user a maintenant un selecteur de couleur
		let colorChoise = JSON.parse(localStorage.getItem("colorChoise"));