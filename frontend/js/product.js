// Déclaration des variables
const serverUrl = "http://localhost:3000/api/teddies";
// Appel fonction principale
mainProduct();

// Fonction Principale:
async function mainProduct() {
  const productId = getProductId();
  console.log("l'ID produit récupéré dans l'URL est le suivant: ", productId);
  const productObject = await getProductList(productId);
  console.log("Les informations reçues par le serveur: ", productObject);
  productContent(productObject);
  addToCart(productObject);
}

// Fonction getProductId: récupération de l'Id contenu dans URL
function getProductId() {
  return new URL(window.location.href).searchParams.get("id");
}

// Fonction getProductList: récupération des données du produit avec la requete par ID
function getProductList(productId) {
  return fetch(`${serverUrl}/${productId}`).then(function (response) {
    return response
      .json()
      .then(function (products) {
        return products;
      })
      .catch(function (error) {
        alert(error);
      });
  });
}

// Fonction productContent: Selectionne les élements HTML et leur passe le contenu récupéré sur le serveur
function productContent(productObject) {
  const productImg = document.getElementById(`product-img`);
  productImg.src = productObject.imageUrl;

  const productName = document.getElementById(`product-name`);
  productName.innerText = productObject.name;

  const productDescription = document.getElementById(`product-description`);
  productDescription.innerText = productObject.description;

  const productPrice = document.getElementById(`product-price`);
  productPrice.innerText = `Prix à l'unité: ${productObject.price / 100}.00 €`;

  const productColorList = document.getElementById(`product-color`);
  for (i = 0; i < productObject.colors.length; i++) {
    const colorOption = document.createElement("option");
    colorOption.textContent = `${productObject.colors[i]}`;
    productColorList.appendChild(colorOption);
  }
}

// Fonction ajouter l'article dans le panier

function addToCart(productObject) {
  // Déclenchement au clic sur le boutton
  document.getElementById("product-addToCart").onclick = (event) => {
    // Créer un tableau contenant les informations du produit à ajouter au panier
    let productToAddinCart = [];
    let cart = [];

    productToAddinCart[0] = productObject.name;
    productToAddinCart[1] = document.getElementById(`product-color`).value;
    productToAddinCart[2] = productObject.price;
    productToAddinCart[3] = parseInt(
      document.getElementById(`product-quantity`).value,
      10
    );
    productToAddinCart[4] = productObject._id;
    productToAddinCart[5] = productObject.imageUrl;
    // Vérifier si le panier existe dans localstorage :
    // si NON : créér la variable panier (cart), ajouter le produit, et sauvegarder avec localstorage
    // si OUI : Rechercher si un article identique est déjà dans le panier :
    // si OUI : Ajouter à la quantité existante et sauvegarder avec localstorage
    // si NON : Ajouter l'article à la suite de la liste
    if (localStorage.getItem("shopCart") === null) {
      cart.push(productToAddinCart);
      localStorage.setItem("shopCart", JSON.stringify(cart));
    } else {
      let tabLocalStorage = JSON.parse(localStorage.getItem("shopCart"));
      condition: {
        for (i = 0; i < tabLocalStorage.length; i++) {
          if (
            tabLocalStorage[i][0] == productToAddinCart[0] &&
            tabLocalStorage[i][1] == productToAddinCart[1]
          ) {
            tabLocalStorage[i][3] =
              tabLocalStorage[i][3] + productToAddinCart[3];
            localStorage.setItem("shopCart", JSON.stringify(tabLocalStorage));
            break condition;
          }
        }
        tabLocalStorage.push(productToAddinCart);
        localStorage.setItem("shopCart", JSON.stringify(tabLocalStorage));
      }
    }
  };
}
