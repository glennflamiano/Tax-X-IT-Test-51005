Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const TEST_COUNTERPARTY = '株式会社 JTB商事 Cypress Case TEST Row 2';

describe('45242 Capex Payee logic', () => {
    beforeEach(() => {
        cy.login();
    });
    it('45242 Capex Payee logic,  payee should be a new counterparty', () => {
        // make sure TT accrued is unchecked
        cy.visit('taxx/admin/transtype/4524128');
        cy.get('#is_accrued-checkbox').should('exist').uncheck();
        cy.get('#transtypepage-transtype-4524128-save-button').click();

        // create JE by document
        cy.visit('taxx/clientgroup/4/entity/6/journal/new/4524101/Items-1/');
        cy.get('#entity-6-je-4524101-new-saveBtn').should('exist').click();
        cy.get('#alertBox-confirmBtn').should('exist').click();

        // create Capex
        cy.get('#je_registerasset_btn').should('exist').click();
        cy.contains(TEST_COUNTERPARTY).should('exist');
        cy.get('#capexdetail_createsave_btn').click();
        cy.get('#alertBox-confirmBtn').should('exist').click();

        cy.wait(1000)
        cy.get('#capex_payee_select option')
            .contains(TEST_COUNTERPARTY)
            .invoke('val')
            .then((v) => {
                cy.get('#capex_payee_select').should('have.value', v);
                // cy.get('#capexdetail_createsave_btn').should('exist').click();

                // make sure the counterparty has been created
                cy.visit(`taxx/admin/counterparty/${v}`);
                cy.get('#counterparty_detail_name').should('have.value', TEST_COUNTERPARTY);

                // delete the created counter party
                cy.visit('taxx/admin/counterparty');

                cy.request({
                    method: 'delete',
                    url: `/webapi/v1/counterparty/${v}/`,
                    headers: {
                        Authorization: `Token ${window.localStorage.getItem('token')}`
                    }
                });
                cy.wait(1000)
                // make sure counterparty has been deleted
                cy.visit(`taxx/admin/counterparty/${v}`);
                cy.get('#counterparty_detail_name').should('not.exist');
            })

    });
});