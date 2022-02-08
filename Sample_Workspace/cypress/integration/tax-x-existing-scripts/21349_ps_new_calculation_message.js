Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const getLastRowFields = () => {
    return cy.contains('Calculation logic history').parent().find('tr').last().find('input');
};

describe('21349 (Karl) Change calculation confirmation message', () => {
    const paymentScheduleId = 3;

    it('Can update the interest schedule automatically v2', () => {
        // This will save the page everytime a row is added
        // Navigate to list
        cy.login();
        cy.visit(`/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`);
        cy.url().should('have.string', `/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`);
        cy.contains('Calculation logic history').should('be.visible');

        // -- Start of test scenario -- //
        cy.contains('Edit').then((e) => {
            Cypress.$(e).click();
        });
        cy.get('#terms-table-icon').click();
        cy.get('#terms-table-icon').click();

        // Input data
        getLastRowFields().eq(0).type('1000');
        getLastRowFields().eq(1).type('{selectall}{backspace}09/02/2020');
        getLastRowFields().eq(2).type('{selectall}{backspace}12/31/2020');
        getLastRowFields().eq(3).type('5');

        cy.contains('Save').click();
        cy.contains('Are you sure you want to make changes to the schedule? Any changes made in the amounts will be recalculated.');
        cy.screenshot('21349_PaymentSchedulePage_NewCalculationMessage');
    });
});
