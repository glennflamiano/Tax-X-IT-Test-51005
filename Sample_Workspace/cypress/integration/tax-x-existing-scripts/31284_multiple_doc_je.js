/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('31284 (Karl) Create Journal Entry with Multiple Principal Documents', () => {
  beforeEach(() => {
      // Go to New Journal Entry (Create new) page
      cy.login();
      cy.visit('taxx/clientgroup/3/entity/4/journal/3128400/');
      cy.contains('Principal document'); // Dynamic wait
  })
  it('31284.1,3 Can show multiple principal documents', () => {
      // Check 1st Document Name
      cy.contains('3128401 Multidoc sample 1').should('exist');
      // Check 1st Transaction Type
      cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Payment Schedule (loan)`);

      // Check 2nd Document Name
      cy.contains('3128402 Multidoc sample 2').should('exist');
      // Check 2nd Transaction Type
      cy.get('[data-test-id="dropdown-input-field-je-transaction-type-1"]').invoke('attr', 'placeholder').should('contain', `TT for Yearend Ops`);
  });
  it('31284.2 Can add a new principal document using the add button', () => {
      // Click the add principal button
      cy.get(`[data-cy=add-principal-button]`).click();

      // New blank Principal Document should be displayed
      cy.get('[data-test-id="dropdown-input-field-je-transaction-type-2"]').should(`exist`);
      // Default transaction type should be same as the first one
      cy.get('[data-test-id="dropdown-input-field-je-transaction-type-2"]').invoke('attr', 'placeholder').should('contain', `Payment Schedule (loan)`);
  });

  it('31284.2x Can refer a file to the new principal document and save', () => {
      // Click the add principal button
      cy.get(`[data-cy=add-principal-button]`).click();

      cy.get('a').filter(':contains("Select document")').eq(2).click()

      cy.get('[data-cy=doc-selection-popup-area]').should('exist').find('dt').should('exist')
      .contains('Document type').next().within((e) => {
          cy.get('[data-cy=transaction-input1]').should('exist').click();
      });
      cy.contains('Document type').should('exist').siblings().contains('All').clickAttached();
      cy.get('[data-cy=doc-selection-popup-area]').should('exist').click();
      cy.contains('File name').should('exist').next().type('3128403')

      cy.contains('3128403 Multidoc sample 3').should('exist');      
      cy.get(`[data-cy=attach-document-button]`).clickAttached();
      cy.contains('Proceed').clickAttached();

      //Save Successfully
      cy.contains('Save').clickAttached();
      cy.contains('OK').click();

      // Contains all 3 principal documents
      cy.contains(`3128401 Multidoc sample 1`).should('exist');
      cy.contains(`3128402 Multidoc sample 2`).should('exist');
      cy.contains(`3128403 Multidoc sample 3`).should('exist');
  });
});
