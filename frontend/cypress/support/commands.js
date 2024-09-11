let variabileGlobale = '';

Cypress.Commands.add("getByName", (selector) => {
    return cy.get(`[name=${selector}]`)
})

Cypress.Commands.add("getByValue", (selector) => {
    return cy.get(`[value=${selector}]`)
})

Cypress.Commands.add('setVariabileGlobale', (nuovoValore) => {
  variabileGlobale = nuovoValore;
});

Cypress.Commands.add('getVariabileGlobale', () => {
  return variabileGlobale;
});