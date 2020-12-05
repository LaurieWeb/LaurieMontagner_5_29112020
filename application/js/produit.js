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




// URL de l'api des nounours
const url = "http://localhost:3000/api/teddies";

// Appel de l'API avec une Promise
getTeddy = () => {
	return new Promise((resolve) => {
	  let request = new XMLHttpRequest();
	  request.onreadystatechange = function () {
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { // si la requête a abouti
		  resolve(JSON.parse(this.responseText));
		  console.log("Connecté");
		  error = document.getElementById("error");
		  error.remove(); // Supprime le message d'erreur de connection
		} else {
		}
	  };
	  request.open("GET", url);
	  request.send();
	});
  };

const urlId = new URLSearchParams(window.location.search);
const id = urlId.get("id");

// Créé tableau contenu pour chaque articles
const affichageProduits = async () => {
    const data = await getTeddy(url, id);
    renderTeddy(data);
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
  articleDetails.classList.add("mx-auto");  // Ajoute des classes pour la mise en page

  articleDetails.innerHTML = `<h1 class="product__name">${productName}</h1><p class="product__price">${productPrice / 100} €</p>
  <p class="product__description">${productDescription}</p><form method="post" action=""><p><select name="couleur" id="couleur"><option value="brun">Brun</option><option value="blond">Blond</option></select></p></form><button class="button__basket"><i class="fas fa-shopping-basket"></i> Ajouter au Panier</button>`; // Ajoute le contenu des articles à la card d'article

  produits.appendChild(articleImg);
  produits.appendChild(articleDetails); // Créé les bloc articles en enfants du bloc produits
}

affichageProduits();
