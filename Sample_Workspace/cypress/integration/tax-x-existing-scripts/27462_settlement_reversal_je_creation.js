Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('27462 (Hannah) Create Settlement Reversal Journal Entry from Unsettled Journal Entry', () => {
    beforeEach(() => {
        // Go to Unsettled Journal Entry
        cy.visit('taxx/logout');
        cy.login();
        cy.visit('taxx/clientgroup/1/entity/1/journal/2746200/');
        cy.contains('Journal entry 2746200').should('exist')
    })
    it('27462.1 Can create settlement reversal journal entry', () => {
        // Check Unsettled Parent Journal Entry
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Test-Unsettled`);
        cy.contains('Unsettled').should('exist');

        // Create Settlement Reversal Journal Entry
        cy.contains('Settle JE').click();

        // Check Settlement Reversal Journal Entry
        cy.contains(`Journal entry link`);
        cy.wait(2000)        
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Test-Settled`);
        cy.contains('Settled (changed)').should('exist');

        // Find Save Warning
        cy.contains('Select supporting document to save this JE').should('exist');

        // Add Supporting Document
        cy.contains('Supporting document').should('exist').parent().parent().within((el) => {
            cy.contains('Select document').click();
        })

    
        cy.contains('File name').should('exist').next().type('27462')

        cy.contains('27462 Bank Statement').should('exist').clickAttached();
        cy.contains("2020/12/15").clickAttached();
        cy.get('#confirmBox-confirmBtn').last().click();

        cy.wait(3000)
        // cy.contains('Select supporting document to save this JE').should('not.be.visible');
        cy.contains('Save').click();
        cy.get('#alertBox-confirmBtn').last().click();

        cy.screenshot('Saved_Reversal_JE');

        // Check Linked Parent Journal Entry
        cy.scrollTo('bottom');
        cy.contains('JE Date').parent().parent().parent().parent().within((el) => {
            cy.contains('2746200').should('exist');
        })

        // Check Updated Unsettled Parent Journal Entry
        cy.visit('taxx/clientgroup/1/entity/1/journal/2746200/');

        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Test-Unsettled`);
        cy.contains('Settled (changed)').should('exist');
        cy.scrollTo('bottom');
        cy.contains('JE Date').parent().parent().parent().parent().within((el) => {
            cy.contains('Test-Settled').should('exist');
        })
    });
});
