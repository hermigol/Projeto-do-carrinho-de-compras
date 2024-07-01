document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("product-catalog")) {
        loadProducts();
    }

    if (document.getElementById("cart-summary")) {
        loadCart();
    }

    if (document.getElementById("login-form")) {
        document.getElementById("login-form").addEventListener("submit", function(event) {
            event.preventDefault();
            loginUser();
        });
    }

    if (document.getElementById("register-form")) {
        document.getElementById("register-form").addEventListener("submit", function(event) {
            event.preventDefault();
            registerUser();
        });
    }

    if (document.getElementById("checkout-button")) {
        document.getElementById("checkout-button").addEventListener("click", function() {
            finalizePurchase();
        });
    }
});

const products = [
    { id: 1, name: "Produto 1", description: "Descrição do Produto 1", price: 10, available: true },
    { id: 2, name: "Produto 2", description: "Descrição do Produto 2", price: 20, available: true },
    { id: 3, name: "Produto 3", description: "Descrição do Produto 3", price: 30, available: true },
];

function loadProducts() {
    const catalog = document.getElementById("product-catalog");
    catalog.innerHTML = ''; // Clear any existing content
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Preço: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        catalog.appendChild(productDiv);
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId);
    const productInCart = cart.find(p => p.id === productId);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produto adicionado ao carrinho!");
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSummary = document.getElementById("cart-summary");

    if (cart.length === 0) {
        cartSummary.innerHTML = "<p>Seu carrinho está vazio.</p>";
        return;
    }

    let total = 0;
    cartSummary.innerHTML = "<ul>";
    cart.forEach(product => {
        total += product.price * product.quantity;
        cartSummary.innerHTML += `<li>${product.name} - Quantidade: ${product.quantity} - Preço: $${product.price} - Total: $${product.price * product.quantity}</li>`;
    });
    cartSummary.innerHTML += `</ul><p>Total: $${total}</p>`;
}

function finalizePurchase() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    // Simular envio de notificação AfterShip
    alert("Compra finalizada! Uma notificação de confirmação foi enviada.");
    
    // Limpar carrinho
    localStorage.removeItem("cart");
    loadCart();
}

function loginUser() {
    // Simulação de login
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Para fins de simplicidade, aceitamos qualquer combinação de email/senha
    alert(`Usuário ${email} logado com sucesso!`);
    window.location.href = "index.html";
}

function registerUser() {
    // Simulação de registro
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Para fins de simplicidade, aceitamos qualquer combinação de dados
    alert(`Usuário ${name} registrado com sucesso!`);
    window.location.href = "login.html";
}
fetch('https://fakestoreapi.com/products',{
    method:"POST",
    body:JSON.stringify(
        {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        }
    )
})
    .then(res=>res.json())
    .then(json=>console.log(json))
