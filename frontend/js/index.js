const serverUrl = "http://localhost:3000/api/teddies"; // const server Url = Api(Url)

main(); // Call main Function

// Main Async Function:
async function main() {
  const productList = await getProductList();
  productContent(productList);
}

function getProductList() {
 return fetch(serverUrl)
   .then(function (response) {
     return response.json().then(function (products) {
       return products;
     });
   })
   .catch(function (error) {
     window.location.assign("../frontend/error.html");
   });
}

// Récupére les informations de productList et les implante au bon endroit
function productContent(productList) {
  for (i = 0; i < productList.length; i++) {
    document.querySelector("#container-product-row").insertAdjacentHTML(
      "beforeend",
      `
      <div class="col-12 col-md-5 col-lg-5 mt-4">
      <div class="
                card-product
                col-sm col-example
                text-center
                white
                shadow
                padding-card
              ">
      <div class="Product-block-card" data-id="${productList[i]._id}">        
        <figure class="card-product-grid mb-0 card-sm">
          <div class="product-image img-wrap">
            <img src="${
              productList[i].imageUrl
            }" class="img-teddy-card" alt="Peluche ${productList[i].name}">
          </div>
          <div class"Product-informations">
            <h2 class="card-title">${productList[i].name}</h2>
            <p class="card-price">${productList[i].price / 100}.00 €</p>
            <a class="btn-shade" href="./product.html?id=${
              productList[i]._id
            }" type="button">En Savoir Plus</a>
          </div>
        </figure>
      </div>`
    );
  }
}
