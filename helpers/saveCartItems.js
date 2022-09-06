const saveCartItems = (Item) => localStorage.setItem('cartItems', JSON.stringify(Item));

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}