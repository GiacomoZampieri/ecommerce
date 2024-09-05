const loginLogoutButton = '.LoginLogout';
const adminIcon = '.adminIcon';
const cartIcon = '.navLoginCartIcon';
const cartCount = '.navbarCartCount';
const logoImage = '.navbarLogo > img';

const searchbar = '.shopCategoryInput';

describe("Testing the woman's products page", () => { 

    beforeEach(() => {
        cy.visit('/')
    });

    it("Go to the Woman section using the navbar menu", () => {

        cy.contains('DONNA').click();

        cy.url().should('contains','/woman');
    })

    it("The page is displayed correctly",() => {

        cy.contains('DONNA').click();

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

        //Searchbar
        cy.get(searchbar).should('exist').and('be.visible');
        cy.get(searchbar).should('have.attr','placeholder','Cerca il brand che preferisci...');
    });
    
    it("A single item is correctly displayed",() => {

        cy.contains('DONNA').click();

        cy.request({
            method: 'POST',
            url: 'http://localhost:4000/countproducts', 
            body: { category: 'donna' } 
          }).then((response) => {
            for (let i = 1; i < response.body.count; i++) {
                cy.get(`.shopCategoryProducts > :nth-child(${i})`).should('exist').and('be.visible');
    
                cy.get(`.shopCategoryProducts > :nth-child(${i}) > a > img`).should('exist').and('be.visible');
        
                cy.get(`.shopCategoryProducts > :nth-child(${i}) > .brand`).should('exist').and('be.visible');
    
                cy.get(`.shopCategoryProducts > :nth-child(${i}) > .description`).should('exist').and('be.visible');
        
                cy.get(`.shopCategoryProducts > :nth-child(${i}) > .itemPrice`).should('exist').and('be.visible');
            }
        });
    });
 })