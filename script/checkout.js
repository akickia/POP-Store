import { removeItem } from "./cart.js"

let itemsList = document.querySelector(".itemsList")
let totalCost = document.getElementById("totalCost")
let payBtn = document.querySelector(".payBtn")

//Firing of functions
showCart()

//Eventlistener on bay btn to show new content and clear localstorage
payBtn.addEventListener("click", () => {
  itemsList.innerHTML = `<h1>Tack för din order från POPstore!</h1>
  <h2>Dina varor är på väg!</h2>`
  let allItems = []
  localStorage.setItem("allItems", JSON.stringify(allItems))
})

// ------ FUNCTIONS -------
//Showing items
function showCart() {
  //Get list from localstorage
  let allItems = JSON.parse(localStorage.getItem("allItems"))
  const price = []
  allItems.forEach(item => {
    //Adds price to list
    price.push(item.pricePerHekto)
    //Create Elements and content for UI
    let newItemEl = document.createElement("div")
    newItemEl.setAttribute("id", item.SerialNumber)
    newItemEl.innerHTML = `
    <h5>${item.name}</h5> 
    <h5>${item.pricePerHekto} kr/hg</h5>`
    itemsList.appendChild(newItemEl)
    let removeBtn = document.createElement("h5")
    removeBtn.innerHTML = "X"
    newItemEl.appendChild(removeBtn)
    removeBtn.setAttribute("id", item.SerialNumber)
    removeBtn.setAttribute("class", "removeBtn")
    //Add eventlistener to removeBtn to remove items
    removeBtn.addEventListener("click", (e) => {
      removeItem(e, allItems)
      //Cleares content
      itemsList.innerHTML = ""
      //Renders content again
      showCart()
    })
  }) 
  //Starts function to calculate total cost
  calcCost(price)
}

//calculate sum of items in list
  function calcCost(array) {
    let total = 0;
    array.forEach(cost => {
      total += cost
    })
    totalCost.innerText = total + " kr"
  }