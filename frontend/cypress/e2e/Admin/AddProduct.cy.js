//Correttezza pagina
//Aggiungere un prodotto e verificare che venga visualizzato in novita e categoria giusta. Farlo per tutte e tre le categorie.
//Vedere se si riesce che venga fuori anche in show products

/* eslint-disable cypress/unsafe-to-chain-command */
const passwordAdmin = Cypress.env('passwordAdmin');
const emailAdmin = Cypress.env('emailAdmin');

const newManProductBrand = Cypress.env('newManProductBrand');
const newManProductDescription = Cypress.env('newManProductDescription');
const newManProductPrice = Cypress.env('newManProductPrice');
const newManProductTags = Cypress.env('newManProductTags');
const newWomanProductBrand = Cypress.env('newWomanProductBrand');
const newWomanProductDescription = Cypress.env('newWomanProductDescription');
const newWomanProductPrice = Cypress.env('newWomanProductPrice');
const newWomanProductTags = Cypress.env('newWomanProductTags');
const newKidProductBrand = Cypress.env('newKidProductBrand');
const newKidProductDescription = Cypress.env('newKidProductDescription');
const newKidProductPrice = Cypress.env('newKidProductPrice');
const newKidProductTags = Cypress.env('newKidProductTags');

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

const addButton = '.addProductButton';
const uploadImage = '.addProductInput > label > img';
const path = './cypress/photoTest.avif' //Path of the photo

describe('Testing the addProduct functionality', () => {
    
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

        cy.get(addProduct).click();

        cy.url().should('contains','/admin/addproduct');

        cy.get(addProduct).should('exist').and('be.visible');
        cy.get(addProductIcon).should('exist').and('be.visible');
        cy.get(addProductText).contains('AGGIUNGI PRODOTTO');

        cy.contains('LISTA PRODOTTI').should('exist').and('be.visible');
        cy.get(showProductIcon).should('exist').and('be.visible');
        cy.get(showProductText).contains('LISTA PRODOTTI');
    });

    it('The navbar in the Show Products page is correctly displayed', () => {

        cy.get(adminIcon).click();

        cy.get(addProduct).click();

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

    it('The form in the Add Product page is correctly displayed', () => {

        cy.get(adminIcon).click();

        cy.get(addProduct).click();

        //Custom Command
        cy.getByName('brand').should('exist').and('be.visible');
        cy.getByName('brand').should('have.attr','placeholder','Inserisci il brand del prodotto...');

        cy.getByName('description').should('exist').and('be.visible');
        cy.get("input[name='description']").should('have.attr','placeholder','Inserisci la descrizione del prodotto...');

        cy.getByName('price').should('exist').and('be.visible');
        cy.getByName('price').should('have.attr','placeholder','Inserisci il prezzo del prodotto...');

        cy.getByName('price').should('exist').and('be.visible');
        cy.getByName('price').should('have.attr','placeholder','Inserisci il prezzo del prodotto...');

        cy.getByName('category').should('exist').and('be.visible');

        cy.getByValue('donna').should('exist').and('be.visible');

        cy.getByName('tags').should('exist').and('be.visible');
        cy.getByName('tags').should('have.attr','placeholder','Inserisci i tags del prodotto...');

        cy.getByName('image').should('exist');

        cy.get(uploadImage).should('exist').and('be.visible');

        cy.get(addButton).should('exist').and('be.visible');
    });

    describe('The form in the Add Product page works correctly', () => {

        beforeEach(() => {

            cy.get(adminIcon).click();

            cy.get(addProduct).click();
        })

        it('The admin inserts only the brand name', () => {
            
            cy.getByName('brand').click().type(newWomanProductBrand);

            cy.get(addButton).click();

            cy.contains('Inserisci la foto del prodotto')
            .should('exist')
            .should('have.css','color','rgb(255, 0, 0)')
            .and('be.visible');
        });

        it('The admin inserts only the description', () => {
            
            cy.get("input[name='description']").click().type(newWomanProductDescription);

            cy.get(addButton).click();

            cy.contains('Inserisci la foto del prodotto')
            .should('exist')
            .should('have.css','color','rgb(255, 0, 0)')
            .and('be.visible');
        });

        it('The admin inserts only the price', () => {
            
            cy.getByName('price').click().type(newWomanProductPrice);

            cy.get(addButton).click();

            cy.contains('Inserisci la foto del prodotto')
            .should('exist')
            .should('have.css','color','rgb(255, 0, 0)')
            .and('be.visible');
        });

        it('The admin inserts only the photo of the product', () => {
            
            cy.getByName('image').selectFile(path,{ force: true, subjectType:'drag-n-drop' })

            cy.get(addButton).click();

            cy.contains('Inserisci il brand del prodotto')
            .should('exist')
            .should('have.css','color','rgb(255, 0, 0)')
            .and('be.visible');
        });

        it('The admin inserts the photo and the brand of the product', () => {

            cy.getByName('brand').click().type(newWomanProductBrand);
            
            cy.getByName('image').selectFile(path,{ force: true, subjectType:'drag-n-drop' });

            cy.get(addButton).click();

            cy.contains('Inserisci la descrizione del prodotto')
            .should('exist')
            .should('have.css','color','rgb(255, 0, 0)')
            .and('be.visible');
        });

        it('The admin inserts the photo and the description of the product', () => {

            cy.get("input[name='description']").click().type(newWomanProductDescription);
            
            cy.getByName('image').selectFile(path,{ force: true, subjectType:'drag-n-drop' });

            cy.get(addButton).click();

            cy.contains('Inserisci il brand del prodotto')
            .should('exist')
            .should('have.css','color','rgb(255, 0, 0)')
            .and('be.visible');
        });

        it('The admin inserts the photo, the brand and the description of the product', () => {

            cy.getByName('brand').click().type(newWomanProductBrand);

            cy.get("input[name='description']").click().type(newWomanProductDescription);
            
            cy.getByName('image').selectFile(path,{ force: true, subjectType:'drag-n-drop' });

            cy.get(addButton).click();

            cy.contains('Inserisci il prezzo del prodotto')
            .should('exist')
            .should('have.css','color','rgb(255, 0, 0)')
            .and('be.visible');
        });

        it('Insert a correct women product with all of the required elemens', () => {

            cy.getByName('brand').click().type(newWomanProductBrand);

            cy.get("input[name='description']").click().type(newWomanProductDescription);

            cy.getByName('price').click().type(newWomanProductPrice);
            
            cy.getByName('image').selectFile(path,{ force: true, subjectType:'drag-n-drop' });

            cy.get(addButton).click();

            cy.contains('Prodotto aggiunto correttamente!')
            .should('exist')
            .should('have.css','color','rgb(255, 0, 0)')
            .and('be.visible');
        });

        it('Check if the product is the last in the Show Products page', () => {

            cy.contains('LISTA PRODOTTI').click();

            cy.request({
                method: 'POST',
                url: 'http://localhost:4000/countproducts'
              }).then((response) => {
            
                const lastItemIndex = response.body.count * 2;

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex})`).scrollIntoView()
    
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex})`).should('exist').and('be.visible');

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductImage`).should('exist').and('be.visible');

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductBrand`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductBrand`).should('have.text',newWomanProductBrand);

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductDesc`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductDesc`).should('have.text',newWomanProductDescription);

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductPrice`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductPrice`).should('have.text',newWomanProductPrice + ' €');
                
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductCategory`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductCategory`).should('have.text','donna');
                
            });
        });

        it('Check if the product is the last in the NOVITA section',() => {

            cy.contains('NOVITA').click();

            cy.get(`.collections > :nth-child(1)`).should('exist').and('be.visible');
            
            cy.get(`.collections > :nth-child(1) > a > img`).should('exist').and('be.visible');
    
            cy.get(`.collections > :nth-child(1) > .brand`).should('exist').and('be.visible');
            cy.get(`.collections > :nth-child(1) > .brand`).should('have.text',newWomanProductBrand);

            cy.get(`.collections > :nth-child(1) > .description`).should('exist').and('be.visible');
            cy.get(`.collections > :nth-child(1) > .description`).contains('donna');
            cy.get(`.collections > :nth-child(1) > .description`).should('have.text',newWomanProductDescription + ' donna');
    
            cy.get(`.collections > :nth-child(1) > .itemPrice`).should('exist').and('be.visible');
            cy.get(`.collections > :nth-child(1) > .itemPrice`).should('have.text',newWomanProductPrice + ' €');
        });

        it('Check if the product is the last in the DONNA section',() => {

            cy.contains('DONNA').click();

            cy.request({
                method: 'POST',
                url: 'http://localhost:4000/countproducts',
                body: {"category":"donna"}
              }).then((response) => {

                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count})`).scrollIntoView();
            
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count})`).should('exist').and('be.visible');
            
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > a > img`).should('exist').and('be.visible');
        
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .brand`).should('exist').and('be.visible');
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .brand`).should('have.text',newWomanProductBrand);

                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .description`).should('exist').and('be.visible');
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .description`).should('have.text',newWomanProductDescription + ' ');
        
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .itemPrice`).should('exist').and('be.visible');
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .itemPrice`).should('have.text',newWomanProductPrice + ' €');
                
            });
        });

        it('Insert a man product',() => {

            cy.getByName('brand').click().type(newManProductBrand);

            cy.get("input[name='description']").click().type(newManProductDescription);

            cy.getByName('price').click().type(newManProductPrice);

            cy.getByName('category').select('uomo');

            cy.getByName('tags').click().type(newManProductTags);

            cy.getByName('image').selectFile(path,{ force: true, subjectType:'drag-n-drop'});

            cy.get(addButton).click();

            cy.contains('Prodotto aggiunto correttamente!')
            .should('exist')
            .should('have.css','color','rgb(255, 0, 0)')
            .and('be.visible');
        });

        it('Check if the product is the last in the Show Products page', () => {

            cy.contains('LISTA PRODOTTI').click();

            cy.request({
                method: 'POST',
                url: 'http://localhost:4000/countproducts'
              }).then((response) => {
            
                const lastItemIndex = response.body.count * 2;

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex})`).scrollIntoView()
    
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex})`).should('exist').and('be.visible');

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductImage`).should('exist').and('be.visible');

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductBrand`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductBrand`).should('have.text',newManProductBrand);

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductDesc`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductDesc`).should('have.text',newManProductDescription);

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductPrice`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductPrice`).should('have.text',newManProductPrice + ' €');
                
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductCategory`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductCategory`).should('have.text','uomo');

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductTags`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductTags`).should('have.text',newManProductTags);
                
            });
        });

        it('Verify that the product is the last in the NOVITA section',() => {

            cy.contains('NOVITA').click();

            cy.get(`.collections > :nth-child(1)`).should('exist').and('be.visible');
            
            cy.get(`.collections > :nth-child(1) > a > img`).should('exist').and('be.visible');
    
            cy.get(`.collections > :nth-child(1) > .brand`).should('exist').and('be.visible');
            cy.get(`.collections > :nth-child(1) > .brand`).should('have.text',newManProductBrand);

            cy.get(`.collections > :nth-child(1) > .description`).should('exist').and('be.visible');
            cy.get(`.collections > :nth-child(1) > .description`).contains('uomo');
            cy.get(`.collections > :nth-child(1) > .description`).should('have.text',newManProductDescription + ' uomo');
    
            cy.get(`.collections > :nth-child(1) > .itemPrice`).should('exist').and('be.visible');
            cy.get(`.collections > :nth-child(1) > .itemPrice`).should('have.text',newManProductPrice + ' €');
        });

        it('Verify that the man product is displayed in the UOMO page',() => {

            cy.contains('UOMO').click();

            cy.request({
                method: 'POST',
                url: 'http://localhost:4000/countproducts',
                body: {"category":"uomo"}
              }).then((response) => {

                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count})`).scrollIntoView();
            
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count})`).should('exist').and('be.visible');
            
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > a > img`).should('exist').and('be.visible');
        
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .brand`).should('exist').and('be.visible');
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .brand`).should('have.text',newManProductBrand);

                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .description`).should('exist').and('be.visible');
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .description`).should('have.text',newManProductDescription + ' ');
        
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .itemPrice`).should('exist').and('be.visible');
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .itemPrice`).should('have.text',newManProductPrice + ' €');
                
            });
        });

        it('Insert a kid product',() => {

            cy.getByName('brand').click().type(newKidProductBrand);

            cy.get("input[name='description']").click().type(newKidProductDescription);

            cy.getByName('price').click().type(newKidProductPrice);

            cy.getByName('category').select('bambino');

            cy.getByName('tags').click().type(newKidProductTags);

            
            cy.getByName('image').selectFile(path,{ force: true, subjectType:'drag-n-drop' });

            cy.get(addButton).click();

            cy.contains('Prodotto aggiunto correttamente!')
            .should('exist')
            .should('have.css','color','rgb(255, 0, 0)')
            .and('be.visible');
        });

        it('Check if the product is the last in the Show Products page', () => {

            cy.contains('LISTA PRODOTTI').click();

            cy.request({
                method: 'POST',
                url: 'http://localhost:4000/countproducts'
              }).then((response) => {
            
                const lastItemIndex = response.body.count * 2;

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex})`).scrollIntoView()
    
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex})`).should('exist').and('be.visible');

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductImage`).should('exist').and('be.visible');

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductBrand`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductBrand`).should('have.text',newKidProductBrand);

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductDesc`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductDesc`).should('have.text',newKidProductDescription);

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductPrice`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductPrice`).should('have.text',newKidProductPrice + ' €');
                
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductCategory`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductCategory`).should('have.text','bambino');

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductTags`).should('exist').and('be.visible');
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) >  .productsListProductTags`).should('have.text',newKidProductTags);
                
            });
        });

        it('Verify that the product is the last in the NOVITA section',() => {

            cy.contains('NOVITA').click();

            cy.get(`.collections > :nth-child(1)`).should('exist').and('be.visible');
            
            cy.get(`.collections > :nth-child(1) > a > img`).should('exist').and('be.visible');
    
            cy.get(`.collections > :nth-child(1) > .brand`).should('exist').and('be.visible');
            cy.get(`.collections > :nth-child(1) > .brand`).should('have.text',newKidProductBrand);

            cy.get(`.collections > :nth-child(1) > .description`).should('exist').and('be.visible');
            cy.get(`.collections > :nth-child(1) > .description`).contains('bambino');
            cy.get(`.collections > :nth-child(1) > .description`).should('have.text',newKidProductDescription + ' bambino');
    
            cy.get(`.collections > :nth-child(1) > .itemPrice`).should('exist').and('be.visible');
            cy.get(`.collections > :nth-child(1) > .itemPrice`).should('have.text',newKidProductPrice + ' €');
        });

        it('Verify that the kid product is displayed in the BAMBINO page',() => {

            cy.contains('BAMBINO').click();

            cy.request({
                method: 'POST',
                url: 'http://localhost:4000/countproducts',
                body: {"category":"bambino"}
              }).then((response) => {

                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count})`).scrollIntoView();
            
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count})`).should('exist').and('be.visible');
            
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > a > img`).should('exist').and('be.visible');
        
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .brand`).should('exist').and('be.visible');
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .brand`).should('have.text',newKidProductBrand);

                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .description`).should('exist').and('be.visible');
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .description`).should('have.text',newKidProductDescription + ' ');
        
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .itemPrice`).should('exist').and('be.visible');
                cy.get(`.shopCategoryProducts > :nth-child(${response.body.count}) > .itemPrice`).should('have.text',newKidProductPrice + ' €');
                
            });
        });

        it('Remove the products recently added', () => {

            cy.contains('LISTA PRODOTTI').click();
            
            cy.request({
                method: 'POST',
                url: 'http://localhost:4000/countproducts'
              }).then((response) => {

                const lastItemIndex = response.body.count * 2;

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex})`).scrollIntoView();
            
                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex}) > .productsListRemoveIcon`).click();

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex - 2}) > .productsListRemoveIcon`).click();

                cy.get(`.productsList-allProducts > :nth-child(${lastItemIndex - 4}) > .productsListRemoveIcon`).click();
                
                cy.request({
                    method: 'POST',
                    url: 'http://localhost:4000/countproducts'
                  }).then((resp) => {
    
                    expect(resp.body.count).to.equal(response.body.count - 3);
                    
                });
            });
        })
    });
})