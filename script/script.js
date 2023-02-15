import { addToCart, expandCart, closeCart } from "./cart.js";

async function getPopcorns() {
  try {
    let data = await fetch("./products/products.json");
    data = await data.json()
    generateItems(data)
  }
  catch (error) {
    console.log(error)
  }
}
getPopcorns()

let cartElement = document.querySelector(".cart")
cartElement.addEventListener("click", () => {
  expandCart()
})

function generateItems(data) {
  let storeContainer = document.querySelector(".store-container")
  data.forEach(item => {
    let newSection = document.createElement("section")
    newSection.setAttribute("class", "card")
    newSection.innerHTML = `
    <img src="img/${item.img}" alt="${item.name}">
    <h4>${item.name}</h4>
    <p class="info">${item.desc}</p>
    <p class="price">${item.pricePerHekto}kr/hg</p>
    `
    storeContainer.appendChild(newSection)
    newSection.addEventListener("click", () => {
      closeCart()
      generateConfirmationModule(item)
    })
  })
}



function generateConfirmationModule(item) {
  let confirmationModule = document.querySelector(".info-module")
  let confirmationModuleSection = document.querySelector(".info-module section")
  confirmationModule.style.display = "block"
  confirmationModuleSection.innerHTML = `

  <h1>Vill du lägga till ${item.name} i kundvagnen?</h1>
  <h4 class="closeBtn">X</h4>
  <div>
  <button class="choiseYes">JA</button>
  <button class="choiseNo">NEJ</button>
  </div>
  `
  let closeBtn = document.querySelector(".closeBtn")
  let closeBtn2 = document.querySelector(".choiseNo")
  let openBtn = document.querySelector(".choiseYes")
  closeBtn.addEventListener("click", () => {
    confirmationModule.style.display = "none"
  })
  closeBtn2.addEventListener("click", () => {
    confirmationModule.style.display = "none"
  })
  openBtn.addEventListener("click", () => {
  addToCart(item)
})
}
