let price = []
let allItems = JSON.parse(localStorage.getItem("allItems"))
let total = 0 
let cartElement = document.querySelector(".cart")
let totalEl
let checkoutBtn

//Create and add eventlistener to cart-img
function createCartImg() {
  let cartImgElement = document.createElement("img")
  cartImgElement.setAttribute("src", "img/cart.png")
  cartImgElement.setAttribute("class", "cartImg" )
  cartElement.appendChild(cartImgElement)
  cartImgElement.addEventListener("click", () => {  
    expandCart()
})}

//Push chosen popcorn to list 
export let addToCart = (item) => {
  if (allItems == null) {
    allItems = []
  } 
  else {
    allItems = JSON.parse(localStorage.getItem("allItems"))
  }
    allItems.push(item)
    document.querySelector(".info-module").style.display = "none";
    //Set updated list to localstorage
    localStorage.setItem("allItems", JSON.stringify(allItems))
}

//Expaning and closing cart
export let expandCart = () => {
  //Checkes if there is a width set on cartElement
    if (cartElement.style.width) {
      //Start functions to remove/hide content in cart
      closeCart()
      removeChildren()
    }
    else {
      //Start functions to add/show content in cart
      renderCart()
      openCart()
    }
}

//Close cart by removing value for width and hide div's
export let closeCart = () => {
  cartElement.style.width = ""
  let itemDivs = document.querySelectorAll(".hero .cart div")
  itemDivs.forEach(div => {
    div.style.display = "none"
  })
}

//Removing total and button from cart
export function removeChildren() {
  totalEl.style.display = "none"
  checkoutBtn.style.display = "none"
}

//Open cart by adding value for width and show div's
function openCart() {
  cartElement.style.width = "400px"
  let itemDivs = document.querySelectorAll(".hero .cart div")
  itemDivs.forEach(div => {
    div.style.display = "flex"
  })
}
//Note to self - open and close can be refactored 
//into one function with conditions

//Create items in cart from localstorage and show in UI
export let renderCart = () => {
  //Starts by cleaning content and lists
  price = []
  total = 0
  cartElement.innerHTML = " "
  //Get list from localstorage
  let allItems = JSON.parse(localStorage.getItem("allItems"))
  //Adding cartImg
  createCartImg()
  //Checking if there is content
  if (allItems) {
  allItems.forEach(item => {
    //Adds price to list
    price.push(item.pricePerHekto)
    let newItemEl = document.createElement("div")
    let removeBtn = document.createElement("h5")
    newItemEl.innerHTML = `
    <h5>${item.name}</h5> 
    <h5>${item.pricePerHekto} kr/hg</h5>`
    cartElement.appendChild(newItemEl)
    removeBtn.innerHTML = "X"
    newItemEl.appendChild(removeBtn)
    removeBtn.setAttribute("id", item.SerialNumber)
    removeBtn.setAttribute("class", "removeBtn")
    //Add eventlistener to removeBtn to remove items
    removeBtn.addEventListener("click", (e) => {
      removeItem(e, allItems)
      //Renders cart again
      renderCart()
      //Lets cart stay open
      openCart()
    })
  })}
  //Starts function to calculate total cost
  calcCost(price)
  //Adding button and totalEl
  showCartEl()
}

//Show button and totalEl in UI
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

//calculate sum of items in list
export function calcCost(array) {
  array.forEach(cost => {
    total += cost
  })
}


//Removes item
export function removeItem(e, allItems) {
  //targets id
  let idNumber = e.target.id
  //Compares id to items to find index of item
  let index = allItems.findIndex(item => item.SerialNumber === idNumber)
  //Remove this item from list
  allItems.splice(index, 1)
  //Set new list to localstorage
  localStorage.setItem("allItems", JSON.stringify(allItems))
  //get new list
  allItems = JSON.parse(localStorage.getItem("allItems"))
}


