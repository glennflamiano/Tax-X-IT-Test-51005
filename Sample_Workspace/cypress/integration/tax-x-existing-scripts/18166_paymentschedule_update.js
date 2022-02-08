Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('18166 (Thomas) Payment schedule tests', () => {
    it('18166.1 Can view payment schedule', () => {
        // Navigate to list
        cy.login();
        cy.visit('/taxx/clientgroup/1/entity/1/');

        cy.get('#entityhomepage-entity-1-paymentschedule-card').should('exist').click();

        cy.url().should('contain', '/taxx/clientgroup/1/entity/1/payschedule/');
        // Navigate to specific schedule
        cy.contains('Prepaid').should('exist').click();

        cy.contains('Calculation logic history').should('be.visible');
        cy.contains('Principal schedule').should('be.visible');
        cy.screenshot('PaymentSchedulePage_Loan');
    });
    it('18166.1 Can edit logic history', () => {
        cy.login();
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule/1');
        cy.contains('Edit').clickAttached();
        
        cy.get('.add-terms-button').last().should('exist').click();
        cy.get('.add-terms-button').last().should('exist').click();
        cy.get('.period-value-input').last().should('exist').type('50000', {force: true});
        cy.get('.period-from-input').last().should('exist').type('{selectall}{backspace}09/01/2020', {force: true});
        cy.get('.period-to-input').last().should('exist').type('{selectall}{backspace}11/30/2020', {force: true});
        cy.get('.save-button').last().should('exist').click()
        cy.get('#confirmBox-confirmBtn').last().should('exist').click();
    });
});
