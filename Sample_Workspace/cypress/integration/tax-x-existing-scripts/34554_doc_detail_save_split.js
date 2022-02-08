/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

// TO DO We need add a task to fix this test
describe('34554 (Karl) Tests the doc detail save split button', () => {
  it('Can display extracted data input fields after changing doc type', () => {
    cy.login();
    cy.visit(`taxx/clientgroup/3/entity/4/file/3455401`);
    cy.contains('SST West');
    cy.get('[data-cy=document-type-select]').select('1');
    cy.get('[data-cy=extracted-data-toggle]').click();
    cy.contains('Show only required fields').click();
    cy.contains('Bank Account Number');
  });
  it('Can save after input', () => {
    cy.login();
    cy.visit(`taxx/clientgroup/3/entity/4/file/3455401`);
    cy.contains('SST West');
    cy.get('[data-cy=document-type-select]').select('1');
    cy.get('[data-cy=extracted-data-toggle]').click();
    cy.contains('Show only required fields').click();
    cy.contains('Bank Account Number');
    cy.contains('Bank Account Number').parent().parent().parent().parent().find('input').type('111111');
    cy.contains('Save').click();
    cy.contains('Successfully saved');
  });
});
