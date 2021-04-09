var cart;

function pillowAdded(size, color, price) {
    this.pillowtitle = title;
    this.size = size;
    this.color = color;
    this.price = price;
}


function changeSize() {
    console.log("changing size")
    var buttonClicked = event.target
    if (buttonClicked.value == 'size1') {
        document.getElementsByClassName('item-size').innerText = '10’’ x 10’’'
    } else if (buttonClicked.value == 'size2') {
        document.getElementsByClassName('item-size').innerText = '15’’ x 15’’'
    } else if (buttonClicked.value == 'size3') {
        document.getElementsByClassName('item-size').innerText = '20’’ x 22’’'
    }
    pillowAdded.size = document.getElementsByClassName('item-size').innerText;
    pillowAdded.price = 6;
    console.log("heya,", pillowAdded.size, pillowAdded.price)

}


function leaveChange() {
    console.log("leaving change")
    var couchClicked = document.getElementById("couch");
    if (couchClicked.value == "greenCouch") {
        document.getElementById("shop-item-image").setAttribute("src", "Couch.png");
        document.getElementsByClassName('item-color').innerText = "Green"
    } else if (couchClicked.value == "greyCouch") {
        document.getElementById("shop-item-image").setAttribute("src", "Couch2.png");
        document.getElementsByClassName('item-color').innerText = "Grey"
    } else if (couchClicked.value == "cyanCouch") {
        document.getElementById("shop-item-image").setAttribute("src", "Couch3.png");
        document.getElementsByClassName('item-color').innerText = "Cyan"
    }
    pillowAdded.color = document.getElementsByClassName('item-color').innerText;
    console.log("hoya,", pillowAdded.color)
}

var cartBtn = document.getElementsByClassName('shop-item-button');
for (var i = 0; i < cartBtn.length; i++) {
    var button = cartBtn[i]
    button.addEventListener('click', addToCart);
}

// Get cart stored in local storage
function getCart() {
    if ((localStorage.getItem("cart") == "undefined") || localStorage.getItem("cart") == null) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
}

//add pillow item to cart
function addToCart() {
    getCart()
    console.log("Clicked cart");
    var title = "Couch Pillow"
    if (pillowAdded.size != null && pillowAdded.color != null) {
        cart.push([title, pillowAdded.size, pillowAdded.color, pillowAdded.price]);
        console.log(cart)
            //store cart item to local storage
        var JSONcart = JSON.stringify(cart);
        localStorage.setItem("cart", JSONcart);
    }
    displayCartNumber();
}


// Display num of items next to cart icon //
function displayCartNumber() {
    getCart();
    var cartTotal = document.getElementById("cart-number");
    document.getElementById("cart-number").innerHTML = cart.length;
}




// Store product details in cart //
function updateCart() {

    // Getting the cart stored in local storage 
    getCart();
    console.log(cart, cart.length)

    // Reset the cart's div when function is called 
    var Items = document.getElementById("cart-items");
    var Frame = document.getElementById("empty-cart-frame")
    var Price = document.getElementById("total-price");
    Frame.innerHTML = "";
    Items.innerHTML = "";
    Price.innerHTML = "";

    //console.log("Cart Reality Check");
    // if cart is empty  
    if (cart.length == 0) {
        console.log("empty cart");

    } else {
        // total price
        var totalPrice = 0;
        for (var i = 0; i < cart.length; i++) {
            console.log("here");
            // creating div element for each cart row 
            var cartItem = document.createElement("div");
            cartItem.setAttribute("class", "cartInfo");
            // set index for deletion
            cartItem.setAttribute("index", i);

            // add product image
            var img = document.createElement("img");
            if (cart[i][2] == "Green") {
                img.setAttribute("src", "Couch.png");
            } else if (cart[i][2] == "Grey") {
                img.setAttribute("src", "Couch2.png");
            } else if (cart[i][2] == "Cyan") {
                img.setAttribute("src", "Couch3.png");
            }
            img.setAttribute("class", "item2-img");
            console.log(img.src)
            cartItem.append(img);

            var itemInfo = document.createElement("div");
            itemInfo.setAttribute("class", "cartInfo");

            // item title div
            var itemTitle = document.createElement("div");
            itemTitle.setAttribute("class", "cartInfo");
            var titleLabel = document.createElement("div");
            titleLabel.setAttribute("class", "label");
            itemTitle.appendChild(titleLabel);
            itemInfo.append(itemTitle);
            titleLabel.appendChild(document.createTextNode(cart[i][0]));
            var itemDetails = document.createElement("div");
            itemDetails.setAttribute("class", "cartInfo");

            // size
            var sizeDetails = document.createElement("div");
            sizeDetails.setAttribute("class", "description");
            sizeDetails.appendChild(document.createTextNode("Size: " + cart[i][1]));
            itemDetails.appendChild(sizeDetails);

            // color
            var colorDetails = document.createElement("div");
            colorDetails.setAttribute("class", "description");
            colorDetails.appendChild(document.createTextNode("Color: " + cart[i][2]));
            itemDetails.appendChild(colorDetails);

            // total price
            var priceDetails = document.createElement("div");
            priceDetails.setAttribute("class", "description");
            itemInfo.append(itemDetails);
            cartItem.append(itemInfo);
            priceDetails.appendChild(document.createTextNode("Subtotal: $" + cart[i][3]));
            itemDetails.appendChild(priceDetails);

            // remove button 
            var remove = document.createElement("button");
            remove.setAttribute("type", "button");
            remove.setAttribute("class", "remove-btn remove-action");
            remove.setAttribute("onclick", "removeCartItem(this);");
            remove.appendChild(document.createTextNode("Remove"));
            cartItem.append(remove);

            // add to total price
            totalPrice += cart[i][3]
            Items.appendChild(cartItem);
        }
        console.log(totalPrice)
        var totalPriceLabel = document.createElement("div");
        totalPriceLabel.setAttribute("class", "label");
        totalPriceLabel.appendChild(document.createTextNode("Total Price: $" + totalPrice));
        Frame.appendChild(totalPriceLabel);
    }
    displayCartNumber();
}

function removeCartItem(item) {
    getCart()
        // item is the remove button
    console.log("remove")
    console.log(item.parentElement)
        // get index of the cart item /row
    var index = item.parentElement.getAttribute("index");

    // remove item at index from cart
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}