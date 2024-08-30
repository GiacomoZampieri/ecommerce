describe('User Journey', () => {

  beforeEach(() => {
    cy.visit("http://localhost:3001")
  })
  it('passes', () => {
    cy.visit('http://localhost:3001/')
  })
})