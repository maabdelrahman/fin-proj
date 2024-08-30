let productsDiv = document.querySelector(".products");
let username = localStorage.getItem("username");
let links = document.querySelector("#links");
let userinfo = document.querySelector("#userinfo");
let user = document.querySelector("#user");
let logoutbtn = document.querySelector(".log_out");

if (username) {
    links.remove();
    userinfo.style.display = "block";
    user.innerHTML = username;
}

logoutbtn.addEventListener("click", () => {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 1500);
});

let products = [
    { id: 2, title: "Samba", category: "Shoe", price: "145", imageUrl: "images/shoe1.jpg" },
    { id: 6, title: "Purple Samba", category: "shoe", price: "190", imageUrl: "images/shoe 3.jpg" },
    { id: 3, title: "Black Samba", category: "Shoe", price: "130", imageUrl: "images/shoe2.jpg" },
    { id: 5, title: "Blue Samba", category: "Shoe", price: "140", imageUrl: "images/shoe 4.jpg" },
    { id: 12, title: "Grey Jacket", category: "Jacket", price: "190", imageUrl: "images/jacket 1.jpg" },
    { id: 7, title: "Black Shirt", category: "Shirt", price: "85", imageUrl: "images/shirt 1.jpg" },
    { id: 1, title: "Black Pants", category: "Pants", price: "140", imageUrl: "images/pants 1.jpg" },
    { id: 10, title: "Blue Jacket", category: "Jacket", price: "180", imageUrl: "images/jacket 2.jpg" },
    { id: 13, title: "Brown Shirt", category: "Shirt", price: "170", imageUrl: "images/shirt 2.jpg" },
    { id: 8, title: "Beige Pants", category: "Pants", price: "168", imageUrl: "images/pants 2.jpg" },
    { id: 4, title: "Green Samba", category: "Shoe", price: "135", imageUrl: "images/shoe 5.jpg" },
    { id: 9, title: "Orange Jacket", category: "Jacket", price: "150", imageUrl: "images/jacket 3.jpg" },
    { id: 11, title: "White Pants", category: "Pants", price: "160", imageUrl: "images/pants 3.jpg" },
    { id: 14, title: "White Pants 2", category: "Pants", price: "120", imageUrl: "images/pants 4.jpg" },
    { id: 15, title: "White shirt", category: "Shirt", price: "190", imageUrl: "images/shirt 3.jpg" },
    { id: 16, title: "Beige Jacket", category: "Jacket", price: "180", imageUrl: "images/jacket 4.jpg" },

];

function draw(prods) {
    let y = prods.map(item => {
        return `
        <div class="card col-12 col-md-3 s-iteam product-item">
            <img src="${item.imageUrl}" class="card-img-top product-item-img" alt="..." height="350">
            <div class="card-body product-item-desc">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text"><strong>$ ${item.price}</strong><br>Category:<strong> ${item.category}</strong></p>
              <a class="btn btn-dark text-light" id="fav${item.id}" onClick="addtofav(${item.id})"><i class="fa-solid fa-heart"></i></a>
              <a class="btn btn-dark" id="addbtn${item.id}" onClick="addtocart(${item.id})">Add to Cart</a>
            </div>
          </div>
        `;
    });
    productsDiv.innerHTML = y.join('');
}

draw(products);

let addedItem = localStorage.getItem("productsincart") ? JSON.parse(localStorage.getItem("productsincart")) : [];
let cartproductdiv = document.querySelector(".carts_products div");
let badge = document.querySelector(".shopping_cart .badge");

function updateCartDisplay() {
    let itemCounts = addedItem.reduce((acc, item) => {
        acc[item.title] = (acc[item.title] || 0) + 1;
        return acc;
    }, {});

    let addedItemresult = Object.entries(itemCounts).map(([title, num]) => ({
        title,
        num
    }));

    cartproductdiv.innerHTML = "";

    addedItemresult.forEach(item => {
        cartproductdiv.innerHTML += `<p class="px-2">${item.num} ${item.title} 
        <i class="fa-solid fa-plus" onclick="incrementItem('${item.title}')"></i> 
        <i class="fa-solid fa-minus sub" onclick="decrementItem('${item.title}')"></i>
        <br>
        </p>`;
    });

    localStorage.setItem("productsRes", JSON.stringify(addedItemresult));
    badge.style.display = "block";
    badge.innerHTML = addedItem.length;
}

if (addedItem.length > 0) {
    updateCartDisplay();
}

function addtocart(id) {
    if (username) {
        let addbtn = document.querySelector("#addbtn" + id);
        let chosenItem = products.find(item => item.id == id);

        if (addbtn.classList.contains("btn-dark")) {
            addbtn.classList.remove("btn-dark");
            addbtn.classList.add("btn-danger");
            addbtn.innerHTML = "Remove from cart";

            addedItem.push(chosenItem);
            localStorage.setItem("productsincart", JSON.stringify(addedItem));
            updateCartDisplay();
        } else {
            addedItem = addedItem.filter(item => item.id !== id);
            localStorage.setItem("productsincart", JSON.stringify(addedItem));
            updateCartDisplay();

            addbtn.classList.remove("btn-danger");
            addbtn.classList.add("btn-dark");
            addbtn.innerHTML = "Add to Cart";
        }
    } else {
        setTimeout(() => {
            window.location = "login.html";
        }, 1500);
    }
}

function incrementItem(title) {
    let item = addedItem.find(item => item.title === title);
    if (item) {
        addedItem.push(item);
        localStorage.setItem("productsincart", JSON.stringify(addedItem));
        updateCartDisplay();
    }
}

function decrementItem(title) {
    let itemIndex = addedItem.findIndex(item => item.title === title);
    if (itemIndex > -1) {
        addedItem.splice(itemIndex, 1);
        localStorage.setItem("productsincart", JSON.stringify(addedItem));
        updateCartDisplay();
    }
}

let favitems = localStorage.getItem("favitems") ? JSON.parse(localStorage.getItem("favitems")) : [];
function addtofav(id) {
    let favitem = document.querySelector("#fav" + id);
    let chosenfavitem = products.find(item => item.id == id);

    if (favitem.classList.contains("text-light")) {
        favitem.classList.remove("text-light");
        favitem.classList.add("text-danger");
        favitems.push(chosenfavitem);
        localStorage.setItem("favitems", JSON.stringify(favitems));
    } else {
        let indx = favitems.map(i => i.id).indexOf(id);
        favitems.splice(indx, 1);
        localStorage.setItem("favitems", JSON.stringify(favitems));
        favitem.classList.remove("text-danger");
        favitem.classList.add("text-light");
    }
}

let shoppingcart = document.querySelector(".shopping_cart i");
let cartproduct = document.querySelector(".carts_products");

shoppingcart.addEventListener("click", () => {
    if (cartproductdiv.innerHTML != "") {
        if (cartproduct.style.display == "block") {
            cartproduct.style.display = "none";
        } else {
            cartproduct.style.display = "block";
        }
    } else {
        cartproduct.style.display = "none";
    }
});

let searchop = document.querySelector(".searchop");
let searcht = document.querySelector(".searcht");
let searchbyval = "Name";

searchop.addEventListener("change", () => {
    searchbyval = searchop.value;
    console.log(searchbyval);
});

searcht.addEventListener('input', function () {
    var currentValue = searcht.value;
    if (currentValue !== "") {
        if (searchbyval === "Name") {
            var len = currentValue.length;
            console.log(len);
            let result = products.filter((item) => {
                return item.title.toLowerCase().substring(0, len) == currentValue.toLowerCase();
            });

            draw(result);
        } else {
            var len = currentValue.length;
            console.log(len);
            let result = products.filter((item) => {
                return item.category.toLowerCase().substring(0, len) == currentValue.toLowerCase();
            });

            draw(result);
        }
    } else {
        draw(products);
    }
    console.log(currentValue);
});

products.forEach(prod => {
    let favindex = favitems.findIndex(fitem => prod.id == fitem.id);
    let cartindex = addedItem.findIndex(citem => prod.id == citem.id);
    if (favindex != -1) {
        let favbutton = document.querySelector("#fav" + prod.id);
        favbutton.classList.remove("text-light");
        favbutton.classList.add("text-danger");
    }
    if (cartindex != -1) {
        let cartbutton = document.querySelector("#addbtn" + prod.id);
        cartbutton.classList.remove("btn-dark");
        cartbutton.classList.add("btn-danger");
        cartbutton.innerHTML = "Remove from cart";
        updateCartDisplay();
    }
});
