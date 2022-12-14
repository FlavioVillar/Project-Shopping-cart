require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('1 - verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('2 - Com o argumento "computador", a função fetch deve ser chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('3 - Com o argumento "computador", a função fetch deve ser chamada com o endpoint correto', async () => {
    const endpoint =
      'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('4 - Deve retornar um objeto com as propriedades esperadas', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });

  it('5 - Verifica se retorna erro ao executar a função sem parâmetro', async () => {
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'));
  });
});