let itemsList = document.querySelector(".itemsList")
const price = []
let totalCost = document.getElementById("totalCost")
let payBtn = document.querySelector(".payBtn")


function showCart() {
let allItems = JSON.parse(localStorage.getItem("items"))
  allItems.forEach(item => {
    price.push(item.pricePerHekto)
    let newItemEl = document.createElement("div")
    newItemEl.innerHTML = `
    <h5>${item.name}</h5> 
    <div class="end">
    <h5>${item.pricePerHekto} kr/hg</h5>
    <h4 class="remove">X</h4>
    </div>`
    itemsList.appendChild(newItemEl)

  }) 
  calcCost(price)
}

payBtn.addEventListener("click", () => {
  itemsList.innerHTML = `<h1>Tack för din order från POPstore!</h1>
  <h2>Dina varor är på väg!</h2>`
  items = []
  localStorage.setItem("items", JSON.stringify(items))
})


  function calcCost(array) {
    let total = 0;
    array.forEach(cost => {
      total += cost
    })
    totalCost.innerText = total + " kr"
  }

  showCart()


