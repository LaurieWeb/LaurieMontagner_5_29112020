/*********** Récupération du panier et du choix de la couleur dans localStorage **********/

let userPanier = JSON.parse(localStorage.getItem("userPanier"));

let colorChoise = JSON.parse(localStorage.getItem("colorChoise"));

//Initialisation du tableau et objet demandé par l'API /order pour la commande
let contact;
let products = [];

/*************** Vérification de remplissage du panier et mise en page ****************/


if(userPanier.length > 0){
         // Si il n'est pas vide on supprime le message de panier vide
		  const panierVide = document.getElementById("panierVide");
		  panierVide.remove();

		  // Rendre visible le bouton pour vider le panier
		  const clearPanier = document.getElementById("clearPanier");
		  clearPanier.classList.remove("invisible");
		  clearPanier.classList.add("visible");  

		  const panierContainer = document.getElementById("panierContainer"); // Récupération le bloc qui contient les articles

		  userPanier.forEach(produit => { // Fonction pour chaque article dans le panier
			 
			const articlePanier = document.createElement("div"); // Création le bloc article
			articlePanier.classList.add("panier__item");  // Ajoute des classes pour la mise en page
		  
			articlePanier.innerHTML = `<img src="${produit.imageUrl}" alt="${produit.name}" class="panier__item__thumb"><div class="panier__item__body"><h2 class="panier__item__name">${produit.name}</h2><p class="panier__item__option"></p><span class="panier__item__price">${produit.price / 100} €</span></div>`; // Ajoute le contenu des articles
		  
			panierContainer.appendChild(articlePanier); // Création des articles enfants du bloc container
			
		  });

} else {
		 }

/************** Ajout du choix des couleurs *********************/

 var colorContainer = document.getElementsByClassName("panier__item__option");
		 
 for (var i = 0; i < colorContainer.length; i++) {
	let colorChoise = JSON.parse(localStorage.getItem("colorChoise"));
	colorContainer.item(i).innerHTML = colorChoise[i];
	 }

/*************** Bouton pour vider le panier ********************/

clearPanier.addEventListener("click", async function() {
	localStorage.clear();
	window.location.reload()
});


/**************** Calcul du total *************************/

const totalContainer = document.getElementById("totalprice")
let totalPrice = 0;
      userPanier.forEach((produit)=>{
      	totalPrice += produit.price / 100;
	  });
totalContainer.innerHTML = `${totalPrice}`;


/********** Fonction vérification remplissage panier avant envoi *********/

  checkPanier = () =>{
	if(userPanier.length < 1 || userPanier == null){
	  console.log("ERROR : le localStorage ne contient pas de panier")
	  alert("Votre panier est vide");
	  return false;
  } else {
	  // Si le panier n'est pas vide on rempli avec les aid des produits le products envoyé à l'API
	  JSON.parse(localStorage.getItem("userPanier")).forEach((produit) =>{
		products.push(produit._id);
	  });
	  return true;
  }
};

/************** Fonction requête POST ********************/

  envoiCommande = (orderRequest) => {
	return new Promise((resolve)=>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 201) 
			{
			console.log("Connecté pour la requête POST")
			
			//Sauvegarde du retour de l'API dans la sessionStorage pour affichage dans confirm.html
			sessionStorage.setItem("order", this.responseText);
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

/*********** Récupération des données du formulaire et envoi *******************/


document.getElementById("formulaire").addEventListener("submit", function (e) { // Au submit du formulaire
    e.preventDefault(); // Pour garder les pattern et title actifs
	checkPanier(); // Vérification remplissage du panier

	// Récupération des blocs du formulaire de contact
	const formNom = document.getElementById("nom");
	const formPrenom = document.getElementById("prenom");
	const formEmail = document.getElementById("email");
	const formAdresse = document.getElementById("adresse");
	const formVille = document.getElementById("ville");

	// Récupération des valeurs du formulaire de contact et ajout dans contact
	contact = {
		firstName : formPrenom.value,
		lastName : formNom.value,
		address : formAdresse.value,
		city : formVille.value,
		email : formEmail.value
	}

	// Création de l'objet à envoyer à l'API
		let order = {
			contact,
			products
		}

	// Conversion en JSON
	   let orderRequest = JSON.stringify(order);
	   console.log("Administration : " + orderRequest);

	//Envoi de l'objet via la requête POST
	   envoiCommande(orderRequest);
  
	// Une fois la commande passée, retour à l'état initial
	   contact = {};
	   products = [];
	   localStorage.clear();

});
