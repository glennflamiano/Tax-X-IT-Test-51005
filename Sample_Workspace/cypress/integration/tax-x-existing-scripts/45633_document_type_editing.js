/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('45633 (Jason) Test to edit document types', () => {
    const pageURL = 'taxx/admin/doctype/1/';
    beforeEach(() => {
        cy.login();
    });

    it('45633.1 Page header and breadcrumbs match document type name', () => {
        cy.visit(pageURL);
        cy.wait(1000);
        cy.get('#header-top').find('div').first().should('contain', '銀行取引明細書 (Bank Statement)');
        cy.get('a[href="/taxx/admin/doctype/1/"] > div > div').should('contain', '銀行取引明細書 (Bank Statement)');
    });

    it('45633.2 Disabled save button state on page load', () => {
        cy.get('[data-cy=doctype-save-button]').should('have.css', 'background').and('match', /rgb\(128, 128, 128\)/);
    });

    // Commented out for v6 while UI should have a readonly state, should uncomment when determined UI should be editable by the user
    /*it('45633.3 Change document format and validate save button enabled', () => {
        cy.reload();
        cy.wait(1000);
        cy.get('[data-cy=doctype-format-select]').select('Excel').should('have.value', 'excel');
    });

    it('45633.4 Validate standard item table header column labels', () => {
        cy.get('[data-cy=doctype-standarditem-columnlabel-0]').should('contain', 'Standard Item (EN)');
        cy.get('[data-cy=doctype-standarditem-columnlabel-1]').should('contain', 'Standard Item (JP)');
        cy.get('[data-cy=doctype-standarditem-columnlabel-2]').should('contain', 'Required');
        cy.get('[data-cy=doctype-standarditem-columnlabel-3]').should('contain', 'Data type');
        cy.get('[data-cy=doctype-standarditem-columnlabel-4]').should('contain', 'List database');
    });

    it('45633.5 Edit existing standard items and test save button has been enabled', () => {
        cy.get('[data-cy=doctype-standarditem-item-input-0] > div > input').clear().type('Hello world').should('have.value', 'Hello world');
        cy.get('[data-cy=doctype-standarditem-value-input-0] > div > input').clear().type('今日は').should('have.value', '今日は');
        cy.get('[data-cy=doctype-standarditem-required-checkbox-0]').uncheck().click().should('be.checked');
        cy.get('[data-cy=doctype-standarditem-type-select-0]').select('Number').should('have.value', 'number');
        cy.get('[data-cy=doctype-standarditem-array-select-0]').select('').should('have.value', '');
        cy.get('[data-cy=doctype-save-button]').should('have.css', 'background').and('match', /rgb\(0, 94, 181\)/);
    });

    it('45633.6 Click minus (-) button to remove existing standard item table row and validate save button enabled', () => {
        cy.reload();
        cy.wait(1000);
        cy.get('[data-cy=doctype-standarditem-remove-button-0]').click();
        cy.get('[data-cy=doctype-standarditem-item-input-0] > div > input').should('not.have.value', 'Value Date').should('have.value', 'DebitCredit');
        cy.get('[data-cy=doctype-save-button]').should('have.css', 'background').and('match', /rgb\(0, 94, 181\)/);
    });

    it('45633.7 Click plus (+) button to add a new standard item table row and validate save button enabled', () => {
        cy.reload();
        cy.wait(1000);
        cy.get('[data-cy=doctype-standarditem-add-button]').click();
        cy.get('[data-cy=doctype-standarditem-table-body]').find('tr').last().find('td').first().find('div > div > input').should('have.value', '');
        cy.get('[data-cy=doctype-save-button]').should('have.css', 'background').and('match', /rgb\(0, 94, 181\)/);
    });

    it('45633.8 Confirm warning after making an edit and attempting to navigate away from the page', () => {
        cy.reload();
        cy.wait(1000);
        cy.get('[data-cy=doctype-standarditem-item-input-0] > div > input').clear().type('Hello world');
        cy.get('a[href="/taxx/admin/doctype/1/"]').click();
        cy.contains('You have unsaved changes. Are you sure you want to leave this page?').should('exist');
        cy.contains('Yes').click();
    });

    it('45633.9 Confirm successful save by creating a new standard item, entering all values, and clicking the save button', () => {
        cy.reload();
        cy.wait(1000);
        cy.get('[data-cy=doctype-standarditem-add-button]').click();
        cy.wait(200);
        cy.get('[data-cy=doctype-standarditem-table-body]').find('tr').last().find('> td:nth-child(1) > div > div > input').type('Test');
        cy.get('[data-cy=doctype-standarditem-table-body]').find('tr').last().find('> td:nth-child(2) > div > div > input').type('テスト');
        cy.get('[data-cy=doctype-standarditem-table-body]').find('tr').last().find('> td:nth-child(3) > div > input').check();
        cy.get('[data-cy=doctype-standarditem-table-body]').find('tr').last().find('> td:nth-child(4) > div > select').select('Date');
        cy.get('[data-cy=doctype-save-button]').click()
        cy.get('.popupWindow').should('exist');
        cy.contains('OK').click();
    });*/
});
