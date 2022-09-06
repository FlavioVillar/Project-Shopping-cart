const sectionItens = document.querySelector('.items');
const cartListOl = document.querySelector('.cart__items');
const btnClear = document.querySelector('.empty-cart');
const totalPrice = document.querySelector('.total-price');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image, price: salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';
  const newIMG = image.replace('-I.jpg', '-J.jpg');
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(newIMG));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${salePrice.toFixed(2)}`));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
    );
    
    return section;
  }
  
 function saveLocalStorage() {
    saveCartItems(Array.from(cartListOl.children).map(({ id: item }) => item));
  }
  
  async function createLoading() {
    const div = await document.createElement('div');
    div.className = 'loading';
    div.innerText = 'carregando...';
    sectionItens.appendChild(div);
  }
  
  function removeLoading() {
    document.querySelector('.loading').remove();
  }

function getTotalPrice() {
  const arrLi = Array.from(cartListOl.children);
  const listPrice = arrLi
    .map((item) => item.innerText.split('$')[1])
    .reduce((acc, cur) => Number(acc) + Number(cur), 0);

  totalPrice.innerText = `R$ ${listPrice.toFixed(2)}`;
}

async function fetchListOfProducts() {
  const ListProductsFetch = await fetchProducts('computador');
  ListProductsFetch.results.forEach((item) => {
    sectionItens.appendChild(createProductItemElement(item));
  });
  getTotalPrice();
  removeLoading();
}

function cartItemClickListener(event) {
  event.target.remove();
  saveLocalStorage();
  getTotalPrice();
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ id: sku, title: name, price: salePrice, thumbnail: image }) {
  const li = document.createElement('li');
  li.id = sku;
  li.className = 'cart__item';
  li.innerText = `${name} 

  R$ ${salePrice.toFixed(2)}`;
  li.addEventListener('click', cartItemClickListener);
  li.appendChild(createProductImageElement(image)); 
  return li;
}

async function createItemOfFetchItem(element) {
  const itemForCart = await fetchItem(element);
  cartListOl.appendChild(createCartItemElement(itemForCart));
  saveLocalStorage();
  getTotalPrice();
}

sectionItens.addEventListener('click', async (event) => {
  if (event.target.classList.contains('item__add')) {
    const getItemSKU = getSkuFromProductItem(event.target.parentNode); // pega somente o SKU    
    createItemOfFetchItem(getItemSKU);
  }
});

async function GetItemStorage() {
  const cartStorageItem = JSON.parse(getSavedCartItems('cartItems'));
  if (cartStorageItem) {
    cartStorageItem.forEach((item) => createItemOfFetchItem(item));
  }
}

const test = btnClear.addEventListener('click', () => {
  cartListOl.innerHTML = '';
  localStorage.clear();
  getTotalPrice();
});

window.onload = () => {
  createLoading();
  fetchListOfProducts();
  GetItemStorage(); 
};