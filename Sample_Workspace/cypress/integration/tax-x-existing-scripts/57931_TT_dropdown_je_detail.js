/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});


describe('67931 (Karl) Test the dropdown component', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Can display the searched TT item', () => {
    cy.visit('taxx/clientgroup/1/entity/1/journal/31/');
    cy.contains('Principal document');
    cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').type('TT for');
    cy.get('[data-test-id="dropdown-list-container-je-transaction-type-0"]').should('exist');
    cy.get('[data-test-id="dropdown-item-0-je-transaction-type-0"]').should('contain.text', 'TT for Yearend Ops');
  });
});