import { addToCart, expandCart, closeCart, removeChildren } from "./cart.js";
let cartElement = document.querySelector(".cart")
let cartImgElement = document.querySelector(".cart img")

//Calling starting function
getPopcorns()

//Eventlistener to expand and close cart

cartImgElement.addEventListener("click", () => {
  expandCart()
})

// ------ FUNCTIONS -------
//Fetching popcorns from json
async function getPopcorns() {
  try {
    let data = await fetch("./products/products.json");
    data = await data.json()
    //Trigger next function to generate items
    generateItems(data)
  }
  catch (error) {
    console.log(error)
  }
}

//Generate PopCorns in UI 
function generateItems(data) {
  let storeContainer = document.querySelector(".store-container")
  data.forEach(item => {
    let newSection = document.createElement("section")
    newSection.setAttribute("class", "card")
    newSection.innerHTML = `
    <img src="img/${item.img}" alt="${item.name}">
    <h4>${item.name}</h4>
    <p class="info">${item.desc}</p>
    <p class="price">${item.pricePerHekto}kr/hg</p>`
    storeContainer.appendChild(newSection)
    //Make sections clickable and close cart on click if open
    newSection.addEventListener("click", () => {
      if (cartElement.style.width) {
      removeChildren()
      }
      closeCart()
      //Kicking of confirmation-module if item is clicked
      generateConfirmationModule(item)
    })
  })
}

//Showing confirmation module in UI 
function generateConfirmationModule(item) {
  let confirmationModule = document.querySelector(".info-module")
  let confirmationModuleSection = document.querySelector(".info-module section")
  confirmationModule.style.display = "block"
  confirmationModuleSection.innerHTML = `
    <h2>${item.name}</h2>
    <h4 class="closeBtn">X</h4>
    <img src="img/${item.img}" alt="${item.name}">
    <p>Smak: ${item.characteristics.flavour}</p>
    <p>Hårdhet: ${item.characteristics.hardness}</p>
    <p>Storlek: ${item.characteristics.size}</p>
    <h5>Mer info: ${item.desc}</h5>
    <h3>Pris: ${item.pricePerHekto}kr/hg</h3>
    <div>
      <h1>Vill du lägga till 1hg ${item.name} i kundvagnen?</h1>
      <button class="choiseYes">JA</button>
      <button class="choiseNo">NEJ</button>
    </div>`
  //Adding eventlisteners in module. 
  let closeBtn = document.querySelector(".closeBtn")
  let closeBtn2 = document.querySelector(".choiseNo")
  let openBtn = document.querySelector(".choiseYes")
  //If user choose NO or X module is hidden
  closeBtn.addEventListener("click", () => {
    confirmationModule.style.display = "none"
  })
  closeBtn2.addEventListener("click", () => {
    confirmationModule.style.display = "none"
  })
  //If user choose YES next function is started
  openBtn.addEventListener("click", () => {
  addToCart(item)
})
}
