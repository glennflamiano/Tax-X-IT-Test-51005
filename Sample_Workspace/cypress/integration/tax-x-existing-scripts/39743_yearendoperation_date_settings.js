Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('39743 (Diego) Year End Operation New Date Type Setting', () => {
    beforeEach(() => {
        // Go to Transaction Type Edit Page
        cy.login();
        cy.visit('/taxx/admin/transtype/3115400');
    });
    it('31154.1 Can update and use year end operation tt settings', () => {
        // make sure page is loaded
        cy.get('#transtypepage-transtype-3115400-name-input').should('have.value', '31154 Year End Operation Test')
        
        // make sure Operation in Use doesn't select value
        cy.contains('Operation in use').parent().parent().parent().within((el) => {
            cy.get('select').select('');
        });
        cy.get('input[id="yearendoperation_tbvalues-checkbox"]').should('not.be.visible');

        // Can select on 'Year End Operation' option in Operation in use
        cy.contains('Operation in use').parent().parent().parent().within((el) => {
            cy.get('select').select('Year End Operation').should('have.value', 'is_yearendoperation');
        });
        cy.get('input[id="yearendoperation_tbvalues-checkbox"]').should('be.visible');

        // Can select from 'Timing and date type setting' options
        cy.contains('Timing and date type setting').parent().parent().parent().within((el) => {
            cy.get('select').should('have.value', '0');
            cy.get('select').should('not.have.value', '1');
            cy.get('select').select('Biannually (End of biannual accounting period)').should('have.value', '1');
            cy.get('select').select('Quarterly (End of quarterly accounting period)').should('have.value', '2');
            cy.get('select').select('Yearly (End of fiscal year)').should('have.value', '3');
            cy.get('select').select('Monthly (End of month)').should('have.value', '0');

            cy.get('select').select('Monthly (Beginning of next month)').should('have.value', '4');
            cy.get('select').select('Biannually (Beginning of next biannual accounting period)').should('have.value', '5');
            cy.get('select').select('Quarterly (Beginning of next quarterly accounting period)').should('have.value', '6');
            cy.get('select').select('Yearly (Beginning of next fiscal year)').should('have.value', '7');
        });
    });
});
