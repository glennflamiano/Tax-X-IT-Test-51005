Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('31154 (Hannah) Year End Operation TT Settings', () => {
    beforeEach(() => {
        // Go to Transaction Type Edit Page
        cy.login();
        cy.visit('/taxx/admin/transtype/3115400');
        cy.wait(3000);
    });
    it('31154.1 Can update and use year end operation tt settings', () => {
        // Use year and operation in 
        cy.contains('Operation in use').parent().parent().parent().within(() => {
            cy.get('select').select('Year End Operation').should('have.value', 'is_yearendoperation');
        });
        
        cy.get('input[id="yearendoperation_tbvalues-checkbox"]').should('be.visible');

        // Can select from 'Timing and date type setting' options
        cy.contains('Timing and date type setting').parent().parent().parent().within((el) => {
            cy.get('select').should('have.value', '0');
            cy.get('select').should('not.have.value', '1');
            cy.get('select').select('Biannually (End of biannual accounting period)').should('have.value', '1');
            cy.get('select').select('Quarterly (End of quarterly accounting period)').should('have.value', '2');
            cy.get('select').select('Yearly (End of fiscal year)').should('have.value', '3');
            cy.get('select').select('Monthly (End of month)').should('have.value', '0');
        });

        // Can not use TB and TK equation options when boxes are not checked
        cy.get('i[id="equation-search-1"]').click();
        cy.contains('Respective calculated operating fee').should('not.exist');
        cy.contains('TB (OBC)').should('not.exist');
        cy.contains('Cancel').first().click();
        cy.get('input[id="equation-input-1"]').should('have.value', '');

        // Can use TB and TK equation options when boxes are checked
        cy.get('input[id="yearendoperation_tbvalues-checkbox"]').click();
        cy.get('input[id="yearendoperation_tkvalues-checkbox"]').click();

        cy.get('i[id="equation-search-1"]').click();
        cy.contains('Respective calculated operating fee').should('be.visible');
        cy.contains('TB (OBC)').should('be.visible');

        cy.contains('Respective calculated operating fee').click();

        cy.get('i[id="equation-search-1"]').click();
        cy.contains('Account / Sub-account').parent().parent().parent().within((el) => {
            cy.get('select:first').select('account_sub_account');
            cy.get('select:last').select('111_2');
        }); 
        cy.contains('TB_EndBalance_111_2').click();

        cy.get('i[id="equation-search-1"]').click();
        cy.contains('TB_Debit_111_2').click();

        cy.get('i[id="equation-search-1"]').click();
        cy.contains('TB_Credit_111_2').click();

        cy.get('input[id="equation-input-1"]')
            .should('have.value', 'Entity_OperatingFeeCalc+TB_EndBalance_111_2+TB_Debit_111_2+TB_Credit_111_2');

        // Can save year end opteration tt settings
        cy.contains('Save').click();
        cy.contains('OK').click();
        cy.wait(3000);
        cy.get('input[id="yearendoperation_tbvalues-checkbox"]').should('be.visible');
    });
});
