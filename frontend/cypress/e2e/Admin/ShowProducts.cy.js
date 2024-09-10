/* eslint-disable cypress/unsafe-to-chain-command */
//Dati già presenti all'interno del database
const passwordAdmin = Cypress.env('passwordAdmin');
const emailAdmin = Cypress.env('emailAdmin');

const inputEmail = "input[name='email']";
const inputPassword = "input[name='password']";
const errorMessage = ".error";
const loginButton = ".loginSignupFields > button";

const loginLogoutButton = '.LoginLogout';
const adminIcon = '.adminIcon';
const cartIcon = '.navLoginCartIcon';
const cartCount = '.navbarCartCount';
const logoImage = '.navbarLogo > img';

const addProduct = '[href="/admin/addproduct"] > .sidebarItem';
const addProductIcon = '[href="/admin/addproduct"] > .sidebarItem > .sidebarIcon';
const addProductText = '[href="/admin/addproduct"] > .sidebarItem > p';
const showProduct = '[href="/admin/showproducts"] > .sidebarItem';
const showProductIcon = '[href="/admin/showproducts"] > .sidebarItem > .sidebarIcon';
const showProductText = '[href="/admin/showproducts"] > .sidebarItem > p';
const productListTitle = '.productsList > h1';

describe('Testing admin showProdcuts functionality', () => { 

    beforeEach(() => {
        Cypress.on('uncaught:exception', () => { return false })

        cy.visit("/"); 
    
        cy.get(loginLogoutButton).click();

        cy.get(inputEmail).click().type(emailAdmin);
        cy.get(inputPassword).click().type(passwordAdmin);

        cy.get(loginButton).click();

        cy.get(errorMessage).should('not.exist');

        cy.url().should('eq','http://localhost:3001/');

        cy.get(loginLogoutButton).should('have.text','Logout');

        cy.get(adminIcon).should('exist').and('be.visible');
        
    });

    it('The Admin page is correctly displayed', () => {

        cy.get(adminIcon).click();

        cy.url().should('contains','/admin');
        
        //Navbar elements
        cy.get(logoImage).should('exist').and('be.visible');

        cy.contains('HOME').should('exist').and('be.visible');

        cy.contains('NOVITA').should('exist').and('be.visible');

        cy.contains('UOMO').should('exist').and('be.visible');

        cy.contains('DONNA').should('exist').and('be.visible');

        cy.contains('BAMBINO').should('exist').and('be.visible');

        cy.get(loginLogoutButton).should('exist').and('be.visible');
        cy.get(loginLogoutButton).should('have.text','Logout');

        cy.get(cartIcon).should('exist').and('be.visible');

        cy.get(cartCount).should('exist').and('be.visible');
        cy.get(cartCount).contains(0);

        cy.get(adminIcon).should('exist').and('be.visible');

        //Page elements
        cy.get(addProduct).should('exist').and('be.visible');
        cy.get(addProductIcon).should('exist').and('be.visible');
        cy.get(addProductText).contains('AGGIUNGI PRODOTTO');

        cy.get(showProduct).should('exist').and('be.visible');
        cy.get(showProductIcon).should('exist').and('be.visible');
        cy.get(showProductText).contains('LISTA PRODOTTI');
    });

    it('The sidebar in the Show Products page is correctly displayed', () => {

        cy.get(adminIcon).click();

        cy.get(showProduct).click();

        cy.url().should('contains','/admin/showproducts');

        cy.get(addProduct).should('exist').and('be.visible');
        cy.get(addProductIcon).should('exist').and('be.visible');
        cy.get(addProductText).contains('AGGIUNGI PRODOTTO');

        cy.get(showProduct).should('exist').and('be.visible');
        cy.get(showProductIcon).should('exist').and('be.visible');
        cy.get(showProductText).contains('LISTA PRODOTTI');
    });

    it('The navbar in the Show Products page is correctly displayed', () => {

        cy.get(adminIcon).click();

        cy.get(showProduct).click();

        cy.get(logoImage).should('exist').and('be.visible');

        cy.contains('HOME').should('exist').and('be.visible');

        cy.contains('NOVITA').should('exist').and('be.visible');

        cy.contains('UOMO').should('exist').and('be.visible');

        cy.contains('DONNA').should('exist').and('be.visible');

        cy.contains('BAMBINO').should('exist').and('be.visible');

        cy.get(loginLogoutButton).should('exist').and('be.visible');
        cy.get(loginLogoutButton).should('have.text','Logout');

        cy.get(cartIcon).should('exist').and('be.visible');

        cy.get(cartCount).should('exist').and('be.visible');
        cy.get(cartCount).contains(0);

        cy.get(adminIcon).should('exist').and('be.visible');
    });

    it('The table in the Show Products page is correctly displayed', () => {

        cy.get(adminIcon).click();

        cy.get(showProduct).click();

        cy.get(productListTitle).should('exist').and('be.visible');
        cy.get(productListTitle).should('have.text','LISTA PRODOTTI');

        cy.contains('IMMAGINE').should('exist').and('be.visible');
        cy.contains('BRAND').should('exist').and('be.visible');
        cy.contains('DESCRIZIONE').should('exist').and('be.visible');
        cy.contains('PREZZO').should('exist').and('be.visible');
        cy.contains('CATEGORIA').should('exist').and('be.visible');
        cy.contains('TAGS').should('exist').and('be.visible');
    });

    it('The elements in the table are correctly displayed', () => {

        cy.get(adminIcon).click();

        cy.get(showProduct).click();

        cy.request({
            method: 'POST',
            url: 'http://localhost:4000/countproducts'
          }).then((response) => {
        
            for (let i = 2; i < response.body.count; i+=2) {

                cy.get(`.productsList-allProducts > :nth-child(${i})`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${i}) >  .productsListProductImage`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${i}) >  .productsListProductBrand`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${i}) >  .productsListProductDesc`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${i}) >  .productsListProductPrice`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${i}) >  .productsListProductCategory`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${i}) >  .productsListProductTags`).should('exist').and('be.visible');

                cy.get(`.productsList-allProducts > :nth-child(${i+2})`).scrollIntoView();
            }
        });
    });
})