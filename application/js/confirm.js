if(sessionStorage.getItem("order") != null){
	
	let order = JSON.parse(sessionStorage.getItem("order"));

	let products = order.products;

	const totalContainer = document.getElementById("totalprice")
	let totalPrice = 0;
		products.forEach((produit)=>{
			totalPrice += produit.price / 100;
		});
	totalContainer.innerHTML = `${totalPrice}`;

	let contact = order.contact;

	const orderName = document.getElementById("ordername");
	orderName.innerHTML = contact.firstName;

	const orderId = document.getElementById("orderid");
	orderId.innerHTML = order.orderId;
    
    //Suppression de la clé du sessionStorage pour renvoyer au else si actualisation de la page ou via url direct
    sessionStorage.removeItem("order");
}else{
  //avertissement et redirection vers l'accueil
  alert("C'est une erreur, vous n'avez pas passé de commande.");
  window.location.href="index.html";
}

