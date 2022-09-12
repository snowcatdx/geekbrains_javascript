'use strict';
const cartCounter = document.querySelector('.cartCount');
const cartTotalValue = document.querySelector('.popupTotal_value');
const cartPopup = document.querySelector('.cartIconWrap_popup');
const cartContentWrapper = document.querySelector('.popupBody');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  cartPopup.classList.toggle('active');
});

const cartContent = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
  if(!event.target.closest('.add-to-cart-btn')) {
    return;
  }

  const productElem = event.target.closest('.featuredItem');
  const prodId = +productElem.dataset.id;
  const prodName = productElem.dataset.name;
  const prodPrice = +productElem.dataset.price;

  addToCart(prodId, prodName, prodPrice);
  
  console.log(cartContent);
});

/**
 * Функция добавляет выбранный продукт в корзину
 * @param {number} prodId - ID продукта
 * @param {string} prodName - Название продукта
 * @param {number} prodPrice - Цена продукта
 */
function addToCart(prodId, prodName, prodPrice) {
  if(!(prodId in cartContent)) {
    cartContent[prodId] = {
      prodId: prodId,
      prodName: prodName,
      prodPrice: prodPrice,
      count: 0,
    }
  }
  
  cartContent[prodId].count++;

  cartCounter.textContent = getCartCount();

  cartTotalValue.textContent = getCartTotalPrice().toFixed(2);

  renderProdInCart(prodId);
}

/**
 * Функция считает кол-во продуктов в корзине и возвращает
 * @return {number} - Кол-во продуктов
 */
function getCartCount() {
  return Object.values(cartContent).reduce((acc, prod) => acc + prod.count, 0);
}

/**
 * Функция считает сумму стоимости товаров в корзине
 * @return {number} - Общая стоимость
 */
function getCartTotalPrice() {
  return Object.values(cartContent)
  .reduce((acc, prod) => acc + prod.count * prod.prodPrice, 0);
}

/**
 * Функция выводит HTML продукта в корзину
 * @param {number} prodId - ID продукта
 */
function renderProdInCart(prodId) {
  const prodRowEl = document.querySelector(`.popupRow[data-id="${prodId}"]`);

  if(!prodRowEl) {
    renderNewProdInCart(prodId);
    return;
  }

  const product = cartContent[prodId];

}

function renderNewProdInCart(prodId) {
  const productRow = `
    <div class="row g-1 popupRow" data-id="${prodId}">
      <span class="col-6">${cartContent[prodId].prodName}</span>
      <span class="col-2">$${cartContent[prodId].prodPrice}</span>
      <span class="col-2 prod-count-value">${cartContent[prodId].count} шт.</span>
      <span class="col-2">$${
        (cartContent[prodId].prodPrice * cartContent[prodId].count).toFixed(2)
      }</span>
    </div>
    `;

  cartContentWrapper.insertAdjacentHTML("afterBegin", productRow);
}