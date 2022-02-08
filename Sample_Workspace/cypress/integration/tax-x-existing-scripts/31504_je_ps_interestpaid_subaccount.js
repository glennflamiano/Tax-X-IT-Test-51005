/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('31504 (Karl) Automatically add subaccount on interestpaid JE', () => {
    it('31504 Automatically display subaccount', () => {    
        cy.login();
        cy.visit(`taxx/clientgroup/3/entity/4/journal/315043`);
        cy.wait(1000);
        cy.contains('Save').click();
        cy.contains('OK').click();
        cy.get('input[value="普通預金8 (4523777)"]').should('have.value', '普通預金8 (4523777)');
    });
});
