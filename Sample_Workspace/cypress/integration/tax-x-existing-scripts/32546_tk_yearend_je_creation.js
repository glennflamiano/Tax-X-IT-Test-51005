Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('32546 (Hannah) Create Journal Entry from Year End TK Value Row', () => {
    it('32546.1 Create TK Value Journal Entry', () => {    
        cy.login();

        cy.visit('taxx/clientgroup/1/entity/1/journal/yearend/3254600/');
        cy.wait(5000);
        cy.screenshot('TK_YearEndOperation_JournalEntry');

        // Check Page Information
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `32546 Year End Operation Testing TK`);
        cy.get('[value="2021年03月31日"]').should('exist');

        // Check Department in Transactions
        cy.get('[data-cy=transaction-input2]').get('[value="32546 Year End Department"]').should('exist');
        cy.get('[data-cy=transaction-input5]').get('[value="32546 Year End Department"]').should('exist');

        //Save Successfully
        cy.contains('Save').click();
        cy.contains('Yes').click();
        cy.contains('OK').click();
    });
});
