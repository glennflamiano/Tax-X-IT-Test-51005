/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('31159 (Karl) Tests the yearend operation page for basic functionality', () => {
  it('31159.1 Yearend Operation Card/Nav button is displayed', () => {
      cy.login();
      cy.visit(`taxx/clientgroup/3/entity/4/`);
      cy.contains('Year end operation');
  });
  it('31159.2.b Filter box is displayed', () => {
    cy.login();
    cy.visit(`taxx/clientgroup/3/entity/4/yearend-operation/`);
    cy.get('[data-cy=filter-box-div]').contains('Fiscal year closing date');
    cy.get('[data-cy=filter-box-div]').contains('Accounting period end');
    cy.get('[data-cy=filter-box-div]').contains('JE date');
    cy.get('[data-cy=filter-box-div]').contains('Department');
    cy.get('[data-cy=filter-box-div]').contains('Timing');
    cy.get('[data-cy=filter-box-div]').contains('Transaction type');
  });

  it('31159.2.c.v Document Column displays TB and/or TK with related buttons', () => {
    // Functional testing of these buttons are handled in other tests
    cy.login();
    cy.visit(`taxx/clientgroup/3/entity/4/yearend-operation/`);
    cy.get('[data-cy=number-scroller-dropdown]').invoke('show');
    cy.contains('2021').click();
    cy.contains('TK Agreement');
    cy.contains('Fetch TB report');
  });

  it('31159.2.c.vi Remarks input field and save button test', () => {
    cy.login();
    cy.visit(`taxx/clientgroup/3/entity/4/yearend-operation/`);
    cy.get('[data-cy=number-scroller-dropdown]').invoke('show');
    cy.contains('2021').click().wait(12000);    // wait for 2021 department data show in the column
    cy.contains('Yearend Department').first().parent().get('[data-cy=save-button').should('not.exist');
    cy.contains('Yearend Department').first().parent().get('[data-cy=remark-input]').first().type('Changing remarks');
    cy.contains('Yearend Department').first().parent().get('[data-cy=save-button').should('exist');
    cy.contains('Yearend Department').first().parent().get('[data-cy=save-button').click();
    cy.contains('Successfully saved remark');
    cy.contains('OK').click();
    cy.contains('Yearend Department').first().parent().get('[data-cy=save-button').should('not.exist');
    cy.contains('Yearend Department').first().parent().get('[data-cy=remark-input]').first().clear();
    cy.contains('Yearend Department').first().parent().get('[data-cy=save-button').should('exist');
    cy.contains('Yearend Department').first().parent().get('[data-cy=save-button').click();
    cy.contains('Successfully saved remark');
    cy.contains('OK').click();
  });

  it('31159.2.c.vii Journal entry links can open to journal entry pages', () => {
    cy.login();
    cy.visit(`taxx/clientgroup/3/entity/4/yearend-operation/`);
    cy.get('[data-cy=number-scroller-dropdown]').invoke('show');
    cy.contains('2021').click();  // wait for 2021 department data show in the column
    cy.get('[data-cy=je-pill-button]').first().clickAttached();
    cy.contains('Edit journal entry');
    cy.visit(`taxx/clientgroup/3/entity/4/yearend-operation/`);
    cy.get('[data-cy=number-scroller-dropdown]').invoke('show');
    cy.contains('2021').click();  // wait for 2021 department data show in the column
    cy.contains('Test');
    cy.get('[data-cy=create-journal-entry-button]').first().clickAttached();
    cy.contains('Create journal entry');
  });
});
