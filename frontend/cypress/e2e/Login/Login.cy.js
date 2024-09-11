/* eslint-disable cypress/unsafe-to-chain-command */
//Dati già presenti all'interno del database
const correctPasswordUser = 'qwerty';
const correctEmailUser = 'giacomo01zampieri@gmail.com';
const wrongPasswordUser = 'qwer';
const wrongEmailUser = 'giacomozampieri@gmail.com';

const inputUsername = "input[name='username']";
const inputEmail = "input[name='email']";
const inputPassword = "input[name='password']";
const errorMessage = ".error";
const loginButton = ".loginSignupFields > button";

const loginLogoutButton = '.LoginLogout';
const loginTitle = '.loginSignupContainer > h1';
const loginSignupText = '.loginSignupLogin';

describe('Testing the login page', () => { 
    
    beforeEach(() => {
    
        cy.visit("/");
        
    });

    it('Open the login page from the Login button', () => {

        cy.get(loginLogoutButton).click();

        cy.url().should('contains', '/login');
    });

    it('The login page is displayed correctly', () => {

        cy.get(loginLogoutButton).click();

        cy.get(loginTitle).should('exist').and('be.visible');
        cy.get(loginTitle).contains('Login');

        cy.get(inputUsername).should('not.exist');
        cy.get(inputEmail).should('exist').and('be.visible');
        cy.get(inputEmail).should('have.attr', 'placeholder', 'Email...');
        cy.get(inputPassword).should('exist').and('be.visible');
        cy.get(inputPassword).should('have.attr', 'placeholder', 'Password...');

        cy.get(loginButton).should('exist').and('be.visible');
        cy.get(loginButton).contains('Login');

        cy.get(loginSignupText).should('exist').and('be.visible');
        cy.get(loginSignupText).contains('Non hai ancora creato un account?');
    });

    it('Click on Login button without insert any data',() => {
        
        cy.get(loginLogoutButton).click();

        cy.get(loginButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Inserire email e password!');
    });

    it('Insert only the email in the login form',() => {

        cy.get(loginLogoutButton).click();

        cy.get(inputEmail).click().type(correctEmailUser);
        
        cy.get(loginButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Inserire la password!');
    });

    it('Insert only the passowrd in the login form',() => {

        cy.get(loginLogoutButton).click();

        cy.get(inputPassword).click().type(correctPasswordUser);
        
        cy.get(loginButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains("Inserire l'email!");
    });

    it('Insert the wrong email and the correct password',() => {

        cy.get(loginLogoutButton).click();

        cy.get(inputEmail).click().type(wrongEmailUser);
        cy.get(inputPassword).click().type(correctPasswordUser);

        cy.get(loginButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains("Utente non trovato: email errata!");
    });

    it('Insert the wrong password and the correct email',() => {

        cy.get(loginLogoutButton).click();

        cy.get(inputEmail).click().type(correctEmailUser);
        cy.get(inputPassword).click().type(wrongPasswordUser);

        cy.get(loginButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains("Password errata!");
    });

    it('Insert the correct email and the correct password',() => {

        cy.get(loginLogoutButton).click();

        cy.get(inputEmail).click().type(correctEmailUser);
        cy.get(inputPassword).click().type(correctPasswordUser);

        cy.get(loginButton).click();

        cy.get(errorMessage).should('not.exist');
        cy.url().should('eq','http://localhost:3001/');

        cy.get(loginLogoutButton).should('have.text','Logout');
    });
})