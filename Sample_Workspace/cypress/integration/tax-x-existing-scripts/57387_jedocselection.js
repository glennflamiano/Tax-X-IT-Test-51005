Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('57387 Test JE new document selection', () => {
    beforeEach(() => {
        cy.login();
    });
    it('57387 Create JE by document for PD', () => {
        cy.visit('/taxx/clientgroup/4/entity/6/journal/new/5738701/');
        // confirm page loaded
        cy.contains('57387 Test File For JE Doc Selection').should('exist');
        cy.get('[data-cy=0_5738700_select_document_row]')
            .should('have.text', '銀行取引明細書 (Bank Statement):Document 1 - Transactions 1');

        // Add a TT and then add counterparty for transaction
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]').should('exist')
            .click();
        cy.contains('36624 Capex TT').should('exist')
            .click();
        cy.get('input[placeholder*="36624 Capex TT"]').should('exist');
        cy.get('[data-cy=transaction-input18]').click();
        cy.contains('三井住友銀行').should('exist').click();
        
        // open document selection popup to confirm default filter counterparty and File used
        cy.get('[data-cy=select-document-button_0]').click({force: true});

        cy.get('[data-cy=doc-selection-popup-area]').should('exist').find('dt').should('exist')
            .contains('Counterparty').next().within((e) => {
                cy.get('[data-cy=transaction-input1]').should('have.value', '三井住友銀行');
            });

        cy.get('[data-cy=doc-selection-popup-area]').should('exist').find('dt').should('exist')
            .contains('File used').next().within((e) => {
                cy.get('[data-cy=transaction-input1]').should('have.value', 'Unused');
            });
    });
    it('57387 Create JE by New for SD', () => {
        cy.visit('/taxx/clientgroup/4/entity/6/journal/new/');
        cy.contains('Journal entry').should('exist');
        cy.contains('Supporting document').should('not.exist');

        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]').should('exist')
            .click();
        cy.contains('32094 Bank Statement Matching Test').should('exist')
            .click();
        cy.get('input[placeholder*="32094 Bank Statement Matching Test"]').should('exist');

        // select SD
        cy.get('[data-cy=select-document-button_1]').click();

        // check default filter docType for SD
        cy.get('[data-cy=doc-selection-popup-area]').should('exist').find('dt').should('exist')
            .contains('Document type').next().within((e) => {
                cy.get('[data-cy=transaction-input1]').should('have.value', '銀行取引明細書 (Bank Statement)');
            });
        cy.get('[data-cy=5738700_tile_click_area]').should('exist')
            .click();
        cy.get('[data-cy=doc_selection_transaction_row_2]').should('exist')
            .clickAttached();
        
        cy.get('#confirmBox-confirmBtn').click();

        cy.get('[data-cy=1_5738700_select_document_row]').should('have.text', '銀行取引明細書 (Bank Statement):Document 1 - Transactions 3')
    });
});