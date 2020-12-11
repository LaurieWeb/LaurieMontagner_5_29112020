/********* Affichage du message de confirmation *********/

if(sessionStorage.getItem("order") != null){ // Vérification qu'une commande à bien été passée
	
	let order = JSON.parse(sessionStorage.getItem("order")); // Récupération des données retour de l'API dans sessionStorage

	let products = order.products; // Récupération des produits commandés

	const totalContainer = document.getElementById("totalprice") // Récupération du span contenant le prix total

	let totalPrice = 0;
		products.forEach((produit)=>{
			totalPrice += produit.price / 100;
		}); // Calcul du prix total
	totalContainer.innerHTML = `${totalPrice}`; // Affichage du prix total

	let contact = order.contact; // Récupération des données de contact

	const orderName = document.getElementById("ordername"); //  Récupération du span contenant le prénom
	orderName.innerHTML = contact.firstName; // Affichage du prénom

	const orderId = document.getElementById("orderid"); // Récupération du span contenant le numéro de commande
	orderId.innerHTML = order.orderId; // Affichage du numéro de commande
	
}else{
  // Avertissement et redirection vers l'accueil
  alert("C'est une erreur, vous n'avez pas passé de commande.");
  window.location.href="index.html";
}

