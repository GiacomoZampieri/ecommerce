/* eslint-disable cypress/unsafe-to-chain-command */
const letter = "s";
const wrongBrand = "Uniud";
const correctBrand = "Guess";
const upperCaseBrans = "LACOSTE";

const SearchBar = ".shopCategoryInput";
const notFoundError = ".shopCategoryNotFound";

describe('Testing the SearchBar', () => { 

    beforeEach(() => {
        cy.visit("/");
    });
    
    it('The search bar is visible in the "Uomo" section', () => {
        
        cy.contains("UOMO").click();

        cy.get(SearchBar).should("exist").and("be.visible");

        cy.get(SearchBar).should("have.attr","placeholder","Cerca il brand che preferisci...");
    });

    it('The search bar is visible in the "Donna" section', () => {
        
        cy.contains("DONNA").click();

        cy.get(SearchBar).should("exist").and("be.visible");

        cy.get(SearchBar).should("have.attr","placeholder","Cerca il brand che preferisci...");
    });

    it('The search bar is visible in the "Bambino" section', () => {
        
        cy.contains("BAMBINO").click();

        cy.get(SearchBar).should("exist").and("be.visible");

        cy.get(SearchBar).should("have.attr","placeholder","Cerca il brand che preferisci...");
    });

    it('The search bar is not visible in the "Novità" section', () => {
        
        cy.contains("NOVITA").click();

        cy.get(SearchBar).should("not.exist");

    });

    it("If the user insert only one letter, the elements will be filtered", () => {

        cy.contains("UOMO").click();

        cy.get(SearchBar).should("exist").and("be.visible");

        cy.get(SearchBar).click().type(letter);

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500);

        cy.get(".brand").each(($product) => {cy.get($product).invoke('text').then((text) => {

            const lowerCaseText = text.toLowerCase();
            const lowerCaseLetter = letter.toLowerCase();

            expect(lowerCaseText).to.contain(lowerCaseLetter);
          });
        });
    });

    it("The user inserts a brand not in the database", () => {

        cy.contains("UOMO").click();

        cy.get(SearchBar).should("exist").and("be.visible");

        cy.get(SearchBar).click().type(wrongBrand);

        cy.get(notFoundError).should("exist").and("be.visible");

        cy.get(notFoundError).should("contain","Nessun elemento trovato");
        
    });

    it("The user inserts a brand not in the database. After that the user insert a correct brand", () => {

        cy.contains("DONNA").click();

        cy.get(SearchBar).should("exist").and("be.visible");

        cy.get(SearchBar).click().type(wrongBrand);

        cy.get(notFoundError).should("exist").and("be.visible");

        cy.get(notFoundError).should("contain","Nessun elemento trovato");

        cy.get(SearchBar).click().clear();

        cy.get(notFoundError).should("not.exist");

        cy.get(SearchBar).click().type(correctBrand);

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500);
        
        cy.get(notFoundError).should("not.exist");

        cy.get(".brand").each(($product) => {cy.get($product).invoke('text').then((text) => {

            const lowerCaseText = text.toLowerCase();
            const lowerCaseLetter = correctBrand.toLowerCase();

            expect(lowerCaseText).to.contain(lowerCaseLetter);
          });
        });
    });

    it("The user inserts a correct uppercase brand", () => {

        cy.contains("BAMBINO").click();

        cy.get(SearchBar).should("exist").and("be.visible");

        cy.get(SearchBar).click().type(upperCaseBrans);

        cy.get(notFoundError).should("not.exist");

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500);

        cy.get(".brand").each(($product) => {cy.get($product).invoke('text').then((text) => {

            const lowerCaseText = text.toLowerCase();
            const lowerCaseLetter = upperCaseBrans.toLowerCase();

            expect(lowerCaseText).to.contain(lowerCaseLetter);
          });
        });
    });
})