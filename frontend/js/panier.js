const serverUrl = "http://localhost:3000/api/teddies";

// Récupération du contenu du panier dans le localstorage
let tabLocalStorage = JSON.parse(localStorage.getItem("shopCart"));

// Si panier vide : cacher le tableau, afficher message panier vide, désactiver bouton submit
if (tabLocalStorage === null || tabLocalStorage.length === 0) {
  document.getElementById(`tableau-panier`).classList.add("d-none");
  document.getElementById(`montant-panier`).classList.add("d-none");
  document.getElementById(`tableau-panier`).classList.remove("d-block");
  document.getElementById(`cart-formulaire`).classList.add("d-none");
  const messagePanierVide = document.createElement("p");
  messagePanierVide.classList.add("text-center", "font-weight-bold");
  messagePanierVide.innerHTML = "Votre panier est vide";
  document.getElementById(`div-panier`).appendChild(messagePanierVide);
}

// Créer le tableau panier récapitulatif du panier
const tableauBody = document.getElementById(`tableau-body`);
for (i = 0; i < tabLocalStorage.length; i++) {
  const line = document.createElement("tr");
  line.id = `ligne${[i]}`;
  line.innerHTML = `<td id='imageth${[
    i,
  ]}' class="d-none d-md-block"><img id='image${[
    i,
  ]}' class="rounded-lg" width="100px" src="" alt="peluche"></td>
    <td id='name${[i]}' class="align-middle"></td>
    <td id='color${[i]}' class="align-middle"></td>
    <td class="align-middle px-0"><button type="button" id='quantity_less_${[
      i,
    ]}' class="btn btn-pink btn-sm"><i class="fa fa-minus"></i></button></td>
    <td id='quantity${[i]}' class="align-middle px-0"></td>
    <td class="align-middle px-0"><button type="button" id='quantity_plus_${[
      i,
    ]}' class="btn btn-pink btn-sm"><i class="fa fa-plus"></i></button></td>
    <td id='prixU${[i]}' class="align-middle d-none"></td>
    <td id='prixT${[i]}' class="align-middle"></td>
    <td class="align-middle"><button type="button" id='supp${[
      i,
    ]}' class="btn btn-delete btn-sm"><i class="fa fa-trash"></i></button></td>`;
  tableauBody.appendChild(line);
}

// Remplir le tableau récapitulatif du panier
for (i = 0; i < tabLocalStorage.length; i++) {
  // image
  const image = document.getElementById(`image${[i]}`);
  image.src = tabLocalStorage[i].imgUrl;
  // nom
  const name = document.getElementById(`name${[i]}`);
  name.textContent = tabLocalStorage[i].name;
  // couleur
  const color = document.getElementById(`color${[i]}`);
  color.textContent = tabLocalStorage[i].variant;
  // quantité
  const quantity = document.getElementById(`quantity${[i]}`);
  quantity.textContent = tabLocalStorage[i].quantity;

  // prix unitaire
  const prixU = document.getElementById(`prixU${[i]}`);
  prixU.textContent = `${tabLocalStorage[i].price / 100}.00 €`;
  // prix total par articles
  const prixT = document.getElementById(`prixT${[i]}`);
  prixT.textContent = `${
    (tabLocalStorage[i].price / 100) * tabLocalStorage[i].quantity
  }€`;
}

// Fonction calcul et affichage du prix Total à payer
const prixTotalPanier = document.getElementById(`prix-total-panier`);
function calcPrixTotal(tabLocalStorage) {
  var prixTotalPanier = 0;
  for (i = 0; i < tabLocalStorage.length; i++) {
    prixTotalPanier =
      prixTotalPanier + tabLocalStorage[i].quantity * tabLocalStorage[i].price;
  }
  prixTotalPanier = prixTotalPanier / 100;
  return prixTotalPanier;
}
prixTotalPanier.textContent = `${calcPrixTotal(tabLocalStorage)}.00 €`;

// Fonction quantité +1
var addOne = function () {
  var lastChar = this.id.substr(this.id.length - 1);
  tabLocalStorage[lastChar].quantity = tabLocalStorage[lastChar].quantity + 1;
  localStorage.setItem("shopCart", JSON.stringify(tabLocalStorage));
  document.location.reload();
};

// Fonction quantité -1
var delOne = function () {
  var lastChar = this.id.substr(this.id.length - 1);
  tabLocalStorage[lastChar].quantity = tabLocalStorage[lastChar].quantity - 1;
  // if quantity = 0
  if (tabLocalStorage[lastChar].quantity === 0) {
    var userConfirm = confirm(
      `Vous êtes sur le point de supprimer ${tabLocalStorage[lastChar].name} de votre panier \nConfirmer ?`
    );
    if (userConfirm == true) {
      tabLocalStorage.splice(lastChar, 1);
      localStorage.setItem("shopCart", JSON.stringify(tabLocalStorage));
      document.location.reload();
    } else {
      tabLocalStorage[lastChar].quantity =
        tabLocalStorage[lastChar].quantity + 1;
      document.location.reload();
    }
  }
  localStorage.setItem("shopCart", JSON.stringify(tabLocalStorage));
  document.location.reload();
};

// Fonction supprimer l'article du panier
var supCart = function () {
  var lastChar = this.id.substr(this.id.length - 1);
  var userConfirm = confirm(
    `Vous êtes sur le point de supprimer ces articles de votre panier \nConfirmer ?`
  );
  if (userConfirm == true) {
    tabLocalStorage.splice(lastChar, 1);
    localStorage.setItem("shopCart", JSON.stringify(tabLocalStorage));
    document.location.reload();
  } else {
    document.location.reload();
  }
};

// Appel des fonctions +1, -1, et suppression lors du clic
for (i = 0; i < tabLocalStorage.length; i++) {
  document.getElementById(`quantity_less_${i}`).onclick = delOne;
  document.getElementById(`quantity_plus_${i}`).onclick = addOne;
  document.getElementById(`supp${[i]}`).onclick = supCart;
}

// Formulaire

const form = document.getElementById("form");
const lastName = document.getElementById("lastNameInput");
const firstName = document.getElementById("firstNameInput");
const email = document.getElementById("emailInput");
const adress = document.getElementById("adressInput");
const city = document.getElementById("cityInput");
const country = document.getElementById("countryInput");

const numberAdresspatern = /^[a-zA-Z0-9\s,'-]*$/;
const textpattern = /^[a-zA-Z\s]{2,}$/;
const emailpattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;





// Function Error
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}
// Function Success
function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}





//Vérification de la saisie dans les champs du formulaire
form.addEventListener("submit", async(e) => {
  e.preventDefault();

  //Créer le tableau final des produits
  const panierFinalOrder = [];
  await createFinalOrder(panierFinalOrder);

  // trim to remove whitespaces
  const lastNameValue = lastNameInput.value.trim();
  const firstNameValue = firstNameInput.value.trim();
  const emailValue = emailInput.value.trim();

  const numberAdressValue = numberAdressInput.value.trim();
  const adressValue = adressInput.value.trim();
  const cityValue = cityInput.value.trim();
  const countryValue = countryInput.value.trim();

  const order = {
    contact: {
      lastName: lastNameValue,
      firstName: firstNameValue,
      email: emailValue,
      addressNumber: numberAdressValue,
      address: adressValue,
      city: cityValue,
      country: countryValue,
    },
    products: panierFinalOrder,
  };

  //Informations Client
  if (lastNameValue === "") {
    setErrorFor(lastNameInput, "Veuillez remplir les informations.");
  } else if (lastNameValue.match(textpattern)) {
    setSuccessFor(lastNameInput);
  } else {
    setErrorFor(
      lastNameInput,
      "Veuillez remplir corectement les informations [A-Z]"
    );
  }

  if (firstNameValue === "") {
    setErrorFor(firstNameInput, "Veuillez remplir les informations.");
  } else if (firstNameValue.match(textpattern)) {
    setSuccessFor(firstNameInput);
  } else {
    setErrorFor(
      firstNameInput,
      "Veuillez remplir corectement les informations [A-Z]"
    );
  }

  if (emailValue === "") {
    setErrorFor(emailInput, "Veuillez remplir les informations.");
  } else if (emailValue.match(emailpattern)) {
    setSuccessFor(emailInput);
  } else {
    setErrorFor(emailInput, "Format non valide.");
  }

  //Informations Livraison

  if (numberAdressValue === "") {
    setErrorFor(numberAdressInput, "Veuillez remplir les informations.");
  } else if (numberAdressValue.match(numberAdresspatern)) {
    setSuccessFor(numberAdressInput);
  } else {
    setErrorFor(
      numberAdressInput,
      "Veuillez remplir corectement les informations [0-9]."
    );
  }

  if (adressValue === "") {
    setErrorFor(adressInput, "Veuillez remplir les informations.");
  } else if (adressValue.match(textpattern)) {
    setSuccessFor(adressInput);
  } else {
    setErrorFor(
      adressInput,
      "Veuillez remplir corectement les informations [A-Z]."
    );
  }

  if (cityValue === "") {
    setErrorFor(cityInput, "Veuillez remplir les informations.");
  } else if (cityValue.match(textpattern)) {
    setSuccessFor(cityInput);
  } else {
    setErrorFor(
      cityInput,
      "Veuillez remplir corectement les informations [A-Z]."
    );
  }

  if (countryValue === "") {
    setErrorFor(countryInput, "Veuillez remplir les informations.");
  } else if (countryValue.match(textpattern)) {
    setSuccessFor(countryInput);
  } else {
    setErrorFor(
      countryInput,
      "Veuillez remplir corectement les informations [A-Z]."
    );
  }
  setSuccessFor();
});






// Fonction creation du tableau d'ID pour envoi au serveur
function createFinalOrder(panierFinalOrder) {
  tabLocalStorage.forEach((element) => {
    for (q = 0; q < element.quantity; q++) {
      const eachProduct = element.id;
      panierFinalOrder.push(eachProduct);
    }
  });
}

// Fonction envoi de la commande, reception et stockage de l'ID de la commande généré par le serveur
async function sendOrder(order) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(order),
  };
  const response = await fetch(`${serverUrl}/order`, options);
  const serverResponse = await response.json();
  console.log(serverResponse);
  localStorage.setItem("order", JSON.stringify(serverResponse));
}
