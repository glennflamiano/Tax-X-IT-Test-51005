Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const clientgroupId = 2;
const entityId = 3;
const fileId = 3679100;
const counterpartyName = 'Aoyama Sogo Accounting Firm';
const editedCounterpartyName = 'PACIFIC SOLAR GK';

let psPageUrl = '';

describe('36791 (Jingda) Counter party in schedule taken from document', () => {
    beforeEach(() => {
        cy.login();
    });
    it('36791.1 Lender・Purchaser in primary doc can be populdated into transactions in JE page and Counterparty in payment schdule page', () => {
        // Go to file page
        cy.visit(`taxx/clientgroup/${clientgroupId}/entity/${entityId}/file/${fileId}/`);

        // Create a new JE from the first row
        cy.get('[data-cy=extracted-data-toggle]').clickAttached();
        cy.get('[data-cy=extracted-doc-data-button-0]').clickAttached();

        // Check if counterpary names are matched
        cy.get('[data-cy=transaction-input22]').should('have.value', counterpartyName);
        cy.get('[data-cy=transaction-input24]').should('have.value', counterpartyName);
        
        // Create a new transaction
        cy.get('[data-cy=creator-transactions-add-button]').click();
        cy.get('[data-cy=transaction-input42]').should('have.value', counterpartyName);
        cy.get('[data-cy=transaction-input44]').should('have.value', counterpartyName);
        cy.screenshot('36791_counterparty_from_primary_doc_populated');

        // Save JE
        cy.contains('Save').click();
        cy.contains('OK').click();

        // Go to payment schedule page
        cy.contains('View payment schedule').parent().click();

        // Check if counterparty name is matched
        cy.get('[data-cy=payment-schedule-components-counterparty]').invoke('text').should('eq', counterpartyName);
        cy.screenshot('36791_payment_schedule_counterparty');
        cy.url().then((url) => psPageUrl = url);
    });
    it('36791.2 Counterparty in payment schedule page can be changed by editing Counterparty in 1st DR in JE page', () => {
        // Go to JE page
        cy.visit(psPageUrl);
        cy.get('[data-cy=payment-schedule-components-je-pill]').clickAttached();

        // Edit counterparty in 1st DR
        cy.get('[data-cy=transaction-input22]').click();
        cy.get('[data-cy=transaction-dropdown22-option3').click();

        // Save JE
        cy.contains('Save').click();
        cy.contains('OK').click();
        
        // Go to payment schedule page
        cy.contains('View payment schedule').parent().click();

        // Check if counterparty name is matched
        cy.get('[data-cy=payment-schedule-components-counterparty]').invoke('text').should('eq', editedCounterpartyName);
        cy.screenshot('36791_payment_schedule_counterparty');
    });
    it('36791.3 JE created from payment schedule includes counterparty in payment schedule', () => {
        // Go to payment schedule page
        cy.visit(psPageUrl);

        // Create a principal payment je
        cy.get('[data-cy=payment-schedule-components-principal-payment-je-button]').clickAttached();
        cy.contains('OK').click();

        // Go to JE page
        cy.get('[data-cy=payment-schedule-components-principal-payment-je-pill]', { timeout: 10000 }).clickAttached();

        // Check if counterpary names are matched
        cy.get('[data-cy=transaction-input20]').should('have.value', editedCounterpartyName);
        cy.get('[data-cy=transaction-input22]').should('have.value', editedCounterpartyName);
        cy.screenshot('36791_je_created_from_payment_schedule');
    });
    it('36791.4 No counterparty is populated when the counterparty info in primary doc is not valid', () => { 
        // Go to file page
        cy.visit(`taxx/clientgroup/${clientgroupId}/entity/${entityId}/file/${fileId}/`);

        // Create a new JE from the second row
        cy.get('[data-cy=extracted-data-toggle]').clickAttached();
        cy.get('[data-cy=extracted-doc-data-button-1]').clickAttached();
        
        // Check if counterpary names are matched
        cy.get('[data-cy=transaction-input22]').should('have.value', '');
        cy.get('[data-cy=transaction-input24]').should('have.value', '');
    });
});
