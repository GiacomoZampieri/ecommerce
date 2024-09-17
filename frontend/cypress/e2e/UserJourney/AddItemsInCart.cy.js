/* eslint-disable cypress/unsafe-to-chain-command */

let brand, description, price;

const usernameUser = Cypress.env('usernameUser');
const passwordUser = Cypress.env('passwordUser');
const emailUser = Cypress.env('emailUser');

const cartCount = '.navbarCartCount';
const productDescription = '.productDisplayRightDescription > p';
const itemImage = '.shopCategoryProducts > :nth-child(1) > a > img';
const firstItem = '.shopCategoryProducts > :nth-child(1)';
const itemBrand = '.shopCategoryProducts > :nth-child(1) > .brand';
const itemDescription = '.shopCategoryProducts > :nth-child(1) > .description';
const itemPrice = '.shopCategoryProducts > :nth-child(1) > .itemPrice';
const sizeSelector = '.productDisplayRightSizes';
const xlSizeSelector = '.productDisplayRightSizes :nth-child(4)';

const inputUsername = "input[name='username']";
const inputEmail = "input[name='email']";
const inputPassword = "input[name='password']";
const errorMessage = ".error"
const signUpButton = ".loginSignupFields > button";
const loginLogoutButton = '.LoginLogout';

describe('Adding items in the cart', () => { 

    beforeEach(() => {
        cy.visit('/');
    });


    it('The product page is displayed correctly',() => {

        cy.contains('UOMO').click();

        cy.get(firstItem).should('exist').and('be.visible');

        //Save data of the first item of the men page
        
        cy.get(itemBrand).should(($input) => {
            brand = $input.text();
        });

        cy.get(itemDescription).should(($input) => {
            description = $input.text();
        });

        cy.get(itemPrice).should(($input) => {
            price = $input.text();
        });

        //Click on the first item of the men page
        cy.get(itemImage).click();

        cy.url().should('contains','/product/');

        cy.get(cartCount).should('exist').and('be.visible');
        cy.get(cartCount).contains(0);

        cy.then(() => {

            cy.contains(brand).should('exist').and('be.visible');

            const descr = description.slice(0,-5);

            cy.get(productDescription).should('contain',descr);

            cy.contains(price).should('exist').and('be.visible');

        });

        //The size selector is correctly displayed

        cy.get(sizeSelector).should('exist').and('be.visible');

        cy.get('.productDisplayRightSizes > :nth-child(1)').should('have.text','S');
        cy.get('.productDisplayRightSizes > :nth-child(2)').should('have.text','M');
        cy.get('.productDisplayRightSizes > :nth-child(3)').should('have.text','L');
        cy.get('.productDisplayRightSizes > :nth-child(4)').should('have.text','XL');
        cy.get('.productDisplayRightSizes > :nth-child(5)').should('have.text','XXL');

        //The add to cart button is correctly displayed

        cy.contains('AGGIUNGI AL CARRELLO').should('exist').and('be.visible');

        //The tags section is correctly displayed

        cy.contains('Tags').should('exist').and('be.visible');
    });

    it('The user is not logged and tries to add a product to the cart',() => {

        cy.contains('UOMO').click();

        cy.get(firstItem).click();

        //Select a size
        cy.get('.productDisplayRightSizes > :nth-child(4)').should('have.text','XL');

        //Click on add to cart button
        cy.contains('AGGIUNGI AL CARRELLO').click();

        cy.url().should('contains','/login');

    });

    it('The user is not logged, tries to add a product to the cart, signup to the site and try again',() => {

        cy.contains('UOMO').click();

        cy.get(itemImage).click();

        cy.url().should('contains','/product');

        //Select a size
        cy.get('.productDisplayRightSizes > :nth-child(4)').should('have.text','XL');

        //Click on login button
        cy.contains('AGGIUNGI AL CARRELLO').click();

        cy.url().should('contains','/login');

        cy.get(cartCount).contains(0);

        cy.contains('Clicca qui').click();

        cy.get(inputUsername).click().type(usernameUser);
        cy.get(inputEmail).click().type(emailUser);
        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('not.exist');

        cy.url().should('eq','http://localhost:3001/');

        cy.get(loginLogoutButton).should('have.text','Logout');

        cy.contains('UOMO').click();

        cy.get(itemImage).click();

        cy.url().should('contains','/product');

        //Select a size
        cy.get(xlSizeSelector).click();
        cy.get(xlSizeSelector).should('have.css','backgroundColor','rgb(173, 216, 230)');

        //Click on add to cart button
        cy.contains('AGGIUNGI AL CARRELLO').click();

        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');
        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('have.css','color','rgb(1, 139, 1)');

        //Check the cart counter 
        cy.get(cartCount).contains(1);
    });

    it('The user is logged and try to add an item to the cart',() => {

        cy.contains('Login').click();

        cy.get(inputEmail).click().type(emailUser);
        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('not.exist');

        cy.url().should('eq','http://localhost:3001/');

        cy.get(loginLogoutButton).should('have.text','Logout');

        cy.contains('UOMO').click();

        cy.get(itemImage).click();

        cy.url().should('contains','/product');

        //Select a size
        cy.get(xlSizeSelector).click();
        cy.get(xlSizeSelector).should('have.css','backgroundColor','rgb(173, 216, 230)');

        //Click on add to cart button
        cy.contains('AGGIUNGI AL CARRELLO').click();

        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');
        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('have.css','color','rgb(1, 139, 1)');

        //Check the cart counter 
        cy.get(cartCount).contains(2);
    });


    it('Should delete a the user from MongoDB', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:4000/removeUser', 
            body: { email: emailUser }
          }).then((response) => {
            expect(response.status).to.eq(200); 
        });
    });
})