const teddiesList = document.getElementById('teddiesList');
const searchBar = document.getElementById('searchBar');
let hpTeddies = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredTeddies = hpTeddies.filter((teddie) =>{
        return (
            teddie.name.toLowerCase().includes(searchString)
        );
    });
    displayTeddies(filteredTeddies);
});

const loadTeddies = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/teddies');
        hpTeddies = await res.json();
        displayTeddies(hpTeddies);
    } catch (err) {
        console.log(err);
    }
};

const displayTeddies = (teddies) => {
    const htmlString = teddies.map((teddie) => {
        return `
            <a id="showTeddie" class="teddie" href="product.html?id=${teddie._id}">
            <img src="${teddie.imageUrl}"></img>
            <p>${teddie.name}</p>
            </a>
            `;
    })
    .join('');
    teddiesList.innerHTML = htmlString;
};

function showDiv() {
    var x = document.getElementById('showTeddie');
    if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = 
        "block";
      }
}

function showForm() {
    var x = document.getElementById('cart-formulaire');
    if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = 
        "block";
      }
}

loadTeddies();