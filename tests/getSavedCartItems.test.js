const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // ao executar getSavedCartItems, o método localStorage.getItem é chamado;
  it('1 - Verifica se localStorage.getItem é chamado, ao executar getSavedCartItems ', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('2 - Verifica se localStorage.getItem é chamado, ao executar getSavedCartItems com "cartItems" como parâmetro', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
  // fail('Teste vazio');
});