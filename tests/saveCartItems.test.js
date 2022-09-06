const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('1 - Verifica se com o argumento "<ol><li>Item</li></ol>", saveCartItems é chamada ', () => {
    saveCartItems('<ol<li>Item</li></');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('2 - Verifica se com o argumento "<ol><li>Item</li></ol>", saveCartItems é chamada, com dois parâmetros ', () => {
    saveCartItems('<ol<li>Item</li></');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify('<ol<li>Item</li></'));
  });
  // fail('Teste vazio');
});