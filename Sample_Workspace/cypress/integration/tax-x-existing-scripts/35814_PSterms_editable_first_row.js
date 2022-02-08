/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('35814 (Karl) Display row even without Service Period dates', () => {
  it('35814.1 Create a payment schedule from a Document-linked JE', () => {    
      cy.login();
      cy.visit(`taxx/clientgroup/3/entity/4/journal/new/3581400/Items-0/`);
      cy.wait(2000);
      cy.contains('Principal document');
      cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').focus();
      cy.contains('Payment Schedule (loan)').click();
      cy.wait(2000);
      cy.contains('Dr');
      cy.contains('Cr');
      cy.contains('Row');
      cy.contains('Counterparty');
      cy.contains('Save').click();
      cy.contains('OK').click();
      cy.contains('View payment schedule');
      cy.contains('View payment schedule').parent().click();
      cy.wait(2000);
      cy.contains('Calculation logic history');
      cy.contains('10,000');
  });
});
