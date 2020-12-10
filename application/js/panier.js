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

//L'user a maintenant un panier
let userPanier = JSON.parse(localStorage.getItem("userPanier"));
console.log(userPanier.length);
console.log(userPanier)

let colorChoise = JSON.parse(localStorage.getItem("colorChoise"));
console.log(colorChoise);


//Vérifie si il y a un produit dans le panier
if(userPanier.length > 0){
         //S'il n'est pas vide on supprime le message de panier vide
		  const panierVide = document.getElementById("panierVide");
		  panierVide.remove();
		  //Rendre visible le bouton pour vider le panier
		  const clearPanier = document.getElementById("clearPanier");
		  clearPanier.classList.remove("invisible");
		  clearPanier.classList.add("visible");  

		  const panierContainer = document.getElementById("panierContainer"); // Récupère le bloc qui contient les articles

		  userPanier.forEach(produit => { //fonction pour chaque article dans le panier
			 
			const articlePanier = document.createElement("div"); // Créé le bloc article
			articlePanier.classList.add("panier__item");  // Ajoute des classes pour la mise en page
		  
			articlePanier.innerHTML = `<img src="${produit.imageUrl}" alt="${produit.name}" class="panier__item__thumb"><div class="panier__item__body"><h2 class="panier__item__name">${produit.name}</h2><p class="panier__item__option"></p><span class="panier__item__price">${produit.price / 100} €</span></div>`; // Ajoute le contenu des articles
		  
			panierContainer.appendChild(articlePanier);
			
		  });

} else {
		 }


// Ajout des choix de couleurs
 var colorContainer = document.getElementsByClassName("panier__item__option");
		 
 for (var i = 0; i < colorContainer.length; i++) {
	let colorChoise = JSON.parse(localStorage.getItem("colorChoise"));
	colorContainer.item(i).innerHTML = colorChoise[i];
	 }


// Vider le panier
clearPanier.addEventListener("click", async function() {
	localStorage.clear();
	window.location.reload()
});


// Calcul du total
const totalContainer = document.getElementById("totalprice")
let totalPrice = 0;
      userPanier.forEach((produit)=>{
      	totalPrice += produit.price / 100;
	  });
totalContainer.innerHTML = `${totalPrice}`;


/********** Fonction vérification remplissage panier *********/

  checkPanier = () =>{
	if(userPanier.length < 1 || userPanier == null){
	  console.log("ERROR : le localStorage ne contient pas de panier")
	  alert("Votre panier est vide");
	  return false;
  } else {
	  console.log("Administration : Le panier n'est pas vide")
	  //Si le panier n'est pas vide on rempli le products envoyé à l'API
	  JSON.parse(localStorage.getItem("userPanier")).forEach((produit) =>{
		products.push(produit._id);
	  });
	  console.log("Administration : Ce tableau sera envoyé à l'API : " + products)
	  return true;
  }
};

//************** Fonction requête POST ********************/

  envoiCommande = (orderRequest) => {
	return new Promise((resolve)=>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 201) 
			{
		console.log("Connecté pour la requête POST")
		//Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans confirm.html
		sessionStorage.setItem("order", this.responseText);

		//Chargement de la page de confirmation
		

		resolve(JSON.parse(this.responseText));
		console.log(this.responseText)

		//Redirection vers la page confirmation
	window.location.href="confirm.html";

	}
};
request.open("POST", "http://localhost:3000/api/teddies/order");
request.setRequestHeader("Content-Type", "application/json");
request.send(orderRequest);
});
};


document.getElementById("formulaire").addEventListener("submit", function (e) {
    e.preventDefault();
	checkPanier();

	// Récupération des données du formulaire de contact
	const formNom = document.getElementById("nom");
	const formPrenom = document.getElementById("prenom");
	const formEmail = document.getElementById("email");
	const formAdresse = document.getElementById("adresse");
	const formVille = document.getElementById("ville");

	contact = {
		firstName : formNom.value,
		lastName : formPrenom.value,
		address : formAdresse.value,
		city : formVille.value,
		email : formEmail.value
	}

	//Création de l'objet à envoyer
		let order = {
			contact,
			products
		}

	//Conversion en JSON
	   let orderRequest = JSON.stringify(order);
	   console.log("Administration : " + orderRequest);

	//Envoi de l'objet via la function
	   envoiCommande(orderRequest);
  
	//Une fois la commande faite retour à l'état initial des tableaux/objet/localStorage
	   contact = {};
	   products = [];
	   localStorage.clear();

});
