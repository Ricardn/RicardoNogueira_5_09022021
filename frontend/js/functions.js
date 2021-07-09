const teddiesList = document.getElementById("teddiesList");
const searchBar = document.getElementById("searchBar");
const btn = document.getElementById("search-btn");

let hpTeddies = [];

// ** FetchError **
const refreshBtn = document.getElementById("refreshBtn");

if (refreshBtn) {
 refreshBtn.addEventListener("click", (e) => {
   refreshPage();
 });
}

 function refreshPage () {
  window.location.href = "../index.html";
}

// ** SearchBar **
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredTeddies = hpTeddies.filter((teddie) => {
    return teddie.name.toLowerCase().includes(searchString);
  });
  displayTeddies(filteredTeddies);
});

const displayTeddies = (teddies) => {
  const htmlString = teddies
    .map((teddie) => {
      return `
            <a id="showTeddie" class="teddie text-center" href="product.html?id=${teddie._id}">
            <img src="${teddie.imageUrl}"></img>
            <p>${teddie.name}</p>
            </a>
            `;
    })
    .join("");
  teddiesList.innerHTML = htmlString;
};

btn.addEventListener("click", (e) => {
  showDiv();
});

// show le résultat de searchBar
function showDiv() {
  let x = document.getElementById("showTeddie");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
    x.style.position = "absolute";
  }
}

// ** Show CartQty **
const loadTeddies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/teddies");
    hpTeddies = await res.json();
    displayTeddies(hpTeddies);
  } catch (err) {
    console.log(err);
  }
};

// Cart Qty
let cartItems = JSON.parse(localStorage.getItem("shopCart"));

// J'initialise une variable pour la quantité du panier
let cartQty = 0;

// Je parcours chaque objet de mon tableau
for (let i = 0; i < cartItems.length; i++) {
  // J'ajoute la quantité de l'object courant à la quantité totale du panier
  cartQty += cartItems[i].quantity;
}
// je récupére la div dans laquelle je compte afficher la quantité
const quantity = document.getElementById("cartQuantity");

// je viens insérer dans le contenu de ma div la quantité totale
quantity.textContent = cartQty;

loadTeddies();
