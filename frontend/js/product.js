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
    document.location.reload();
    // Créer un tableau contenant les informations du produit à ajouter au panier

    let productToAddinCart = {
      id: "",
      name: "",
      variant: "",
      price: 0,
      quantity: 0,
      imgUrl: "",
    };

    productToAddinCart.id = productObject._id;
    productToAddinCart.name = productObject.name;
    productToAddinCart.variant = document.getElementById(`product-color`).value;
    productToAddinCart.price = productObject.price;
    productToAddinCart.quantity = parseInt(
      document.getElementById(`product-quantity`).value,
      10
    );
    productToAddinCart.imgUrl = productObject.imageUrl;

    
    let cart = [];

    if (localStorage.getItem("shopCart") === null) {
      cart.push(productToAddinCart);
    } else {
      cart = JSON.parse(localStorage.getItem("shopCart"));
      
      const existIndex = cart.findIndex(productIncart => {
        return productIncart.id === productToAddinCart.id && productIncart.variant === productToAddinCart.variant;
      });

      // si il existe pas
      if (existIndex === -1) {
        cart.push(productToAddinCart);
      } else {
        cart[existIndex].quantity += productToAddinCart.quantity;
      }
    }
    localStorage.setItem("shopCart", JSON.stringify(cart));
  };
}
