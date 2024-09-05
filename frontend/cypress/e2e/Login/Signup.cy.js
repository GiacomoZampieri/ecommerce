/* eslint-disable cypress/unsafe-to-chain-command */
const usernameUser = Cypress.env('usernameUser');
const passwordUser = Cypress.env('passwordUser');
const emailUser = Cypress.env('emailUser');

const inputUsername = "input[name='username']";
const inputEmail = "input[name='email']";
const inputPassword = "input[name='password']";
const errorMessage = ".error"
const signUpButton = ".loginSignupFields > button"

const loginLogoutButton = '.LoginLogout';
const signupLink = '.clickHere';
const signupTitle = '.loginSignupContainer > h1';
const loginSignupText = '.loginSignupLogin';

describe('Testing the signup page', () => {

    beforeEach(() => {
    
        cy.visit("/");
        
    });

    it('Open the signup page from the Login button', () => {
    
        cy.get(loginLogoutButton).click();

        cy.get(signupLink).click();

        cy.url().should('eq', '/signup');
    });

    it('The signup page is displayed correctly', () => {
    
        cy.get(loginLogoutButton).click();

        cy.get(signupLink).click();

        cy.get(signupTitle).should('exist').and('be.visible');
        cy.get(signupTitle).contains('Sign Up');

        cy.get(inputUsername).should('exist').and('be.visible');
        cy.get(inputUsername).should('have.attr', 'placeholder', 'Username...');
        cy.get(inputEmail).should('exist').and('be.visible');
        cy.get(inputEmail).should('have.attr', 'placeholder', 'Email...');
        cy.get(inputPassword).should('exist').and('be.visible');
        cy.get(inputPassword).should('have.attr', 'placeholder', 'Password...');

        cy.get(signUpButton).should('exist').and('be.visible');
        cy.get(signUpButton).contains('Sign Up');

        cy.get(loginSignupText).should('exist').and('be.visible');
        cy.get(loginSignupText).contains('Hai gia un account?');
    });

    //Signup premendo il pulsante 'Continua'
    it('Click Sign Up without enter username, email and password',() => {

        cy.get(loginLogoutButton).click();

        cy.get(signupLink).click();

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Il campo username non può essere vuoto');
    });

    it('Enter only the username and click on Sign Up button',() => {

        cy.get(loginLogoutButton).click();

        cy.get(signupLink).click();

        cy.get(inputUsername).click().type(usernameUser);

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Il campo password non può essere vuoto');
    });

    it('Enter only the email and click on Sign Up button',() => {

        cy.get(loginLogoutButton).click();

        cy.get(signupLink).click();

        cy.get(inputEmail).click().type(emailUser);

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Il campo username non può essere vuoto');
    });

    it('Enter only the password and click on Sign Up button',() => {

        cy.get(loginLogoutButton).click();

        cy.get(signupLink).click();

        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Il campo username non può essere vuoto');
    });

    it('Enter the username and the email and click on Sign Up button',() => {

        cy.get(loginLogoutButton).click();

        cy.get(signupLink).click();

        cy.get(inputUsername).click().type(usernameUser);
        cy.get(inputEmail).click().type(emailUser);

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Il campo password non può essere vuoto');
    });

    it('Enter the username and the password and click on Sign Up button',() => {

        cy.get(loginLogoutButton).click();

        cy.get(signupLink).click();

        cy.get(inputUsername).click().type(usernameUser);
        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Il campo email non può essere vuoto');
    });

    it('Enter the email and the password and click on Sign Up button',() => {

        cy.get(loginLogoutButton).click();

        cy.get(signupLink).click();

        cy.get(inputEmail).click().type(emailUser);
        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('Il campo username non può essere vuoto');
    });

    it('Enter username,email,password and click on Sign Up button',() => {

        cy.get(loginLogoutButton).click();

        cy.get(signupLink).click();

        cy.get(inputUsername).click().type(usernameUser);
        cy.get(inputEmail).click().type(emailUser);
        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('not.exist');

        cy.url().should('eq','http://localhost:3001/');

        cy.get(loginLogoutButton).should('have.text','Logout');
    
    });

    it('Enter an email already in use and click on Sign Up button',() => {

        cy.get(loginLogoutButton).click();

        cy.get(signupLink).click();

        cy.get(inputUsername).click().type(usernameUser);
        cy.get(inputEmail).click().type(emailUser);
        cy.get(inputPassword).click().type(passwordUser);

        cy.get(signUpButton).click();

        cy.get(errorMessage).should('exist').and('be.visible');
        cy.get(errorMessage).contains('E-mail gia in uso');
    });

    it('Should delete an item from MongoDB', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:4000/removeUser', // URL dell'endpoint del tuo backend
            body: { email: emailUser } // Passa l'email dell'utente da eliminare
          }).then((response) => {
            expect(response.status).to.eq(200); // Assicurati che l'eliminazione sia stata completata con successo
        });
    });
})