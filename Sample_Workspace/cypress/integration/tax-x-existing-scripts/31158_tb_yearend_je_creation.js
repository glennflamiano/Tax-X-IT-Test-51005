Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('31158 (Hannah) Create Journal Entry from Year End TB Value Row', () => {
    it('31158.1 Create TB Value Journal Entry', () => {    
        cy.login();
        cy.visit('taxx/clientgroup/1/entity/1/journal/yearend/3115801/');
        cy.wait(5000);
        cy.screenshot('TB_YearEndOperation_JournalEntry');

        // Check Page Information
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `31158 Year End Operation Testing TB`);
        cy.get('[value="2021年03月31日"]').should('exist');

        // Check TB Report Link Existance
        cy.contains('TB Report').should('exist');

        // Check Department in Transactions
        cy.get('[data-cy=transaction-input2]').get('[value="32546 Year End Department"]').should('exist');
        cy.get('[data-cy=transaction-input5]').get('[value="32546 Year End Department"]').should('exist');

        // Check TB Report Values in Transaction Amounts
        cy.get('[data-cy=transaction-input3]').get('[value="600"]').should('exist'); //TB_EndBalance_BS_P1100+TB_Debit_111
        cy.get('[data-cy=transaction-input6]').get('[value="400"]').should('exist'); //TB_Credit_111_1

        //Save Successfully
        cy.contains('Save').click();
        cy.contains('Yes').click();
        cy.contains('OK').click();
    });
});
