// arquivo desenvolvido pela Trybe para o curso de desenvolvimento front-end
function localStorageSimulator(key) {
  Object.defineProperty(window, 'localStorage', {
    value: {
      [key]: jest.fn(),
    },
  });
}

afterEach(jest.clearAllMocks);

module.exports = localStorageSimulator;