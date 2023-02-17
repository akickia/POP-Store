import { removeItem } from "./cart.js"

let itemsList = document.querySelector(".itemsList")
let totalCost = document.getElementById("totalCost")
let payBtn = document.querySelector(".payBtn")


function showCart() {
let allItems = JSON.parse(localStorage.getItem("allItems"))
const price = []
  allItems.forEach(item => {
    price.push(item.pricePerHekto)
    let newItemEl = document.createElement("div")
    newItemEl.setAttribute("id", item.SerialNumber)
    newItemEl.innerHTML = `
    <h5>${item.name}</h5> 
    <div class="end">
    <h5>${item.pricePerHekto} kr/hg</h5>
    </div>`
    itemsList.appendChild(newItemEl)
    let removeBtn = document.createElement("h5")
    removeBtn.innerHTML = "X"
    newItemEl.appendChild(removeBtn)
    removeBtn.setAttribute("id", item.SerialNumber)
    removeBtn.addEventListener("click", (e) => {
      removeItem(e, allItems)
      itemsList.innerHTML = ""
      console.log(allItems)
      showCart()
    })
  }) 
  calcCost(price)
}

payBtn.addEventListener("click", () => {
  itemsList.innerHTML = `<h1>Tack för din order från POPstore!</h1>
  <h2>Dina varor är på väg!</h2>`
  let allItems = []
  localStorage.setItem("allItems", JSON.stringify(allItems))
})


  function calcCost(array) {
    let total = 0;
    array.forEach(cost => {
      total += cost
    })
    totalCost.innerText = total + " kr"
  }

  showCart()


// idNumber = e.target.id
// let index = allItems.findIndex(item => item.SerialNumber === idNumber)