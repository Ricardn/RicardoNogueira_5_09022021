// Récupérer ID de la commande dans le localstorage
let orderObject = JSON.parse(localStorage.getItem("order"));
let productObject = JSON.parse(localStorage.getItem("order"));

//Affiche l'ID de la commande
const spanId = document.getElementById('order-id');
spanId.textContent = orderObject.orderId;

//user Informations
const userName = document.getElementById('name');
userName.textContent = orderObject.contact.firstName;

localStorage.removeItem("shopCart");