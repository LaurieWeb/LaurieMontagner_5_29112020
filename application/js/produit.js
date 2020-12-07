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


/******
 * Récupérer l'id contenue dans l'URL
 * 
 * Appeler l'API et supprimer message d'erreur (?)
 * 
 * Récupérer l'objet dont l'id correspond à celle de l'URL (?)
 * 
 * Créer tableau avec contenu objet et leur donner des clés
 * 	Idem pour le tableau des couleurs (tableau dans un tableau ?)
 * 
 * faire une fonction d'affichage :
 **** Récupérer la div qui contient le contenu
 **** créer mise en page (colonne image, colonne texte)
 **** ajouter les classes
 **** ajouter du inner html + les clés du tableau pour remplir contenu
 ******** pour la liste des options ?
 */


// URL de l'api des nounours
const urlServer = "http://localhost:3000/api/teddies/";

// Appel de l'API avec une Promise
getTeddy = (id) => {
	return new Promise((resolve) => {
	  let request = new XMLHttpRequest();
	  request.onreadystatechange = function () {
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { // si la requête a abouti
		  resolve(JSON.parse(this.responseText));
		  console.log("Connecté");
		  const error = document.getElementById("error");
		  error.remove(); // Supprime le message d'erreur de connection
		  const containerButton = document.getElementById("containerButton");
		  containerButton.classList.remove("invisible");
		  containerButton.classList.add("visible");  
		} else {
		}
	  };
	  request.open("GET", urlServer + id);
	  request.send();
	});
  };

var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");


// Créé tableau de contenu pour chaque articles
const affichageProduits = async () => {
	const product = await getTeddy(id);
	console.log(product);
    renderTeddy(product.colors, product.name, product._id, product.imageUrl, product.price, product.description);
}


// Affichage liste des articles
function renderTeddy(productColor, productName, productId, productImg, productPrice, productDescription) {
  const produits = document.getElementById("produit"); // Récupère le bloc qui contient les articles

  const articleImg = document.createElement("div"); // Créé la card de l'image
  articleImg.classList.add("col-12");  
  articleImg.classList.add("col-lg-6");
  articleImg.classList.add("mx-auto");  // Ajoute des classes pour la mise en page

  articleImg.innerHTML = `<img src="${productImg}" alt="${productName}" class="card-img-top img-produit">`; // Ajoute le contenu des articles à la card d'article

  const articleDetails = document.createElement("div"); // Créé la card de l'image
  articleDetails.classList.add("col-12");  
  articleDetails.classList.add("col-lg-4");
  articleDetails.classList.add("mx-auto");
  articleDetails.classList.add("articledetails");  // Ajoute des classes pour la mise en page

  articleDetails.innerHTML = `<h1 class="product__name my-5">${productName}</h1><p class="product__price">${productPrice / 100} €</p>
  <p class="product__description my-4">${productDescription}</p>`; // Ajoute le contenu des articles à la card d'article

  produits.appendChild(articleImg);
  produits.appendChild(articleDetails); // Créé les bloc articles en enfants du bloc produits

  const colorSelect = document.getElementById("couleur"); // Récupère le bloc qui contient le choix d'option

	productColor.forEach(function(color) {
		const choix = document.createElement("option");
  		choix.innerHTML = `${color}`;
  		colorSelect.appendChild(choix);
	})
}

affichageProduits();

const colorSelect = document.getElementById("couleur");
colorSelect.addEventListener('change', function(event) {
	const colorchoise = event.target.value;
	console.log(colorchoise)
}); // choix de la couleur enregistré, mais comment l'envoyer ??

const ajoutPanier = document.getElementById("ajoutpanier");
ajoutPanier.addEventListener("click", async function(event) {
	event.preventDefault();
	const produits = await getTeddy(id);
	// Récupération du panier dans le localStorage et ajout du produit et renvoie
	let userPanier = JSON.parse(localStorage.getItem("userPanier"));
	userPanier.push(produits);
	localStorage.setItem("userPanier", JSON.stringify(userPanier));
	console.log(userPanier)
	console.log("Administration : le produit a été ajouté au panier");
	alert("Ce produit a bien été ajouté à votre panier !")
	});