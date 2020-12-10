// Créé un panier dans localstorage

if(localStorage.getItem("userPanier")){
	console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
}else{
	console.log("Administration : Le panier n'existe pas, il va être créé et envoyé vers le localStorage");
  	//Le panier est un tableau de produits
  	let panierInit = [];
  	localStorage.setItem("userPanier", JSON.stringify(panierInit));
  };

  	//Tableau et objet demandé par l'API pour la commande
  	let contact;
	let products = [];

	//L'user a maintenant un panier
	let userPanier = JSON.parse(localStorage.getItem("userPanier"));

	if(localStorage.getItem("colorChoise")){
		console.log("Administration : le choix de la couleur existe dans le localStorage");
	}else{
		console.log("Administration : le choix de la couleur n'existe pas, il va être créé et envoyé vers le localStorage");
		  //Le panier est un tableau de produits
		  let colorInit = [];
		  localStorage.setItem("colorChoise", JSON.stringify(colorInit));
	  };
	
		  //Tableau et objet demandé par l'API pour la commande

		let colorTeddy = [];
	
		//L'user a maintenant un panier
		let colorChoise = JSON.parse(localStorage.getItem("colorChoise"));
	

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
		choix.id = `${color}`;
  		choix.innerHTML = `${color}`;
  		colorSelect.appendChild(choix);
	})
}

affichageProduits();


var selectedList = [],
    selectBox = document.getElementById("couleur"),
    i;
 
for (i=0; i < selectBox.options.length; i++) 
{
	if (selectBox.options[i].selected) 
	{
		selectedList.push(selectBox.options[i]);
	}
}

/****** 
const colorSelect = document.getElementById("couleur");
colorSelect.addEventListener('change', function(event) {
	const colorchoise = event.target.value;
	console.log(colorchoise)
	let colorChoise = JSON.parse(localStorage.getItem("colorChoise"));
	colorChoise.push(colorchoise);
	localStorage.setItem("colorChoise", JSON.stringify(colorChoise));
	console.log(colorChoise)
	console.log("Administration : la couleur a été ajouté au panier");
}); */


const ajoutPanier = document.getElementById("ajoutpanier");
ajoutPanier.addEventListener("click", async function(event) {
	event.preventDefault();
	const produits = await getTeddy(id);
	// Récupération du panier dans le localStorage et ajout du produit et renvoie
	let userPanier = JSON.parse(localStorage.getItem("userPanier"));
	userPanier.push(produits);
	localStorage.setItem("userPanier", JSON.stringify(userPanier));
	console.log(userPanier)

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

	let colorChoise = JSON.parse(localStorage.getItem("colorChoise"));
	colorChoise.push(selectedList);
	localStorage.setItem("colorChoise", JSON.stringify(colorChoise));
	console.log(colorChoise)
	console.log("Administration : le produit a été ajouté au panier");
	alert("Ce produit a bien été ajouté à votre panier !")
	window.location.href="panier.html"
	});