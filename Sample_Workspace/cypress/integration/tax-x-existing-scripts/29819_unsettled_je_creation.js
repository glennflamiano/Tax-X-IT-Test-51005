Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('29819 (Kim) Unsettled: Journal entry creation backend logic', () => {
    it('29819.1 X does not find its supporting document', () => {    
        cy.login();
        cy.visit('taxx/clientgroup/1/entity/1/journal/2746200/');
        cy.wait(3000);

        // Basic Information
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Test-Unsettled`);
        cy.contains('Unsettled').should('exist');
        cy.get('[value="2021年01月30日"]').should('exist');

        // Dr Transaction
        // Account Codes
        cy.get('[data-cy=transaction-input7]').get('[value="716"]').should('exist');
        cy.get('[data-cy=transaction-input11]').get('[value="000"]').should('exist');
        cy.get('[data-cy=transaction-input15]').get('[value="012"]').should('exist');
        //Acount Names
        cy.get('[data-cy=transaction-input8]').get('[value="専門家報酬"]').should('exist');
        cy.get('[data-cy=transaction-input12]').get('[value="その他"]').should('exist');
        cy.get('[data-cy=transaction-input15]').get('[value="共通売上分課税仕入"]').should('exist');
        
        cy.get('[data-cy=transaction-input3]').get('[value="0"]').should('exist'); //Dr Amount
        cy.get('[data-cy=transaction-input18]').get('[value="0"]').should('exist'); //CT Value

        // Cr Transaction
        // Account Codes
        cy.get('[data-cy=transaction-input9]').get('[value="315"]').should('exist');
        cy.get('[data-cy=transaction-input13]').get('[value="000"]').should('exist');
        cy.get('[data-cy=transaction-input19]').get('[value="000"]').should('exist');
        //Acount Names
        cy.get('[data-cy=transaction-input10]').get('[value="未払金"]').should('exist');
        cy.get('[data-cy=transaction-input14]').get('[value="その他"]').should('exist');
        cy.get('[data-cy=transaction-input20]').get('[value="対象外"]').should('exist');
        
        cy.get('[data-cy=transaction-input6]').get('[value="0"]').should('exist'); //Dr Amount
        cy.get('[data-cy=transaction-input22]').get('[value="0"]').should('exist'); //CT Value

        //Save Successfully
        cy.contains('Save').click();
        cy.contains('OK').click();
    });
});