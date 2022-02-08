/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

const getAddButtonByTable = (tableTitle) => {
  return cy.contains(tableTitle).parent().find('.mdi-icon').last();
};

describe('36140 (Karl) Test the Create JE Functionality across the system', () => {
  beforeEach(() => {
    // Create payment schedule for each test
    cy.login();
  });

  const getLastRowFields = () => {
    return cy.contains('Principal schedule').parent().find('tr').last().find('input').first();
  };

  it('Can create and save JE from documents and show valid values', () => {
    cy.visit(`taxx/clientgroup/3/entity/4/file/3614000`);
    cy.contains('36140 Backend CalculateJE test file');
    cy.contains('Loan Agreement');
    cy.contains('Zed');
    cy.contains('unused rows');
    cy.wait(200);
    cy.contains('Create JE').clickAttached();
    cy.contains('Settled'); // wait for JE page to load
    
    // check for valid values
    cy.contains('Create journal entry');
    cy.contains('36140 Backend CalculateJE test file');

    cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').focus();
    cy.contains('36140 Payment Schedule (loan)').should('exist').click();

    cy.wait(500);

    cy.get('[data-cy=transaction-input9]').should('have.value', '145')
    cy.get('[data-cy=transaction-input13]').should('have.value', '001')

    cy.contains('Save').should('exist').click();
    cy.contains('Information saved successfully');
    cy.contains('OK').should('exist').click();

  });
  it('Can create and save JE from Payment Schedule', () => {
    cy.reload();
    cy.contains('View payment schedule');
    cy.contains('View payment schedule').should('exist').click();
    cy.contains('Principal schedule');

    cy.contains('Edit').clickAttached();
    getAddButtonByTable('Principal schedule').should('exist').click();
    getLastRowFields().type('{selectall}{backspace}2022/03/08');
    cy.contains('Principal schedule')
      .parent()
      .find('tr').last()
      .find('td').first()
      .next().find('input').type(1000);

    cy.contains('Save').should('exist').click();
    cy.get('#confirmBox-confirmBtn').should('exist').click();
    cy.contains('OK').should('exist').click();
    cy.reload();
    // confirm date and calculated data
    cy.contains('2022-03-08');
    cy.contains('Principal schedule')
      .parent()
      .find('tr').last()
      .find('td').first()
      .next().next()
      .should('have.text', '9,000');

    // cy.contains('Payment JE').should('exist').click();
    cy.contains('Payment JE').should('exist').clickAttached();
    cy.get('[data-cy=payment-schedule-components-principal-payment-je-pill]');
    cy.contains('Successfully saved');
    cy.contains('OK').should('exist').click();
    cy.get('[data-cy=payment-schedule-components-principal-payment-je-pill]').should('exist').click();

    // confirm calculated JE data
    cy.contains('Related information');
    cy.contains('Related information').parent().contains('Payment schedule');
  
    // confirm selected TT is right, 3614002 is principal TT in 3614000
    cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', 'Payment Schedule (loan) principal');

    // principal TT's transaction is dr: 115, cr: 113
    // confirm JE transaction comes from that setting
    cy.get('[data-cy=transaction-input7]').should('have.value', '115');
    cy.get('[data-cy=transaction-input9]').should('have.value', '113');
  });

  it('Can Settle JE', () => {
    cy.reload();
    cy.get('[data-cy=settlement-status-select]').select('unsettled');
    cy.contains('Save').should('exist').click();
    cy.contains('OK').should('exist').click();
    cy.reload();
    // Since this settle JE's parent JE is not accout payable je
    // the transaction comes from frontend hard code
    cy.contains('Settle JE');
    cy.contains('Settle JE').should('exist').click();
    cy.contains('Principal document');
    cy.get('[data-cy=settlement-status-select]').should('have.value', 'settlement');
    // dr account should be 315
    cy.get('[data-cy=transaction-input7]').should('have.value', '315');
    // cr account should be 111
    cy.get('[data-cy=transaction-input9]').should('have.value', '111');
    cy.contains('Save').should('exist').click();
    cy.contains('OK').should('exist').click();
  });

  it('Can create and save JE from yearend operations page', () => {
    cy.visit(`taxx/clientgroup/3/entity/4/yearend-operation/`);
    cy.contains('36140 Year End Operation Test');
    cy.contains('36140 Year End Operation Test').first().parent().find('td').first().invoke('text').then((department) => {

      cy.contains('36140 Year End Operation Test').first().parent().find('[data-cy=create-journal-entry-button]').first().should('exist').click();
      cy.contains('Journal entry').should('exist');
      cy.contains('Principal document');
      
      // confirm calculated JE's transaction department
      // is selected row's department
      cy.get('[data-cy=transaction-input2]').should('have.value', department);
  
      // confirm select the right TT
      // Dr account 111 subaccount 010 CT 011
      // CR account 115 subaccount 0   CT 0
      cy.get('input[placeholder*="36140 Year End Operation Test"]')
      // confirm the transaction DR is matched with TT
      cy.get('[data-cy=transaction-input7]').should('have.value', '111');
      cy.get('[data-cy=transaction-input9]').should('have.value', '115');
  
      cy.contains('Save').should('exist').click();
      cy.contains('OK').should('exist').click();

      cy.reload();
      // delete created JE for next test
      cy.contains('Delete').should('exist').should('exist').click();
      cy.get('#confirmBox-confirmBtn').should('exist').click();
      cy.contains('OK').should('exist').click();

      cy.visit(`taxx/clientgroup/3/entity/4/yearend-operation/`);
    })
  });

});
