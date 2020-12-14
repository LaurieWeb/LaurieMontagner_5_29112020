/****************** Appel de l'API des nounours ***********/

// URL de l'api des nounours
const url = "http://localhost:3000/api/teddies";

// Appel de l'API avec une Promise
getAllTeddies = () => {
	return new Promise((resolve) => {
	  let request = new XMLHttpRequest();
	  request.onreadystatechange = function () {
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { // si la requête a abouti
		  resolve(JSON.parse(this.responseText));
		  console.log("Connecté");
		  error = document.getElementById("error");
		  error.remove(); // Supprime le message d'erreur de connection
		} else {
			console.log("Erreur de connection");
		}
	  };
	  request.open("GET", url);
	  request.send();
	});
  };

/********* Récupération des données *********/

// Création du tableau de contenu pour chaque articles
const affichageProduits = async () => {
  const products = await getAllTeddies(); // Récupérer les produits sur la fonction getAllTeddies
  products.forEach((product) => {
    renderProduct(product.name, product._id, product.imageUrl, product.price);
  });
};

/********* Mise en page ***************/

// Affichage liste des articles
function renderProduct(productName, productId, productImg, productPrice) {
  const produits = document.getElementById("produits"); // Récupère le bloc qui contient les articles
  const article = document.createElement("article"); // Créé la card d'article
  article.classList.add("col-12");  
  article.classList.add("col-lg-6");  // Ajoute des classes pour la mise en page des articles
  article.innerHTML = `<a href="produit.html?id=${productId}" class="product__link"><div class="card mb-4 border-primary shadow"><img src="${productImg}" alt="${productName}" class="card-img-top img-home"><div class="card-body"><h5 class="card-title text-center">${productName}</h5><p class="card-text text-center">${productPrice / 100} €</p></div></div></a>`; // Ajoute le contenu des articles à la card d'article

  produits.appendChild(article); // Créé les bloc articles en enfants du bloc produits
}

affichageProduits();