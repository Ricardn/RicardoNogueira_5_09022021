const serverUrl = "http://localhost:3000/api/teddies";

// Récupération du contenu du panier dans le localstorage
let tabLocalStorage = JSON.parse(localStorage.getItem("shopCart"));
console.log("Contenu de tabLocalStorage :",tabLocalStorage);

// Si panier vide : cacher le tableau, afficher message panier vide, désactiver bouton submit
if ((tabLocalStorage === null) || (tabLocalStorage.length === 0)) {
    document.getElementById(`tableau-panier`).classList.add("d-none");
    document.getElementById(`montant-panier`).classList.add("d-none");
    document.getElementById(`tableau-panier`).classList.remove("d-block");
    document.getElementById(`submit-form`).setAttribute("disabled", "");
    const messagePanierVide = document.createElement("p");
    messagePanierVide.classList.add("text-center", "font-weight-bold");
    messagePanierVide.innerHTML = 'Votre panier est vide';
    document.getElementById(`div-panier`).appendChild(messagePanierVide);
}

// Créer le tableau panier récapitulatif du panier
const tableauBody = document.getElementById(`tableau-body`);
for (i = 0; i < tabLocalStorage.length; i++) {
    const line = document.createElement("tr");
    line.id = `ligne${[i]}`;
    line.innerHTML = 
    `<td id='imageth${[i]}' class="d-none d-md-block"><img id='image${[i]}' class="rounded-lg" width="100px" src="" alt="peluche"></td>
    <td id='name${[i]}' class="align-middle"></td>
    <td id='color${[i]}' class="align-middle"></td>
    <td class="align-middle px-0"><button type="button" id='quantity_less_${[i]}' class="btn btn-pink btn-sm"><i class="fa fa-minus"></i></button></td>
    <td id='quantity${[i]}' class="align-middle px-0"></td>
    <td class="align-middle px-0"><button type="button" id='quantity_plus_${[i]}' class="btn btn-pink btn-sm"><i class="fa fa-plus"></i></button></td>
    <td id='prixU${[i]}' class="align-middle d-none"></td>
    <td id='prixT${[i]}' class="align-middle"></td>
    <td class="align-middle"><button type="button" id='supp${[i]}' class="btn btn-delete btn-sm"><i class="fa fa-trash"></i></button></td>`;
    tableauBody.appendChild(line);
}

// Remplir le tableau récapitulatif du panier
for (i = 0; i < tabLocalStorage.length; i++) {
    // image
    const image = document.getElementById(`image${[i]}`);
    image.src = tabLocalStorage[i][5];
    // nom
    const name = document.getElementById(`name${[i]}`);
    name.textContent = tabLocalStorage[i][0];
    // couleur
    const color = document.getElementById(`color${[i]}`);
    color.textContent = tabLocalStorage[i][1];
    // quantité
    const quantity = document.getElementById(`quantity${[i]}`);
    quantity.textContent = tabLocalStorage[i][3];
    // prix unitaire
    const prixU = document.getElementById(`prixU${[i]}`);
    prixU.textContent = `${tabLocalStorage[i][2] / 100}.00 €`;
    // prix total par articles
    const prixT = document.getElementById(`prixT${[i]}`);
    prixT.textContent = `${(tabLocalStorage[i][2] / 100) * tabLocalStorage[i][3]}€`;
}

// Fonction calcul et affichage du prix Total à payer
const prixTotalPanier = document.getElementById(`prix-total-panier`);
function calcPrixTotal (tabLocalStorage) {
    var prixTotalPanier = 0;
    for (i = 0; i < tabLocalStorage.length; i++){
        prixTotalPanier = prixTotalPanier + (tabLocalStorage[i][3] * tabLocalStorage[i][2]);
    }
    prixTotalPanier = prixTotalPanier / 100;
    return prixTotalPanier;
}
prixTotalPanier.textContent = `${calcPrixTotal(tabLocalStorage)}.00 €`;

// Fonction quantité +1
var addOne = function() {
    var lastChar = this.id.substr(this.id.length - 1);
    tabLocalStorage[lastChar][3] = tabLocalStorage[lastChar][3] + 1;
    localStorage.setItem('shopCart',JSON.stringify(tabLocalStorage));
    document.location.reload();
}

// Fonction quantité -1
var delOne = function(){
    var lastChar = this.id.substr(this.id.length - 1);
    tabLocalStorage[lastChar][3] = tabLocalStorage[lastChar][3] - 1;
    // if quantity = 0
    if (tabLocalStorage[lastChar][3] === 0) {
        var userConfirm = confirm(`Vous êtes sur le point de supprimer ${tabLocalStorage[lastChar][0]} de votre panier \nConfirmer ?`);
        if (userConfirm == true) {
            tabLocalStorage.splice(lastChar,1);
            localStorage.setItem('shopCart',JSON.stringify(tabLocalStorage));
            document.location.reload();
        } else {
            tabLocalStorage[lastChar][3] = tabLocalStorage[lastChar][3] + 1;
            document.location.reload();
        };
    };
    localStorage.setItem('shopCart',JSON.stringify(tabLocalStorage));
    document.location.reload();
}

// Fonction supprimer l'article du panier
var supCart = function(){
    var lastChar = this.id.substr(this.id.length - 1);
    var userConfirm = confirm(`Vous êtes sur le point de supprimer ces articles de votre panier \nConfirmer ?`);
    if (userConfirm == true) {
        tabLocalStorage.splice(lastChar,1);
        localStorage.setItem('shopCart',JSON.stringify(tabLocalStorage));
        document.location.reload();
    } else {
        document.location.reload();
    };
}

// Appel des fonctions +1, -1, et suppression lors du clic
for (i = 0; i < tabLocalStorage.length; i++) {
    document.getElementById(`quantity_less_${i}`).onclick = delOne;
    document.getElementById(`quantity_plus_${i}`).onclick = addOne;
    document.getElementById(`supp${[i]}`).onclick = supCart;
}

// Fonction ajout de couleurs sur le formulaire, déclenchée au clic du submit
const formClient = document.getElementById(`formulaire`);
document.getElementById(`submit-form`).onclick = (event) => {
    formClient.classList.add("was-validated");
};

// Fonction principale commande finale, déclenchée au clic du submit
formClient.addEventListener('submit', function(event) {
    event.preventDefault();
    //Créer le tableau final des produits
    const panierFinalOrder = []
    createFinalOrder(panierFinalOrder);
    //Créer l'objet contact
    const nom = document.getElementById('inputNom').value;
    const prenom = document.getElementById('inputPrenom').value;
    const adresseNumber = document.getElementById('inputNumberAddress').value;
    const adresse = document.getElementById('inputAddress').value;
    const ville = document.getElementById('inputCity').value;   
    const emailAddress = document.getElementById('inputEmail').value;
    const order = {
        contact: {
            firstName: nom,
            lastName: prenom,
            addressNumber: adresseNumber,
            address: adresse,
            city: ville,
            email: emailAddress},
        products: panierFinalOrder
    };
    sendOrder(order);
});
// Fonction creation du tableau d'ID pour envoi au serveur
function createFinalOrder(panierFinalOrder) {
    tabLocalStorage.forEach(element => {
        for (q = 0; q < element[3]; q++){
            const eachProduct = element[4];
            panierFinalOrder.push(eachProduct);
        };
    });
};
// Fonction envoi de la commande, reception et stockage de l'ID de la commande généré par le serveur
async function sendOrder(order) {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(order)
    };
    const response = await fetch(`${serverUrl}/order`, options);
    const serverResponse = await response.json();
    console.log(serverResponse);
    localStorage.setItem('order',JSON.stringify(serverResponse));
};