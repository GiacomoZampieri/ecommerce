const loginLogoutButton = '.LoginLogout';
const adminIcon = '.adminIcon';
const cartIcon = '.navLoginCartIcon';
const cartCount = '.navbarCartCount';
const logoImage = '.navbarLogo > img';
 
const heroText = '.heroText';
const heroLink = '.heroLatestButton > a';

describe("Testing the Home page", () => { 

    beforeEach(() => {
        cy.visit('/')
    });

    it("The Navbar elements are displayed correctly",() => {

        cy.get(logoImage).should('exist').and('be.visible');

        cy.contains('HOME').should('exist').and('be.visible');

        cy.contains('NOVITA').should('exist').and('be.visible');

        cy.contains('UOMO').should('exist').and('be.visible');

        cy.contains('DONNA').should('exist').and('be.visible');

        cy.contains('BAMBINO').should('exist').and('be.visible');

        cy.get(loginLogoutButton).should('exist').and('be.visible');
        cy.get(loginLogoutButton).should('have.text','Login');

        cy.get(cartIcon).should('exist').and('be.visible');

        cy.get(cartCount).should('exist').and('be.visible');
        cy.get(cartCount).contains(0);

        cy.get(adminIcon).should('not.exist');
    });

    it("The home page is correctly displayed", () => {

        cy.get(heroText).should('exist').and('be.visible');
        cy.get(heroText).contains('new collections for everyone');

        cy.get(heroLink).should('exist').and('be.visible');
        cy.get(heroLink).contains('Scopri i nostri prodotti');

    })
 })