// ===== PRODUTOS DATABASE =====
const produtos = [
    // CAMISETAS
    {
        id: 1,
        nome: 'Camiseta Preta Premium',
        categoria: 'camisetas',
        preco: 89.90,
        imagem: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        avaliacao: 5,
        destaque: true
    },
    {
        id: 2,
        nome: 'Camiseta Branca Clean',
        categoria: 'camisetas',
        preco: 79.90,
        imagem: 'https://images.unsplash.com/photo-1583394838336-acd977479ee2?w=400&h=500&fit=crop',
        avaliacao: 5,
        destaque: true
    },
    {
        id: 3,
        nome: 'Camiseta Cinza Mescla',
        categoria: 'camisetas',
        preco: 84.90,
        imagem: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
        avaliacao: 4,
        destaque: true
    },
    
    // JAQUETAS
    {
        id: 4,
        nome: 'Jaqueta Preta Bomber',
        categoria: 'jaquetas',
        preco: 299.90,
        imagem: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=500&fit=crop',
        avaliacao: 5,
        destaque: true
    },
    {
        id: 5,
        nome: 'Jaqueta Marrom Couro',
        categoria: 'jaquetas',
        preco: 349.90,
        imagem: 'https://images.unsplash.com/photo-1591047990975-d6db4b52ba62?w=400&h=500&fit=crop',
        avaliacao: 5,
        destaque: false
    },
    {
        id: 6,
        nome: 'Jaqueta Jeans Azul',
        categoria: 'jaquetas',
        preco: 199.90,
        imagem: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=500&fit=crop',
        avaliacao: 4,
        destaque: false
    },
    
    // CALÇAS
    {
        id: 7,
        nome: 'Calça Preta Skinny',
        categoria: 'calcas',
        preco: 149.90,
        imagem: 'https://images.unsplash.com/photo-1542272604-787c62e4bdf4?w=400&h=500&fit=crop',
        avaliacao: 5,
        destaque: true
    },
    {
        id: 8,
        nome: 'Calça Azul Escuro',
        categoria: 'calcas',
        preco: 139.90,
        imagem: 'https://images.unsplash.com/photo-1542272604-787c62e4bdf4?w=400&h=500&fit=crop',
        avaliacao: 4,
        destaque: false
    },
    {
        id: 9,
        nome: 'Calça Bege Casual',
        categoria: 'calcas',
        preco: 129.90,
        imagem: 'https://images.unsplash.com/photo-1542272604-787c62e4bdf4?w=400&h=500&fit=crop',
        avaliacao: 4,
        destaque: false
    },
    
    // ACESSÓRIOS
    {
        id: 10,
        nome: 'Relógio Preto Premium',
        categoria: 'acessorios',
        preco: 199.90,
        imagem: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=500&fit=crop',
        avaliacao: 5,
        destaque: true
    },
    {
        id: 11,
        nome: 'Óculos de Sol Preto',
        categoria: 'acessorios',
        preco: 189.90,
        imagem: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop',
        avaliacao: 5,
        destaque: true
    },
    {
        id: 12,
        nome: 'Pulseira de Prata',
        categoria: 'acessorios',
        preco: 89.90,
        imagem: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop',
        avaliacao: 4,
        destaque: false
    },
    {
        id: 13,
        nome: 'Corrente de Ouro',
        categoria: 'acessorios',
        preco: 129.90,
        imagem: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop',
        avaliacao: 5,
        destaque: false
    },
    {
        id: 14,
        nome: 'Cinto Preto Premium',
        categoria: 'acessorios',
        preco: 99.90,
        imagem: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
        avaliacao: 4,
        destaque: false
    }
];

// ===== CARRINHO STATE =====
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== NAVEGAÇÃO MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        const href = link.getAttribute('href');
        link.classList.remove('active');
        link.classList.add('active');
    });
});

// ===== RENDERIZAR PRODUTOS EM DESTAQUE =====
function renderizarProdutosDestaque() {
    const produtosDestaque = produtos.filter(p => p.destaque);
    const grid = document.getElementById('produtosGrid');
    
    grid.innerHTML = produtosDestaque.map(produto => criarCardProduto(produto)).join('');
    
    // Adicionar event listeners
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const produtoId = parseInt(e.target.dataset.id);
            adicionarAoCarrinho(produtoId);
            mostrarNotificacao('Produto adicionado ao carrinho!');
        });
    });
}

// ===== RENDERIZAR TODOS OS PRODUTOS =====
function renderizarTodosProdutos(categoria = 'all') {
    let produtosFiltrados = produtos;
    
    if (categoria !== 'all') {
        produtosFiltrados = produtos.filter(p => p.categoria === categoria);
    }
    
    const container = document.getElementById('allProducts');
    container.innerHTML = produtosFiltrados.map(produto => criarCardProduto(produto)).join('');
    
    // Adicionar event listeners
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const produtoId = parseInt(e.target.dataset.id);
            adicionarAoCarrinho(produtoId);
            mostrarNotificacao('Produto adicionado ao carrinho!');
        });
    });
}

// ===== CRIAR CARD DE PRODUTO =====
function criarCardProduto(produto) {
    const estrelas = '★'.repeat(produto.avaliacao) + '☆'.repeat(5 - produto.avaliacao);
    
    return `
        <div class="product-card" data-id="${produto.id}">
            <img src="${produto.imagem}" alt="${produto.nome}" class="product-image">
            <div class="product-info">
                <div class="product-category">${produto.categoria}</div>
                <h3 class="product-name">${produto.nome}</h3>
                <div class="product-rating">${estrelas}</div>
                <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
                <button class="btn-add-cart" data-id="${produto.id}">
                    + Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;
}

// ===== FILTROS DE PRODUTOS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remover active de todos
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Adicionar active ao clicado
        e.target.classList.add('active');
        // Filtrar
        const categoria = e.target.dataset.category;
        renderizarTodosProdutos(categoria);
    });
});

// ===== CARRINHO FUNCTIONS =====
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');

cartBtn.addEventListener('click', abrirCarrinho);
closeCart.addEventListener('click', fecharCarrinho);
cartOverlay.addEventListener('click', fecharCarrinho);

function abrirCarrinho() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharCarrinho() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const itemExistente = carrinho.find(item => item.id === produtoId);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    
    salvarCarrinho();
    atualizarCarrinho();
}

function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    salvarCarrinho();
    atualizarCarrinho();
}

function alterarQuantidade(produtoId, novaQuantidade) {
    const item = carrinho.find(i => i.id === produtoId);
    if (item) {
        if (novaQuantidade <= 0) {
            removerDoCarrinho(produtoId);
        } else {
            item.quantidade = novaQuantidade;
            salvarCarrinho();
            atualizarCarrinho();
        }
    }
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    cartCount.textContent = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Carrinho vazio</p>';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }
    
    cartItems.innerHTML = carrinho.map(item => `
        <div class="cart-item">
            <img src="${item.imagem}" alt="${item.nome}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.nome}</div>
                <div class="cart-item-price">R$ ${item.preco.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button onclick="alterarQuantidade(${item.id}, ${item.quantidade - 1})">−</button>
                    <span>${item.quantidade}</span>
                    <button onclick="alterarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removerDoCarrinho(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
}

// ===== BOTÃO FINALIZAR COMPRA =====
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    const mensagem = `Olá! Gostaria de finalizar meu pedido. Total: R$ ${total.toFixed(2)}`;
    const whatsappLink = `https://wa.me/5541997010228?text=${encodeURIComponent(mensagem)}`;
    
    window.open(whatsappLink, '_blank');
});

// ===== PROVADOR VIRTUAL =====
const selectTop = document.getElementById('selectTop');
const selectBottom = document.getElementById('selectBottom');
const selectAcessorio = document.getElementById('selectAcessorio');
const provadorTop = document.getElementById('provadorTop');
const provadorBottom = document.getElementById('provadorBottom');
const provadorAcessorio = document.getElementById('provadorAcessorio');
const addFromProvador = document.getElementById('addFromProvador');

selectTop.addEventListener('change', (e) => {
    const img = e.target.options[e.target.selectedIndex].dataset.img;
    if (img) {
        provadorTop.src = img;
        provadorTop.style.display = 'block';
    }
});

selectBottom.addEventListener('change', (e) => {
    const img = e.target.options[e.target.selectedIndex].dataset.img;
    if (img) {
        provadorBottom.src = img;
        provadorBottom.style.display = 'block';
    }
});

selectAcessorio.addEventListener('change', (e) => {
    const img = e.target.options[e.target.selectedIndex].dataset.img;
    if (img) {
        provadorAcessorio.src = img;
        provadorAcessorio.style.display = 'block';
    } else {
        provadorAcessorio.style.display = 'none';
    }
});

addFromProvador.addEventListener('click', () => {
    const topSelected = selectTop.value;
    const bottomSelected = selectBottom.value;
    
    if (!topSelected || !bottomSelected) {
        alert('Selecione pelo menos uma peça superior e uma peça inferior!');
        return;
    }
    
    // Encontrar produtos similares ou criar notificação
    let contador = 0;
    if (topSelected) contador++;
    if (bottomSelected) contador++;
    
    adicionarAoCarrinho(1); // Exemplo: adiciona o primeiro produto
    mostrarNotificacao(`Combinação adicionada ao carrinho!`);
    
    // Limpar seleções
    selectTop.value = '';
    selectBottom.value = '';
    selectAcessorio.value = '';
    provadorTop.src = '';
    provadorBottom.src = '';
    provadorAcessorio.src = '';
});

// ===== NOTIFICAÇÕES =====
function mostrarNotificacao(mensagem) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #25d366;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
    `;
    notif.textContent = mensagem;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideInLeft 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }, 2500);
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutosDestaque();
    renderizarTodosProdutos();
    atualizarCarrinho();
});
