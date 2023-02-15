let items = []
let cartElement = document.querySelector(".cart")


export let addToCart = (item) => {
    items.push(item)
    console.log(item)
    console.log(items)
    document.querySelector(".info-module").style.display = "none";
    localStorage.setItem("items", JSON.stringify(items))
}


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

export let closeCart = () => {
  cartElement.style.width = ""
  let itemDivs = document.querySelectorAll(".hero .cart div")
  itemDivs.forEach(div => {
    div.style.display = "none"
  })
}



export let renderCart = () => {
  cartElement.innerHTML = `<img class="cartImg" src="img/cart.png">`
  console.log("empty container")
  let allItems = JSON.parse(localStorage.getItem("items"))
  console.log("get data from local storage")
  console.log(allItems)
  allItems.forEach(item => {
    console.log("loop through items")
    let newItemEl = document.createElement("div")
    newItemEl.innerHTML = `
    <h5>${item.name}</h5> 
    <h5>${item.pricePerHekto}</h5>
    <h5>Antal: <input type="number" value="1"></h5>`
    cartElement.appendChild(newItemEl)
    console.log("create element")
  })  
}

let countTotal = () => {

}


