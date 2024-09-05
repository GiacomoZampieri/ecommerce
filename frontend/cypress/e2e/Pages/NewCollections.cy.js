const loginLogoutButton = '.LoginLogout';
const adminIcon = '.adminIcon';
const cartIcon = '.navLoginCartIcon';
const cartCount = '.navbarCartCount';
const logoImage = '.navbarLogo > img';

describe('Testing the New Collections page', () => { 

    beforeEach(() => {
        cy.visit('/')
    });

    it("Go to the New Collections section using the navbar menu", () => {

        cy.contains('NOVITA').click();

        cy.url().should('contains','/newcollections');
    })

    it("The Navbar elements are displayed correctly",() => {

        cy.contains('NOVITA').click();

        //Navbar elements
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
    
    it("A single item is correctly displayed",() => {

        cy.contains('NOVITA').click();

        //Get the first item of new collection items list
        for (let i = 1; i < 9; i++) {
            cy.get(`.collections > :nth-child(${i})`).should('exist').and('be.visible');

            cy.get(`.collections > :nth-child(${i}) > a > img`).should('exist').and('be.visible');
    
            cy.get(`.collections > :nth-child(${i}) > .brand`).should('exist').and('be.visible');

            cy.get(`.collections > :nth-child(${i}) > .description`).should('exist').and('be.visible');
    
            cy.get(`.collections > :nth-child(${i}) > .itemPrice`).should('exist').and('be.visible');
        }
        
    });
 })