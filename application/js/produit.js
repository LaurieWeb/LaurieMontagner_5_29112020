/****************** Appel de l'API d'un seul nounours ***********/

// URL de l'api des nounours
const urlServer = "http://localhost:3000/api/teddies/";

// Appel de l'API avec une Promise
getTeddy = (id, removeError = true) => {
	return new Promise((resolve) => {
	  let request = new XMLHttpRequest();
	  request.onreadystatechange = function () {
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { // Si la requête a abouti
		  resolve(JSON.parse(this.responseText));
		  console.log("Connecté");
		  if (removeError) {
			const error = document.getElementById("error");
			error.remove(); // Supprime le message d'erreur de connection
			const containerButton = document.getElementById("containerButton");
			containerButton.classList.remove("invisible");
			containerButton.classList.add("visible");
		  }
		}
	  };
	  request.open("GET", urlServer + id); // Envoi de la requête avec l'URL de l'API + l'id du nounours
	  request.send();
	});
  };

// Récupération de l'ID du nounours dans l'URL
var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

/********* Récupération des données *********/

// Création du tableau de contenu le nounours
const affichageProduits = async () => {
	const product = await getTeddy(id);
	console.log(product);
    renderTeddy(product.colors, product.name, product._id, product.imageUrl, product.price, product.description);
}

/******** Mise en page ***********/

// Affichage liste des articles
function renderTeddy(productColor, productName, productId, productImg, productPrice, productDescription) {
  const produits = document.getElementById("produit"); // Récupération du bloc qui contient le produit

  const articleImg = document.createElement("div"); // Créé la div de l'image
  articleImg.classList.add("col-12");  
  articleImg.classList.add("col-lg-6");
  articleImg.classList.add("mx-auto");  // Ajoute des classes pour la mise en page

  articleImg.innerHTML = `<img src="${productImg}" alt="${productName}" class="card-img-top img-produit">`; // Ajoute l'image à la div de l'image

  const articleDetails = document.createElement("div"); // Créé la div qui contient les détails
  articleDetails.classList.add("col-12");  
  articleDetails.classList.add("col-lg-4");
  articleDetails.classList.add("mx-auto");
  articleDetails.classList.add("articledetails");  // Ajoute des classes pour la mise en page

  articleDetails.innerHTML = `<h1 class="product__name my-5">${productName}</h1><p class="product__price">${productPrice / 100} €</p>
  <p class="product__description my-4">${productDescription}</p>`; // Ajoute les détails de l'articls à la div des détails

  produits.appendChild(articleImg);
  produits.appendChild(articleDetails); // Créé les blocs images et détails de l'article en enfants du bloc produits

  const colorSelect = document.getElementById("couleur"); // Récupère le bloc qui contient le choix d'option

	productColor.forEach(function(color) { // Fonction qui récupère pour chaque nounours ses différents options de couleur
		const choix = document.createElement("option");
		choix.id = `${color}`;
  		choix.innerHTML = `${color}`;
  		colorSelect.appendChild(choix); // Création et mise en page d'une option pour chaque option de couleur
	}) 
}

affichageProduits();

/********** Ajout du produit au panier  ****************/


const ajoutPanier = document.getElementById("ajoutpanier");

ajoutPanier.addEventListener("click", async function(event) { // Ecouter le clic sur le bouton d'ajout au panier
	event.preventDefault();

	const produits = await getTeddy(id, false);

	// Récupération du panier dans le localStorage, ajout du produit et renvoi
	let userPanier = JSON.parse(localStorage.getItem("userPanier"));
	userPanier.push(produits);
	localStorage.setItem("userPanier", JSON.stringify(userPanier));
	console.log(userPanier)

	// Récupération du choix de l'utilisateur pour la couleur 
	var selectedList = [],
		selectBox = document.getElementById("couleur"),
		i;

	for (i=0; i < selectBox.options.length; i++) 
	{
	if (selectBox.options[i].selected) 
	{
		colorName = selectBox.options[i].text;
		selectedList.push(colorName);
	}
	}

	//	Récupération du tableau de choix de la couleur dans localStorage
	let colorChoise = JSON.parse(localStorage.getItem("colorChoise"));
	colorChoise.push(selectedList); // Ajout de la couleur choisie au tableau
	localStorage.setItem("colorChoise", JSON.stringify(colorChoise)); // Renvoi sur localStorage
	console.log(colorChoise)

	// Confirmation d'ajout au panier
	console.log("Administration : le produit a été ajouté au panier");
	alert("Ce produit a bien été ajouté à votre panier !")

	// Redirection vers la page panier
	window.location.href="panier.html"
});