Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('50852 Bank Statement JE Bulk', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.login();
    });

    it('Visit Client first', () => {
    	//cy.login();
        cy.visit('/taxx');
        cy.screenshot('50852-000001');
    });

    it('Go to journal entry', () => {
    	//cy.login();
    	//cy.login();
    	cy.visit('/taxx');
    	cy.screenshot('50852-000002');
        cy.contains("Aubrey's Test Client Group").click();
        cy.url().should('contain', '/clientgroup/4');
        //cy.contains("Company Aubrey").click();
        cy.visit("/taxx/clientgroup/4/entity/6/")
        cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.screenshot('50852-000003');
        //cy.contains("Journal entry").click();
        cy.visit("/taxx/clientgroup/4/entity/6/journal/")
        cy.url().should('contain', '/journal/');
        cy.screenshot('50852-000004');
    });

    it('Create JE for Bank Statement', () => {
        cy.contains("Create").click();
        cy.url().should('contain', '/clientgroup/4/entity/6/journal/new/');
        cy.screenshot('50852-000005');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]').type('32094 Bank Statement Matching Test');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]').type('{enter}');
        cy.get('select[data-cy=je-docchooser-rule]').select('32094 Bank Statement Match Rule')
        //cy.contains('Transaction types').select('32094 Bank Statement Matching Test');
        //cy.get('#dropdown-icon-toggle-button-je-transaction-type-0 svg').should('exist').click();

        //add single JE
        cy.get('svg[class=mdi-icon sc-gsNilK fpiXhK]').click();
    });


    /*it('45241 Test capex nextmonthpayment logic, created Capex should be normal', () => {
        // make sure TT accrued is checked
        cy.visit('taxx/admin/transtype/4524128');
        cy.get('#is_accrued-checkbox').should('exist').uncheck();
        cy.contains('Save').click();

        // create JE by document
        cy.visit('taxx/clientgroup/4/entity/6/journal/new/4524101/Items-1/');
        cy.get('#entity-6-je-4524101-new-saveBtn').should('exist').click();
        cy.get('#alertBox-confirmBtn').should('exist').click();
        cy.get('#je_registerasset_btn').should('exist').click();
        cy.contains(/^Normal$/).should('exist');
        cy.contains(/^Normal$/).prev().find('input').should('not.be.checked');
    });
    it('45241 Test capex nextmonthpayment logic, created Capex should be accrued', () => {
        // make sure TT accrued is checked
        cy.visit('taxx/admin/transtype/4524128');
        cy.get('#is_accrued-checkbox').should('exist').check();
        cy.contains('Save').should('exist').click();
        cy.get('#alertBox-confirmBtn').should('exist').click();

        // create JE by document
        cy.visit('taxx/clientgroup/4/entity/6/journal/new/4524101/');

        cy.get('[data-cy=docchooser_remark]')
            .should('exist').first().find('input')
            .should('exist')
            .should('have.value', '宴会場改修工事 test keyword1');
        
        cy.get('#entity-6-je-4524101-new-saveBtn').should('exist').click();
        cy.get('#alertBox-confirmBtn').should('exist').click();

        cy.get('#je_registerasset_btn').should('exist').click();
        cy.contains(/^Accrued$/).should('exist');
        cy.contains(/^Accrued$/).prev().find('input').should('be.checked');
        cy.get('#capexdetail_createsave_btn').click();
        cy.get('#alertBox-confirmBtn').should('exist').click();
    });
    it('45241 Test capex nextmonthpayment logic, created Capex should be paid', () => {
        // uncheck accrued
        cy.visit('taxx/admin/transtype/4524128');
        cy.get('#is_accrued-checkbox').should('exist').uncheck();

        cy.contains('Save').click();
        // Recreate JE by document
        cy.visit('taxx/clientgroup/4/entity/6/journal/new/4524101/');

        cy.get('[data-cy=docchooser_remark]')
            .should('exist').first().find('input')
            .should('exist')
            .should('have.value', '宴会場改修工事 test keyword1');

        cy.get('#entity-6-je-4524101-new-saveBtn').should('exist').click();
        cy.get('#alertBox-confirmBtn').should('exist').click();

        cy.get('#je_registerasset_btn').should('exist').click();

        cy.contains('This is a payment JE for previous month accrued.').should('exist');

        // make sure previous capex's next month payment has been changed paid 
        cy.contains('This is a payment JE for previous month accrued.').invoke('text').then((text) => {
            const number = text.replace(/\n/g,"").match(/\d/g).slice(0, 10).join('');
            cy.visit('/taxx/clientgroup/4/entity/6/capex/');
            
            cy.contains(number).should('exist').parent().find('td').first().next().find('div').click({force: true});

            cy.contains(/^Paid$/).should('exist');
            cy.contains(/^Paid$/).prev().find('input').should('be.checked');
        });
    });*/
})