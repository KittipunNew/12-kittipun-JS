const productList = [] // เก็บรายการส่วนของ Product List
const cartList = [] // เก็บรายการส่วนของ ตะกร้าสินค้า

// ฟังก์ชั่น Create Product 
function createProduct() {
    let productName = document.getElementById('productname').value
    const price = parseFloat(document.getElementById('price').value)
    const image = document.getElementById('inputimage').value

    if (productName && !isNaN(price) && image) {

        productName = productName.charAt(0).toUpperCase() + productName.slice(1)

        productList.push({
            productName: productName,
            price: price,
            image: image
        })
        renderproductList()
        console.log(productList)

        document.getElementById('productname').value = ''
        document.getElementById('price').value = ''
        document.getElementById('inputimage').value = ''
    } else {
        alert('ใส่ข้อมูลให้ถูกต้อง')
    }
}

// ฟังก์ชั่น แสดงรายการของ Product 
function renderproductList() {

    const listProduct = document.getElementById('product-list')
    const buttonAddDelete = document.getElementById('button-add-delete')

    listProduct.innerHTML = ''
    productList.forEach((product, index) => {
        const li = document.createElement('li')
        li.className = 'flex items-center w-full border-b-2'
        li.innerHTML = `
        <input type="checkbox" class="mr-4" id="checkbox-${index}">
        <img src="${productList[index].image}" alt="" class="w-40 h-40">
            <div class="flex flex-col justify-center">
                <h1 class="mx-5 font-bold">${productList[index].productName}</h1>
                <h1 class="mx-5">$${productList[index].price}</h1>
            </div>
        `
        listProduct.appendChild(li)
    })

    if (buttonAddDelete.childElementCount === 0) {
        const buttonAdd = document.createElement('button')
        buttonAdd.className = 'text-white bg-green-500 h-10 w-32 rounded-md'
        buttonAdd.innerHTML = 'Add to Cart'
        buttonAdd.onclick = addToCart
        buttonAddDelete.appendChild(buttonAdd)

        const buttonDelete = document.createElement('button')
        buttonDelete.className = 'text-white bg-red-500 h-10 w-32 rounded-md'
        buttonDelete.innerHTML = 'Delete'
        buttonDelete.onclick = deleteSelected
        buttonAddDelete.appendChild(buttonDelete)
    }
}

// ฟังก์ชั่นปุ่ม Add To Cart
function addToCart() {
    const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked')

    selectedCheckboxes.forEach((checkbox) => {
        const index = checkbox.id.split('-')[1]
        const product = productList[index]

        cartList.push(product)
    })

    renderCart()
}

// ฟังก์ชั่นแสดงผลรายการสินค้าในตะกร้า
function renderCart() {
    const cartlist = document.getElementById('cart-list')
    const cart = document.getElementById('cart')
    cartlist.innerHTML = ''

    cartList.forEach((product, index) => {
        const li = document.createElement('li')
        li.className = 'flex items-center mx-10'
        li.innerHTML = `
        <img src="${product.image}" alt="" class="w-40 h-40">
        <div class="flex flex-col justify-center">
            <h1 class="mx-5 font-bold">${product.productName}</h1>
            <h1 class="mx-5">$${product.price}</h1>
        </div>
        <button class="text-white bg-red-500 h-10 w-20 rounded-md ml-14" onclick="deleteItem(${index})">Delete</button>
        `
        cartlist.appendChild(li)
    })

    if (cart.childElementCount === 0) {
        const divCart = document.createElement('h1')
        divCart.className = "text-center text-5xl font-bold p-16 border-b-2"
        divCart.innerHTML = 'Cart'
        cart.appendChild(divCart)
    }

    calculateTotal()
}

// ฟังก์ชั่น ลบ สินค้าในตะกร้า
function deleteItem(cartIndex) {
    cartList.splice(cartIndex, 1)
    renderCart()
}

// ฟังก์ชั่นลบสินค้าในรายการ Product List
function deleteSelected() {
    const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked')
    const indicesToDelete = []

    selectedCheckboxes.forEach((checkbox) => {
        const index = checkbox.id.split('-')[1]
        indicesToDelete.push(parseInt(index))
    })

    indicesToDelete.sort((a, b) => b - a).forEach((index) => {
        productList.splice(index, 1)
    })

    renderproductList()
}

// ฟังก์ชั่นรวมราคาสินค้าในตะกร้า
function calculateTotal() {
    const total = cartList.reduce((sum, product) => sum + product.price, 0) // คำนวณผลรวม
    document.getElementById('cart-total').innerHTML = `Total: $${total}` // อัปเดตผลรวม
}