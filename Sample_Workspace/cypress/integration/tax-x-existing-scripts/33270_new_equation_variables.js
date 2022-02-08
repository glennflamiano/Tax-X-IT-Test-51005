Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('33270 (Diego) Add new equation variables', () => {
    beforeEach(() => {
        // Go to File Page
        cy.login();
    });

    it('33270 Can create JE without principal document', () => {
        cy.visit('/taxx/clientgroup/5/entity/7/journal/new/').then(() =>{
            cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').focus();
            cy.contains('No Primary Doc Test').click();
            cy.get('[data-cy=transaction-input1]').should('exist').click();
            cy.get('[data-cy=transaction-dropdown1-option2').should('exist').first().click();
            cy.get('[data-cy=transaction-input4]').should('exist').click()
            cy.get('[data-cy=transaction-dropdown4-option1000000').should('exist').first().click();
            cy.get('[data-cy=transaction-input3]').should('exist').should('have.value', '101');
            cy.get('[data-cy=transaction-input6]').should('exist').should('have.value', '201');
            cy.get('[data-cy=transaction-input1]').should('exist').click();
            cy.get('[data-cy=transaction-dropdown1-option1000000').should('exist').first().click();
            cy.get('[data-cy=transaction-input4]').should('exist').click()
            cy.get('[data-cy=transaction-dropdown4-option2').should('exist').first().click();
            cy.get('[data-cy=transaction-input3]').should('exist').should('have.value', '201');
            cy.get('[data-cy=transaction-input6]').should('exist').should('have.value', '101');
        })
    });
    
})