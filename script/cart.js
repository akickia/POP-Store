let price = []
let allItems = JSON.parse(localStorage.getItem("allItems"))
let total = 0 
let cartElement = document.querySelector(".cart")
let totalEl
let checkoutBtn

//Push item to list items and save in localstorage
export let addToCart = (item) => {
  if (allItems == null) {
    allItems = []
  } allItems.push(item)
    document.querySelector(".info-module").style.display = "none";
    localStorage.setItem("allItems", JSON.stringify(allItems))
}

//Expaning and closing cart depending on current value of width
export let expandCart = () => {
    if (cartElement.style.width) {
      closeCart()
      removeChildren()
    }
    else {
      renderCart()
      openCart()
    }
}

function openCart() {
  cartElement.style.width = "400px"
  let itemDivs = document.querySelectorAll(".hero .cart div")
  itemDivs.forEach(div => {
    div.style.display = "flex"
  })

}

//Close cart by removing value for width and hide div's
export let closeCart = () => {
  cartElement.style.width = ""
  let itemDivs = document.querySelectorAll(".hero .cart div")
  itemDivs.forEach(div => {
    div.style.display = "none"
  })
}

//Create and add eventlistener to cart-img
function createCartImg() {
  let cartImgElement = document.createElement("img")
  cartImgElement.setAttribute("src", "img/cart.png")
  cartImgElement.setAttribute("class", "cartImg" )
  cartElement.appendChild(cartImgElement)
  cartImgElement.addEventListener("click", () => {
  expandCart()
})
}

//create items in cart from localstorage and show in UI
export let renderCart = () => {
  price = []
  total = 0
  cartElement.innerHTML = " "
  let allItems = JSON.parse(localStorage.getItem("allItems"))
  createCartImg()
  if (allItems) {
  allItems.forEach(item => {
    price.push(item.pricePerHekto)
    let newItemEl = document.createElement("div")
    let removeBtn = document.createElement("h5")
    newItemEl.innerHTML = `
    <h5>${item.name}</h5> 
    <h5>${item.pricePerHekto}</h5>
    `
    cartElement.appendChild(newItemEl)
    removeBtn.innerHTML = "X"
    newItemEl.appendChild(removeBtn)
    removeBtn.setAttribute("id", item.SerialNumber)

    removeBtn.addEventListener("click", (e) => {
      removeItem(e, allItems)

      renderCart()
      openCart()
    })
  })}
  
  calcCost(price)
  showCartEl()
}

//calculate sum
function calcCost(array) {
  array.forEach(cost => {
    total += cost
  })
}

export function removeItem(e, allItems) {
  let idNumber = e.target.id
  let index = allItems.findIndex(item => item.SerialNumber === idNumber)
  allItems.splice(index, 1)
  localStorage.setItem("allItems", JSON.stringify(allItems))
  allItems = JSON.parse(localStorage.getItem("allItems"))
}

//Show elements in UI
function showCartEl() {
  let createTotalEl = document.createElement("h4")
  cartElement.appendChild(createTotalEl)
  totalEl = document.querySelector(".cart h4")
  totalEl.innerHTML = `Totalt: ${total}kr`
  totalEl.style.display = "flex"

  let createCheckoutBtn = document.createElement("button")
  cartElement.appendChild(createCheckoutBtn)
  checkoutBtn = document.querySelector(".cart button")
  checkoutBtn.innerHTML = `<a href="pages/checkout.html">Gå till kassan</a>`
  checkoutBtn.style.display = "block"
}

export function removeChildren() {
  totalEl.style.display = "none"
  checkoutBtn.style.display = "none"
}