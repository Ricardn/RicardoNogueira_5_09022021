const serverUrl = "http://localhost:3000/api/teddies";
const frCurrency = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

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
    <td class="align-middle px-0 "><button type="button" class="btn-remove btn" id='quantity_less_${[
      i,
    ]}' class="btn btn-pink btn-sm"><i class="fa fa-minus"></i></button></td>
    <td id='quantity${[i]}' class="align-middle px-0"></td>
    <td class="align-middle px-0"><button type="button" class="btn-add btn" id='quantity_plus_${[
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

  // prix total par articles
  const prixT = document.getElementById(`prixT${[i]}`);
  prixT.textContent = `${
    (tabLocalStorage[i].price / 100) * tabLocalStorage[i].quantity
  }€`;
}

// Fonction calcul et affichage du prix Total à payer
const totalPrice = document.getElementById(`prix-total-panier`);
const number = (totalPrice.textContent = `${calcPrixTotal(tabLocalStorage)}`);

function calcPrixTotal(tabLocalStorage) {
  let totalPrice = 0;
  for (i = 0; i < tabLocalStorage.length; i++) {
    totalPrice =
      totalPrice + tabLocalStorage[i].quantity * tabLocalStorage[i].price;
  }
  totalPrice = totalPrice / 100;
  return frCurrency.format(totalPrice);
}

// Fonction quantité +1
let addOne = function () {
  let lastChar = this.id.substr(this.id.length - 1);
  tabLocalStorage[lastChar].quantity = tabLocalStorage[lastChar].quantity + 1;
  localStorage.setItem("shopCart", JSON.stringify(tabLocalStorage));
  document.location.reload();
};

// Fonction quantité -1
let delOne = function () {
  let lastChar = this.id.substr(this.id.length - 1);
  tabLocalStorage[lastChar].quantity = tabLocalStorage[lastChar].quantity - 1;
  // if quantity = 0
  if (tabLocalStorage[lastChar].quantity === 0) {
    let userConfirm = confirm(
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
let supCart = function () {
  let lastChar = this.id.substr(this.id.length - 1);
  let userConfirm = confirm(
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

//déclaration de mes constantes
const form = document.getElementById("form");
const lastNameInput = document.getElementById("lastNameInput");
const firstNameInput = document.getElementById("firstNameInput");
const emailInput = document.getElementById("emailInput");
const adressInput = document.getElementById("adressInput");
const cityInput = document.getElementById("cityInput");
const countryInput = document.getElementById("countryInput");

// Pattern utilisées
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
  formControl.id = "success";
}

// Check if the is respected
//field = input in Html
function checkPattern(field, pattern, errorMsg) {
  const value = field.value;

  //short return method
  // if value of field is empty, setError and return false
  if (value === "") {
    setErrorFor(field, "Veuillez remplir les informations.");
    return false;
  }

  // if value of field do not match with any pattern, setError and return false
  if (!value.match(pattern)) {
    setErrorFor(field, errorMsg);

    return false;
  }

  // if everythin is ok, setSucess and return true
  setSuccessFor(field);
  return true;
}

// Check if form is validated
async function validateForm(form) {
  let valid = true;
  const fields = form.querySelectorAll("input");

  // loop to check every field, type and Id of form 
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const type = field.type;
    const typeId = field.id;

    let isFieldValid = false;

    //Switch Field Type
    switch (type) {
      case "text":
        isFieldValid = checkPattern(
          field,
          textpattern,
          "Veuillez remplir corectement les informations [A-Z]"
        );
        break;
      case "email":
        isFieldValid = checkPattern(field, emailpattern, "Format non valide.");
        break;
      default:
        break;
    }

    // Switch Field Type ID
    switch (typeId) {
      case "numberAdressInput":
        isFieldValid = checkPattern(
          field,
          numberAdresspatern,
          "Veuillez remplir corectement les informations [A-Z][0-9]"
        );
        break;
      default:
        break;
    }

    // start isFieldValid = false, if at the end isFieldValid return false, so valid return false
    if (isFieldValid === false) {
      valid = false;
    }
  }
  // if everything is ok, valid will return true
  return valid;
}

//Vérification de la saisie dans les champs du formulaire
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const valid = await validateForm(form);

  if (!valid) {
    return;
  }

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

  await sendOrder(order);

  // Timer set 1s for costumer better experience
  setTimeout(() => {
    window.location.href = "validation.html";
  }, 1000);
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
  localStorage.setItem("order", JSON.stringify(serverResponse));
}
