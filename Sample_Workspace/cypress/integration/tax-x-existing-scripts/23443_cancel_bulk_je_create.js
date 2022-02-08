Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('23443 (Diego) Bulk JE creation popup', () => {
    beforeEach(() => {
        // Go to File Page
        cy.login();
        cy.visit('/taxx/clientgroup/1/entity/1/file/2344300/');
        cy.wait(3000);
    });

    it('23443 Can cancel Bulk JE creation', () => {
        // page takes too long to be loaded
        cy.contains('Capex List Type TT', {timeout: 100000}).should('be.visible');
        cy.contains('Create JE').should('be.visible');
        cy.get('svg[title="More create JE options"]').first()
            .should('be.visible')
            .click();
        // cy.screenshot('23443_more_create_je_pressed');
        cy.contains('Capex List Type TT').should('be.visible');

        cy.contains('Bulk create JE')
            .should('be.visible')
            .then((e) => {
                Cypress.$(e).click();
            });
        cy.contains('JE already exists').should('be.visible');
        cy.contains('Would you like to overwrite the existing journal entry?').should('be.visible');
        cy.contains('Skip the existing JE').should('be.visible');
        cy.contains('Overwrite existing JE').should('be.visible');
        cy.contains('Cancel').should('be.visible').click();

        cy.wait(3000);
        
        cy.contains('JE already exists').should('not.exist');
        cy.contains('Would you like to overwrite the existing journal entry?').should('not.exist');
        cy.contains('Skip the existing JE').should('not.exist');
        cy.contains('Overwrite existing JE').should('not.exist');
        cy.contains('Cancel').should('not.exist');
        cy.contains('Creating JE').should('not.exist');
        cy.contains('JE were created for').should('not.exist');
    });
});
