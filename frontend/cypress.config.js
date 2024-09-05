const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001/', 
    setupNodeEvents(on, config) {
      
    },
    defaultCommandTimeout: 10000,  // Aumenta il timeout di default
    pageLoadTimeout: 60000,
  },
  reporter: 'mochawesome',
  env: {
    userLogged:"utente1",
    passwordLogged:"utente1",
    emailLogged:"utente1@gmail.com",
    usernameAdmin: 'admin',
    emailAdmin: 'admin@gmail.com',
    passwordAdmin: 'admin',
    usernameUser: 'Mario',
    emailUser: 'mario@gmail.com',
    passwordUser: 'Mario',
    newWomanProductBrand: 'Calvin Klein',
    newWomanProductDescription: 'Camicia a righe stretch',
    newWomanProductPrice: 79,
    newWomanProductTags: 'Camicia, Uomo',
    newManProductBrand: 'Stone Island',
    newManProductDescription: 'Piumino con cappuccio',
    newManProductPrice: 920,
    newManProductTags: 'Giubotto, Uomo, Inverno',
    newKidProductBrand: 'Adidas',
    newKidProductDescription: 'Maglietta da calcio',
    newKidProductPrice: 30,
    newKidProductTags: 'Maglietta, Estate',
  },
});
