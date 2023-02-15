let items = []
let price = []
let total = 0 
let cartElement = document.querySelector(".cart")
let checkoutBtn = document.querySelector(".cart button");
let totalEl = document.createElement("h4")

//Push item to list items and save in localstorage
export let addToCart = (item) => {
    items.push(item)
    document.querySelector(".info-module").style.display = "none";
    localStorage.setItem("items", JSON.stringify(items))
}

//Expaning and closing cart depending on current value of width
export let expandCart = () => {
    if (cartElement.style.width) {
      closeCart()
    }
    else {
      renderCart()
      cartElement.style.width = "400px"
      let itemDivs = document.querySelectorAll(".hero .cart div")
      itemDivs.forEach(div => {
        div.style.display = "flex"
      })
    }
}

//Close cart by removing value for width and hide div's
export let closeCart = () => {
  cartElement.style.width = ""
  let itemDivs = document.querySelectorAll(".hero .cart div")
  itemDivs.forEach(div => {
    div.style.display = "none"
  })
  checkoutBtn.style.display = "none"
  totalEl.style.display = "none"
}



//create items in cart from localstorage and show in UI
export let renderCart = () => {
  price = []
  total = 0
  cartElement.innerHTML = `<img class="cartImg" src="img/cart.png">`
  let allItems = JSON.parse(localStorage.getItem("items"))
  allItems.forEach(item => {
    price.push(item.pricePerHekto)
    console.log(price)
    let newItemEl = document.createElement("div")
    newItemEl.innerHTML = `
    <h5>${item.name}</h5> 
    <h5>${item.pricePerHekto}</h5>
    `
    cartElement.appendChild(newItemEl)
  })  
  calcCost(price)
  cartElement.appendChild(totalEl)
  totalEl.innerHTML = `Totalt: ${total}kr`
  totalEl.style.display = "flex"
  checkoutBtn = document.createElement("button")
  checkoutBtn.innerHTML = `<a href="pages/checkout.html">Gå till kassan</a>`
  cartElement.appendChild(checkoutBtn)
  checkoutBtn.style.display = "block"
}

//calculate sum
function calcCost(array) {
  array.forEach(cost => {
    total += cost
  })
  console.log(total)
}



