/* eslint-disable cypress/no-unnecessary-waiting */
//Correttezza pagina
//Aggiungere un prodotto e verificare che venga visualizzato in novita e categoria giusta. Farlo per tutte e tre le categorie.
//Vedere se si riesce che venga fuori anche in show products

/* eslint-disable cypress/unsafe-to-chain-command */
const userLogged = Cypress.env('userLogged');
const passwordLogged = Cypress.env('passwordLogged');
const emailLogged = Cypress.env('emailLogged');

const usernameUser = Cypress.env('usernameUser');
const passwordUser = Cypress.env('passwordUser');

const inputUsername = "input[name='username']";
const loginUpButton = ".loginSignupFields > button"

const inputEmail = "input[name='email']";
const inputPassword = "input[name='password']";
const errorMessage = ".error";

const firstNewsItemImage = '.collections > :nth-child(1) > a > img';
const firstNewsItemBrand = '.collections > :nth-child(1) > .brand';
const firstNewsItemPrice = '.collections > :nth-child(1) > .itemPrice > p';
const firstItemImageMan = '.shopCategoryProducts > :nth-child(1) > a > img';
const firstItemBrandMan = '.shopCategoryProducts > :nth-child(1) > .brand';
const firstItemPriceMan = '.shopCategoryProducts > :nth-child(1) > .itemPrice > p';

const mSizeSelector = '.productDisplayRightSizes :nth-child(2)';
const sSizeSelector = '.productDisplayRightSizes :nth-child(1)';

const loginLogoutButton = '.LoginLogout';
const cartIcon = '.navLoginCartIcon';
const cartCount = '.navbarCartCount';

describe('Check the payment functionality', () => { 

    beforeEach(() => {
        cy.visit("/");
    });

    it("Check the correctness of the payment page",() => {

        cy.contains("Login").click();

        cy.get(inputEmail).click().type(emailLogged);
        cy.get(inputPassword).click().type(passwordLogged);

        cy.get(loginUpButton).click();

        cy.get(errorMessage).should('not.exist');

        cy.url().should('eq','http://localhost:3001/');

        cy.get(loginLogoutButton).should('have.text','Logout');

        cy.contains("NOVITA").click();

        cy.get(firstNewsItemImage).should('exist').and('be.visible');
        cy.get(firstNewsItemImage).click({force:true});

        cy.get(mSizeSelector).click();

        cy.contains("AGGIUNGI AL CARRELLO").click();

        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');

        cy.contains("UOMO").click();

        cy.get(firstItemImageMan).should('exist').and('be.visible');
        cy.get(firstItemImageMan).click({force:true});

        cy.get(sSizeSelector).click();

        cy.contains("AGGIUNGI AL CARRELLO").click();

        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');

        cy.get(cartCount).should('have.text',2);

        cy.get(cartIcon).click();

        cy.contains("PROCEDI CON IL PAGAMENTO").should('exist').and('be.visible').and('not.be.disabled');
        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.url().should('include','/payment');

        cy.getByName("cardNumber").should('exist').and('be.visible');
        cy.getByName("cardNumber").should('have.attr','placeholder',"1234 5678 9101 1121");

        cy.getByName("cardDate").should('exist').and('be.visible');
        cy.getByName("cardDate").should('have.attr','placeholder',"MM/AA");

        cy.getByName("cvv").should('exist').and('be.visible');
        cy.getByName("cvv").should('have.attr','placeholder',"123");

        cy.contains("PROCEDI CON IL PAGAMENTO").should('exist').and('be.visible').and('not.be.disabled');
        cy.contains("PROCEDI CON IL PAGAMENTO").click();

    });

    it('Click on proceed button without insert any data',() => {
        
        cy.contains("Login").click();

        cy.get(inputEmail).click().type(emailLogged);
        cy.get(inputPassword).click().type(passwordLogged);

        cy.get(loginUpButton).click();
        
        cy.wait(500);

        cy.get(cartIcon).click();

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Inserire i dati della carta!');
    });

    it('Click on proceed button after insert only the number of the card',() => {
        
        cy.contains("Login").click();

        cy.get(inputEmail).click().type(emailLogged);
        cy.get(inputPassword).click().type(passwordLogged);

        cy.get(loginUpButton).click();
        
        cy.wait(500);

        cy.get(cartIcon).click();

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.getByName("cardNumber").click().type("4242 4242 4242 4242");

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Inserire la data di scadenza della carta!');
    });

    it('Click on proceed button after insert only the number of the card and the expiration date',() => {
        
        cy.contains("Login").click();

        cy.get(inputEmail).click().type(emailLogged);
        cy.get(inputPassword).click().type(passwordLogged);

        cy.get(loginUpButton).click();
        
        cy.wait(500);

        cy.get(cartIcon).click();

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.getByName("cardNumber").click().type("4242 4242 4242 4242");

        cy.getByName("cardDate").click().type("02/25");

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Inserire il codice di sicurezza!');
    });

    it('Click on proceed button after insert only the expiration date and the cvv',() => {
        
        cy.contains("Login").click();

        cy.get(inputEmail).click().type(emailLogged);
        cy.get(inputPassword).click().type(passwordLogged);

        cy.get(loginUpButton).click();
        
        cy.wait(500);

        cy.get(cartIcon).click();

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.getByName("cardDate").click().type("02/25");

        cy.getByName("cvv").click().type("321");

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Inserire il numero della carta!');
    });

    it('Click on proceed button after insert all the data',() => {
        
        cy.contains("Login").click();

        cy.get(inputEmail).click().type(emailLogged);
        cy.get(inputPassword).click().type(passwordLogged);

        cy.get(loginUpButton).click();
        
        cy.wait(500);

        cy.get(cartIcon).click();

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.getByName("cardNumber").click().type("4242 4242 4242 4242");

        cy.getByName("cardDate").click().type("02/25");

        cy.getByName("cvv").click().type("321");

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.get(errorMessage).should('not.exist');

        cy.url().should("include","greetings");

        cy.get(cartCount).should('have.text',0);
    });

    it("Check the correctness of the greetings page",() => {

        cy.contains("Login").click();

        cy.get(inputEmail).click().type(emailLogged);
        cy.get(inputPassword).click().type(passwordLogged);

        cy.get(loginUpButton).click();
        
        cy.wait(500);

        cy.contains("NOVITA").click();

        cy.get(firstNewsItemImage).should('exist').and('be.visible');
        cy.get(firstNewsItemImage).click({force:true});

        cy.get(mSizeSelector).click();

        cy.contains("AGGIUNGI AL CARRELLO").click();

        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');

        cy.contains("UOMO").click();

        cy.get(firstItemImageMan).should('exist').and('be.visible');
        cy.get(firstItemImageMan).click({force:true});

        cy.get(sSizeSelector).click();

        cy.contains("AGGIUNGI AL CARRELLO").click();

        cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');

        cy.get(cartCount).should('have.text',2);

        cy.get(cartIcon).click();

        cy.contains("PROCEDI CON IL PAGAMENTO").should('exist').and('be.visible').and('not.be.disabled');
        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.url().should('include','/payment');

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.getByName("cardNumber").click().type("4242 4242 4242 4242");

        cy.getByName("cardDate").click().type("02/25");

        cy.getByName("cvv").click().type("321");

        cy.contains("PROCEDI CON IL PAGAMENTO").click();

        cy.get(errorMessage).should('not.exist');

        cy.url().should("include","greetings");

        cy.contains("Grazie per l'acquisto " + userLogged).should('exist').and('be.visible');

        cy.contains("Ti è arrivata una mail di conferma dell'acquisto").should('exist').and('be.visible');

        cy.contains("continua con gli acquisti").should('exist').and('be.visible');
        cy.contains("continua con gli acquisti").click();

        cy.url().should("eq","http://localhost:3001/");
    });


    //Signup con mail temporana
    it('Signup with a temporary mail',() => {

        const getMail = () => { 

            Cypress.on('uncaught:exception', () => { return false })
            
            return cy.origin('https://temp-mail.io/', () => {

                const currentEmailSite = "input[id='email']"

                cy.visit('https://temp-mail.io/');

                cy.wait(3000);

                return cy.get(currentEmailSite).then(($input) => {

                    //Save the value of the temp mail
                    const email1 = $input.val();
        
                    cy.log(email1);
        
                    //Visit of a random site
                    cy.visit('https://github.com/GiacomoZampieri/');
                    
                    cy.wait(1000);
        
                    //Go back to the temp mail site
                    cy.visit('https://temp-mail.io/');
                    cy.wait(3000);
        
                    return cy.get(currentEmailSite).then(($input2) => {

                        //Save the value of the temp mail
                        const email2 = $input2.val();

                        cy.log(email2);

                        //Check that the seocond email is equal to the first one
                        expect(email2).to.equal(email1);

                        //Store in the env variable mail the value of the email
                        Cypress.env('mail',email2);

                        //Return the value o the email
                        return cy.wrap(email2);
                    })
                })
            })
        }

        getMail().then( (result) => {

            let firstItemBrand = "";
            let firstItemPrice = "";

            let secondItemBrand = "";
            let secondItemPrice = "";

            cy.setVariabileGlobale(result);//The e-mail is saved in a environment variable for the next tests

            cy.visit('http://localhost:3001/');

            cy.contains("Login").click();

            cy.contains("Clicca qui").click();

            cy.get(inputUsername).click().type(usernameUser);
            cy.get(inputEmail).click().type(result);
            cy.get(inputPassword).click().type(passwordUser);

            cy.get(loginUpButton).click();

            cy.get(errorMessage).should('not.exist');

            cy.url().should('eq','http://localhost:3001/');

            cy.get(loginLogoutButton).should('have.text','Logout');

            cy.contains("NOVITA").click();

            cy.get(firstNewsItemBrand).should(($input) => {
                firstItemBrand = $input.text();
            });

            cy.get(firstNewsItemPrice).should(($input) => {
                firstItemPrice = $input.text();
            });

            cy.get(firstNewsItemImage).should('exist').and('be.visible');
            cy.get(firstNewsItemImage).click({force:true});

            cy.then(() => {

                cy.get(mSizeSelector).click();

                //Insert two times the same article
    
                cy.contains("AGGIUNGI AL CARRELLO").click();
    
                cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');
    
                cy.contains("AGGIUNGI AL CARRELLO").click();
    
                cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');
    
                cy.contains("UOMO").click();

                cy.get(firstItemBrandMan).should(($input) => {
                    secondItemBrand = $input.text();
                });
    
                cy.get(firstItemPriceMan).should(($input) => {
                    secondItemPrice = $input.text();
                });
    
                cy.get(firstItemImageMan).should('exist').and('be.visible');
                cy.get(firstItemImageMan).click({force:true});

                cy.then(() => {

                    cy.get(sSizeSelector).click();
    
                    cy.contains("AGGIUNGI AL CARRELLO").click();
        
                    cy.contains('Il prodotto è stato aggiunto correttamente al carrello!').should('exist').and('be.visible');
        
                    cy.get(cartCount).should('have.text',3);
        
                    cy.get(cartIcon).click();
        
                    cy.contains("PROCEDI CON IL PAGAMENTO").should('exist').and('be.visible').and('not.be.disabled');
                    cy.contains("PROCEDI CON IL PAGAMENTO").click();
    
                    cy.getByName("user_name").should('have.attr','value',usernameUser);
        
                    cy.getByName("user_email").should('have.attr','value',result);
        
                    cy.getByName("cardNumber").click().type("4242 4242 4242 4242");
        
                    cy.getByName("cardDate").click().type("02/25");
        
                    cy.getByName("cvv").click().type("321");
        
                    cy.contains("PROCEDI CON IL PAGAMENTO").click();
        
                    cy.get(errorMessage).should('not.exist');
        
                    cy.url().should("include","greetings");
        
                    cy.contains("Grazie per l'acquisto " + usernameUser).should('exist').and('be.visible');
        
                    cy.origin('https://temp-mail.io/',  { args: { firstItemBrand, firstItemPrice, secondItemBrand,  secondItemPrice} }, ({firstItemBrand, firstItemPrice, secondItemBrand,  secondItemPrice}) => {
        
                        Cypress.on('uncaught:exception', () => { return false });

                        console.log("Dato" + firstItemBrand, firstItemPrice, secondItemBrand,  secondItemPrice);
        
                        const usernameUser = Cypress.env('usernameUser');

                        let firstItemPriceRemove = firstItemPrice.slice(0, -2);

                        let secondItemPriceRemove = secondItemPrice.slice(0, -2);
                        
                        cy.wait(1000);
        
                        cy.visit('https://temp-mail.io/');
        
                        cy.wait(3000);

                        cy.contains("refresh").click();

                        cy.wait(3000);
        
                        //Click on the mail
                        cy.get('.message__body > :nth-child(1)').click();
        
                        cy.wait(2000);

                        let string1 = `Brand: ${firstItemBrand}, Quantità: 2, Prezzo unitario: ${firstItemPriceRemove}`;
                        let string2 = `Brand: ${secondItemBrand}, Quantità: 1, Prezzo unitario: ${secondItemPriceRemove}`;

                        cy.get("svg[class='cookie-warning__close-icon icon sprite-icons']").click();

                        cy.contains("Grazie " + usernameUser + " per l'acquisto");

                        cy.get('span > :nth-child(5)').should('have.text',string2 + "\n" + string1);

                        cy.contains("Se vuoi continuare con gli acquisti clicca qui: e-commerce").scrollIntoView();
                        cy.contains("Se vuoi continuare con gli acquisti clicca qui: e-commerce").should('exist').and('be.visible');
                        cy.contains("e-commerce").invoke('attr','target','_self').click();

                        cy.wait(2000);

                        cy.location('href').should('eq', 'http://localhost:3001/');
                    });
                });
            });
        });
    });
});   

    



