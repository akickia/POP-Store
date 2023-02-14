let items = []
let cartElement = document.querySelector(".cart")


export let addToCart = (item) => {
  document.querySelector(".choiseYes").addEventListener("click", () => {
    items.push(item)
    localStorage.setItem("items", JSON.stringify(items))
    cartElement.innerHTML = `<img class="cartImg" src="img/cart.png">`
    renderCart()
    document.querySelector(".info-module").style.display = "none"
  })
}


export let expandCart = () => {
  cartElement.addEventListener("click", () => {
    cartElement.style.width = "50%"
    let itemDivs = document.querySelectorAll(".hero .cart div")
    itemDivs.forEach(div => {
      div.style.display = "flex"
    })
})}


export let renderCart = () => {
  let prices = []
  let allItems = JSON.parse(localStorage.getItem("items"))
  allItems.forEach(item => {
    prices.push(item.pricePerHekto)
    console.log(prices)
    let newItemEl = document.createElement("div")
    newItemEl.innerHTML = `
    <h5>${item.name}</h5> 
    <h5>${item.pricePerHekto}</h5>
    <h5>Antal: <input type="number" value="1"></h5>`
    cartElement.appendChild(newItemEl)
  })  
}


