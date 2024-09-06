/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable cypress/unsafe-to-chain-command */
let brandMan, descriptionMan, priceMan, brandWoman, descriptionWoman, priceWoman, quantityFirstItem,  quantitySecondItem;

const passwordUser = Cypress.env('passwordLogged');
const emailUser = Cypress.env('emailLogged');
const inputEmail = "input[name='email']";
const inputPassword = "input[name='password']";
const errorMessage = ".error"
const signUpButton = ".loginSignupFields > button";
const loginLogoutButton = '.LoginLogout';

const cartIcon = '.navLoginCartIcon';
const cartCount = '.navbarCartCount';
const removeIcon = "svg[data-icon='xmark']";
const productDescription = '.productDisplayRightDescription > p';
const itemImage = '.shopCategoryProducts > :nth-child(1) > a > img';
const firstItem = '.shopCategoryProducts > :nth-child(1)';
const itemBrand = '.shopCategoryProducts > :nth-child(1) > .brand';
const itemDescription = '.shopCategoryProducts > :nth-child(1) > .description';
const itemPrice = '.shopCategoryProducts > :nth-child(1) > .itemPrice';
const mSizeSelector = '.productDisplayRightSizes :nth-child(2)';
const sSizeSelector = '.productDisplayRightSizes :nth-child(1)';

const firstItemCart = ':nth-child(1) > .cartItemsSingle';
const firstItemCartBrand = ':nth-child(1) > .cartItemsSingle > .cartItemsBrand';
const firstItemCartSize = ':nth-child(1) > .cartItemsSingle > .cartItemsSize';
const firstItemCartPrice = ':nth-child(1) > .cartItemsSingle > .cartItemsPrice';
const firstItemCartQuantity = ':nth-child(1) > .cartItemsSingle > .cartItemsQuantity';
const firstItemCartTotal = ':nth-child(1) > .cartItemsSingle > .cartItemsTotalPrice';
const secondItemCart = ':nth-child(2) > .cartItemsSingle';
const secondItemCartBrand = ':nth-child(2)  > .cartItemsSingle > .cartItemsBrand';
const secondItemCartSize = ':nth-child(2) > .cartItemsSingle > .cartItemsSize';
const secondItemCartPrice = ':nth-child(2)  > .cartItemsSingle > .cartItemsPrice';
const secondItemCartQuantity = ':nth-child(2)  > .cartItemsSingle > .cartItemsQuantity';
const secondItemCartTotal = ':nth-child(2) > .cartItemsSingle > .cartItemsTotalPrice';
const totalPrice = '.cartitems-total-item > h2';

const firstNewItem = '.collections > :nth-child(1)';
const firstNewItemImage = '.collections > :nth-child(1) > a > img';
const secondNewItem = '.collections > :nth-child(2)';
const secondNewItemImage = '.collections > :nth-child(2) > a > img';

describe('Check the cart page correctness', () => { 
    
    beforeEach(() => {
        cy.visit("/");
    });

    it("Add two products in the cart and check the correctness of the cart page",() => {

        cy.contains('UOMO').click();

        cy.get(firstItem).should('exist').and('be.visible');

        //Save data of the first item of the men page
        
        cy.get(itemBrand).should(($input) => {
            brandMan = $input.text();
        });

        cy.get(itemDescription).should(($input) => {
            descriptionMan = $input.text();
        });

        cy.get(itemPrice).should(($input) => {
            priceMan = parseInt($input.text(), 10);
        });

        //Click on the first item of the men page
        cy.get(itemImage).click();

        cy.then(() =>{

            cy.contains(brandMan).should('exist').and('be.visible');

            const descr = descriptionMan.slice(0,-5);

            cy.get(productDescription).should('contain',descr);

            cy.contains(priceMan).should('exist').and('be.visible');

        });

        cy.get(mSizeSelector).click();

        cy.contains("ADD TO CART").click();

        //Login
        cy.get(inputEmail).click().type(emailUser);
        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('not.exist');

        cy.url().should('eq','http://localhost:3001/');

        cy.get(loginLogoutButton).should('have.text','Logout');

        //Select a man product
        cy.contains('UOMO').click();

        cy.get(itemImage).click();

        cy.get(mSizeSelector).click();

        cy.contains('ADD TO CART').click();

        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');

        //Check the cart counter 
        cy.get(cartCount).contains(1);

        //Select a women product
        cy.contains('DONNA').click();

        //Save data of the first item of the woman's page
        
        cy.get(itemBrand).should(($input) => {
            brandWoman = $input.text();
        });

        cy.get(itemDescription).should(($input) => {
            descriptionWoman = $input.text();
        });

        cy.get(itemPrice).should(($input) => {
            priceWoman = parseInt($input.text(), 10);
        });

        //Click on the first item of the woman's page
        cy.get(itemImage).click();

        cy.then(() => {

            cy.contains(brandWoman).should('exist').and('be.visible');

            const descr = descriptionWoman.slice(0,-5);

            cy.get(productDescription).should('contain',descr);

            cy.contains(priceWoman).should('exist').and('be.visible');

            cy.get(sSizeSelector).click();

            cy.contains('ADD TO CART').click();

            cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');

            //Check the cart counter 
            cy.get(cartCount).contains(2);

            //Check the Cart page
            cy.get(cartIcon).click();

            cy.get(firstItemCart).should('exist').and('be.visible');
            cy.get(secondItemCart).should('exist').and('be.visible');

            //Check the correctness of the first item
            cy.get(firstItemCartBrand).should('have.text',brandMan);
            cy.get(firstItemCartSize).should('have.text','m');
            cy.get(firstItemCartPrice).should('have.text',priceMan + ' €');
            cy.get(firstItemCartQuantity).should('have.text','1');
            cy.get(firstItemCartQuantity).should(($input) => {
                quantityFirstItem = parseInt($input.text(), 10); //Transform into number
                expect(quantityFirstItem).to.be.a('number'); 
            });

            cy.then(() => {
                cy.get(firstItemCartTotal).should('have.text',priceMan*quantityFirstItem + ' €');
            });
            
            //Check the correctness of the second item
            cy.get(secondItemCartBrand).should('have.text',brandWoman);
            cy.get(secondItemCartSize).should('have.text','s');
            cy.get(secondItemCartPrice).should('have.text',priceWoman + ' €');
            cy.get(secondItemCartQuantity).should('have.text','1');
            cy.get(secondItemCartQuantity).should(($input) => {
                quantitySecondItem = parseInt($input.text(), 10); //Transform into number
                expect(quantitySecondItem).to.be.a('number'); 
            });

            cy.then(() => {
                cy.get(secondItemCartTotal).should('have.text',priceWoman*quantitySecondItem + ' €');

                cy.get(totalPrice).should('have.text',priceMan*quantityFirstItem + priceWoman*quantitySecondItem + ' €');
            });
        });
    });

    it('It is possible delete the items in the cart clicking on the x',() => {

        //Login
        cy.contains('Login').click();

        cy.get(inputEmail).click().type(emailUser);
        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.wait(1000);

        cy.get(cartCount).should('have.text',2);

        cy.get(cartIcon).click();

        //Delete the first item
        cy.get(removeIcon).first().click();

        cy.get(cartCount).should('have.text',1);

        cy.get(secondItemCart).should('not.exist');

        let total = 0;

        cy.get(firstItemCartPrice).should(($input) => {
            total = parseInt($input.text(), 10); //Transform into number
            expect(total).to.be.a('number'); 
        });

        cy.get(firstItemCartQuantity).should(($input) => {
            quantitySecondItem = parseInt($input.text(), 10); //Transform into number
            expect(quantitySecondItem).to.be.a('number'); 
        });

        cy.then(() => {

            cy.get(totalPrice).should('have.text', total*quantitySecondItem + ' €');
        });

        //Remove the last item
        cy.get(removeIcon).first().click();

        cy.get(cartCount).should('have.text',0);

        cy.get(firstItemCart).should('not.exist');

        cy.get(totalPrice).should('have.text', '0 €');
    });

    it('Add two products of the same type', () => {

        let price1, price2, total;

        //Login
        cy.contains('Login').click();

        cy.get(inputEmail).click().type(emailUser);
        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.wait(1000);

        cy.get(cartCount).should('have.text',0);

        //Add two products of the same type

        //Select a kid product
        cy.contains('BAMBINO').click();

        cy.get(itemImage).click();

        cy.get(mSizeSelector).click();

        cy.contains('ADD TO CART').click();

        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');

        cy.contains('ADD TO CART').click();

        cy.get(cartCount).contains(2);

        cy.get(cartIcon).click();

        cy.get(firstItemCart).should('exist').and('be.visible');

        cy.get(firstItemCartQuantity).should('have.text','2');

        cy.get(firstItemCartPrice).should(($input) => {
            price1 = parseInt($input.text(), 10); //Transform into number
            expect(price1).to.be.a('number'); 
        });

        cy.get(firstItemCartQuantity).should(($input) => {
            quantityFirstItem = parseInt($input.text(), 10); //Transform into number
            expect(quantityFirstItem).to.be.a('number'); 
        });

        cy.then(() => {

            cy.get(totalPrice).should('have.text', price1*quantityFirstItem + ' €');
            cy.get(totalPrice).should(($input) => {
                total = parseInt($input.text(), 10); //Transform into number
                expect(total).to.be.a('number'); 
            });
    

            //Click on the remove icon
            cy.get(removeIcon).first().click();

            cy.get(cartCount).should('have.text',1);

            cy.get(firstItemCart).should('exist').and('be.visible');

            cy.get(firstItemCartQuantity).should('have.text','1');

            cy.get(firstItemCartPrice).should(($input) => {
                price2 = parseInt($input.text(), 10); //Transform into number
                expect(price2).to.be.a('number'); 
            });

            cy.get(firstItemCartQuantity).should(($input) => {
                quantityFirstItem = parseInt($input.text(), 10); //Transform into number
                expect(quantityFirstItem).to.be.a('number'); 
            });

            cy.then(() => {
                cy.get(totalPrice).should('have.text', price2*quantityFirstItem + ' €');
                cy.get(totalPrice).should('have.text', total/2 + ' €');
    
            });

            cy.get(removeIcon).first().click();

            cy.get(cartCount).should('have.text',0);

            cy.get(firstItemCart).should('not.exist');

            cy.get(totalPrice).should('have.text','0 €');
        });
    });

    it.only('If the user log out from the page and after log in, the items will remain in the cart',() => {

        let brand1, price1, brand2, price2, total;

        //Login
        cy.contains('Login').click();

        cy.get(inputEmail).click().type(emailUser);
        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.wait(1000);

        cy.get(cartCount).should('have.text',0);

        //Add two products from the NOVITA section

        cy.contains('NOVITA').click();
        cy.url().should('include','/newcollections');

        cy.get(firstNewItemImage).should('exist').and('be.visible');
        cy.get(firstNewItemImage).click({force:true});

        cy.url().should('include','/product');

        cy.get('.productDisplayRight > h1').should(($input) => {
            brand1 = $input.text();
        });

        cy.get('.productDisplayRight > .productDisplayPrice').should(($input) => {
            price1 = parseInt($input.text(), 10); //Transform into number
            console.log(price1);
            expect(price1).to.be.a('number'); 
        });

        cy.get(mSizeSelector).click();

        cy.contains('ADD TO CART').click();

        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');

        cy.get(cartCount).should('have.text',1);

        //Select the second item from the NOVITA section
        cy.contains('NOVITA').click();
        cy.url().should('include','/newcollections');

        cy.get(secondNewItem).should('exist').and('be.visible');
        cy.get(secondNewItemImage).click({force:true});

        cy.get('.productDisplayRight > h1').should(($input) => {
            brand2 = $input.text();
        });

        cy.get('.productDisplayRight > .productDisplayPrice').should(($input) => {
            price2 = parseInt($input.text(), 10); //Transform into number
            
            expect(price2).to.be.a('number'); 
        });

        cy.get(mSizeSelector).click();

        cy.contains('ADD TO CART').click();

        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');

        cy.get(cartCount).should('have.text',2);

        //Logout
        cy.contains('Logout').click();

        cy.url().should('eq','http://localhost:3001/');

        cy.contains('Login').should('exist').and('be.visible');
        cy.contains('Logout').should('not.exist');

        //Login
        cy.contains('Login').click();

        cy.get(inputEmail).click().type(emailUser);
        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.wait(1000);

        cy.get(cartCount).should('have.text',2);

        cy.get(cartIcon).click();

        cy.then(() => {

            cy.get(firstItemCartBrand).should('have.text',brand1);
            cy.get(firstItemCartPrice).should('have.text',price1 + ' €');

            cy.get(secondItemCartBrand).should('have.text',brand2);
            cy.get(secondItemCartPrice).should('have.text',price2 + ' €');

            cy.get(totalPrice).should('have.text',price2 + price1 + ' €');
        });

        cy.get(removeIcon).first().click();

        cy.get(removeIcon).first().click();

        cy.get(cartCount).should('have.text',0);
    });
});