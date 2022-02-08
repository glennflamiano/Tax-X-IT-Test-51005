Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const SELECT_JOURNAL_ENTRY_LINK = '[data-cy=jelink-select-button]';
const JE_LINK_BUTTON = '[data-cy=jelink-link-button]';
const JE_CHECKBOX = '[data-cy=link-je-checkbox-30]';
const JE_CHECKBOX_2 = '[data-cy=link-je-checkbox-29]';
const JE_UNLINK = '[data-cy=je-unlink-link-30]'
const JE_UNLINK_2 = '[data-cy=je-unlink-link-29]'
const JE_ADD_BUTTON = '[data-cy=jelink-add-button]'

describe('61553 Open Link JE popup', () => {
    beforeEach(() => {
        cy.login();
    });
    it('Shows clickable Select journal entry button ', () => {
        // got to journal entry detail page with id 31
        cy.visit('taxx/clientgroup/1/entity/1/journal/31/');

        // Check that JE link section appears
        cy.get(SELECT_JOURNAL_ENTRY_LINK).should('exist');
        cy.get(SELECT_JOURNAL_ENTRY_LINK).click();

        // Test JE link button interactivity
        cy.get(JE_LINK_BUTTON).should('exist');
        cy.get(JE_LINK_BUTTON).should('have.css', 'background').should('contain', 'rgb(128, 128, 128)');

        // Select particular JE
        cy.get(JE_CHECKBOX).should('exist');
        cy.get(JE_CHECKBOX).click();

        // Check that button text updated
        cy.get(JE_LINK_BUTTON).should('have.css', 'background').should('not.contain', 'rgb(128, 128, 128)');
        cy.get(JE_LINK_BUTTON).should('contain', '1');
        cy.get(JE_LINK_BUTTON).click();

        // check that add button exists and is clickable
        cy.get(JE_ADD_BUTTON).should('exist');
        cy.get(JE_ADD_BUTTON).click();

        // Check that previously linked JE is not an option anymore
        cy.get(JE_CHECKBOX).should('not.exist');

        // Link another JE
        cy.get(JE_CHECKBOX_2).should('exist');
        cy.get(JE_CHECKBOX_2).click();
        cy.get(JE_LINK_BUTTON).click();

        // wait until popup is closed
        cy.get(JE_LINK_BUTTON).should('not.exist');

        // Check that when clicking unlink that JE disappears 
        cy.get(JE_UNLINK).should('exist');
        cy.get(JE_UNLINK).click();
        cy.get(JE_UNLINK).should('not.exist');

        // Check that when clicking unlink that JE disappears 
        cy.get(JE_UNLINK_2).should('exist');
        cy.get(JE_UNLINK_2).click();
        cy.get(JE_UNLINK_2).should('not.exist');

        // // Check that linking section comes back when there are no linked jes
        cy.get(SELECT_JOURNAL_ENTRY_LINK).should('exist');
    });
});