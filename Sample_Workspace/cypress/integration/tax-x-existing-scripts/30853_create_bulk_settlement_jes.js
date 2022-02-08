Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('30853 (Hannah) Create Bulk Settlement Joural Entries', () => {
    beforeEach(() => {
        // Go to File Page
        cy.login();
        cy.visit('/taxx/clientgroup/1/entity/1/file/3085300');
        cy.wait(3000);
    });

    it('30853 Can create bulk settlement joural entries', () => {
        // Check Page
        cy.contains('Create JE').should('be.visible');
        cy.contains('Unsettled').should('be.visible');
        cy.contains('Settled (changed)').should('not.be.visible');

        // Create settlement journal entries for document
        cy.get('svg[title="More create JE options"]').first()
            .should('be.visible')
            .click();
        cy.screenshot('30853_more_create_je_pressed');
        cy.contains('Bulk settle JE').should('be.visible')
            .parent().parent()
            .should('not.have.css', 'background-color', 'rgb(184, 184, 184)');
        cy.contains('Bulk settle JE')
            .should('be.visible')
            .then((e) => {
                Cypress.$(e).click();
            });
        cy.wait(3000);
        cy.contains('Found 2 journal entry and 2 settled JE(s) is(are) created.' +
            ' 0 of unsettled JE couldn\'t find supporting document to settle.')
            .should('be.visible');
        cy.contains('OK').click();
        cy.wait(3000);
        cy.contains('Unsettled').should('not.be.visible');
        cy.contains('Settled (changed)').should('be.visible');

        // Check that the Bulk settle JE button is disabled
        cy.get('svg[title="More create JE options"]').first()
            .should('be.visible')
            .click();
        cy.contains('Bulk settle JE').should('be.visible')
            .parent().parent()
            .should('have.css', 'background-color', 'rgb(184, 184, 184)');
    });
});
