Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const TEST_DOCISSUER = '株式会社 DocIssuerDocIssuer';


describe('46712 Counter party document issuer', () => {
    beforeEach(() => {
        cy.login();
    });
    it('46712 Document issuer, checkmark should be displayed if at least 1 document type is selected in the detail page', () => {
        // got to counterparty page
        cy.visit('taxx/admin/counterparty');

        // check that test counter party exists and can navigate to details page with click
        cy.contains(TEST_DOCISSUER).should('exist');
        cy.contains(TEST_DOCISSUER).click();
        cy.contains('Counterparty detail').should('exist');
        cy.go('back')

        // check that counter party that has document issuer display check mark
        cy.get(`[data-cy="${TEST_DOCISSUER}-documentIssuer"]`);
    });
});