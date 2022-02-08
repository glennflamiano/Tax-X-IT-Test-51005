Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('36565 Test Capex Judgment logic when creating Capex', () => {
    beforeEach(() => {
        cy.login();
    });
    it('Create Capex to test if Capex Judgment logic is Opex', () => {
        // change judge logic for Opex
        cy.visit('/taxx/admin/capexsetting');
        cy.get('#use_max_amount_checkbox')
            .should('exist')
            .check();
        cy.get('#capexjudge_capex_save_btn').click();
        cy.get('#alertBox-confirmBtn').should('exist').click();
        cy.visit('/taxx/clientgroup/4/entity/6/journal/3656532/');
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `36624 Capex TT`);
        cy.get('#je_registerasset_btn').should('exist').click();
        // confirm the asset is generated to Opex according the logic
        cy.get('#capex_judgement_result_select').should('exist').invoke('val').should('eq', '2');
    });
    it('Create Capex to test if asset account and productlife is right', () => {
        // add logic for Capex
        const keyword = String(new Date().getTime());
        cy.visit('/taxx/admin/capexsetting');
        cy.get('#use_max_amount_checkbox')
            .should('exist')
            .uncheck();
        cy.get('#capexjudge_individual_definition_area')
            .find('[data-cy=capexjudge_add_individualdefinition_item]').should('exist').click();
        cy.get('#capexjudge_individual_definition_area')
            .find('[data-cy=capexjudge_individualdefinition_table]')
            .find('tr').last().find('td').as('tds');
        cy.get('@tds').eq(0).find('input').type(keyword);
        cy.get('@tds').eq(1).find('select').select('200');
        cy.get('@tds').eq(2).find('input').check();
        cy.get('@tds').eq(3).find('input').type(10);
        cy.get('#capexjudge_capex_save_btn').click();
        cy.get('#alertBox-confirmBtn').should('exist').click();

        // create je to match the logic above
        cy.visit('/taxx/clientgroup/4/entity/6/journal/3656532/');
        cy.get('[data-cy=docchooser_remark]').first().find('input').should('exist').as('remark');
        cy.get('@remark').clear();
        cy.get('@remark').type(keyword);
        cy.contains('Save').click();
        cy.get('#alertBox-confirmBtn').should('exist').click();
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `36624 Capex TT`);

        // create asset and confirm the value
        cy.get('#je_registerasset_btn').should('exist').click();
        cy.get('#capex_judgement_result_select').should('exist').invoke('val').should('eq', '1');
        cy.get('#capex_asset_account_select').should('exist').invoke('val').should('eq', '200');
        cy.get('#capex_productlife_input').should('have.value', '10');
        cy.get('#capex_depreciableassettax_checkbox').should('be.checked');
        cy.visit('/taxx/admin/capexsetting');
        cy.get('#capexjudge_individual_definition_area')
            .find('[data-cy=capexjudge_delete_individualdefinition_item]').last().should('exist').click()
        cy.get('#capexjudge_capex_save_btn').click();
    });
});