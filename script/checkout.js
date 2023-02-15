let itemsList = document.querySelector(".itemsList")
const price = []
let totalCost = document.getElementById("totalCost")

function showCart() {
let allItems = JSON.parse(localStorage.getItem("items"))
  allItems.forEach(item => {
    price.push(item.pricePerHekto)
    console.log(price)
    let newItemEl = document.createElement("div")
    newItemEl.innerHTML = `
    <h5>${item.name}</h5> 
    <h5>${item.pricePerHekto} kr/hg</h5>`
    itemsList.appendChild(newItemEl)
  }) 
  calcCost(price)
  
}


  function calcCost(array) {
    let total = 0;
    array.forEach(cost => {
      total += cost
    })
    totalCost.innerText = total + " kr"
    console.log(total)
  }

  showCart()


