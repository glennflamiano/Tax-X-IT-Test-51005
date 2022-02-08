Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});
describe('36555 Test Capex Merge', () => {
    beforeEach(() => {
        cy.login();
    });
    it('Merge Capex Asset, after merge then restore merged', () => {
        cy.visit('/taxx/clientgroup/4/entity/6/capex/');
        // select asset which need to be merged
        cy.get(`#capex_3656536_checkbox`).should('exist').check();
        cy.get(`#capex_3656540_checkbox`).should('exist').check();

        cy.get('#mergeasset_group_btn').should('exist').click();

        // go to creating merge asset page
        cy.get('#capex_detail_comments_table').should('exist').find('tr').should('have.length', 3);

        cy.get('#capexdetail_createsave_btn').click({force: true});
        cy.get('#alertBox-confirmBtn').click();

        cy.wait(1000);
        // judge according merged asset code
        cy.get('#capex_detail_asset_code').should('exist').invoke('text').then((text) => {
            cy.visit('/taxx/clientgroup/4/entity/6/capex/');
            cy.wait(500);
            // confirm original assets are merged
            cy.contains(text).parent().find('td').should('not.contain', '3656536');
            cy.contains(text).parent().find('td').should('not.contain', '3656540');

            // restore the merged asset
            cy.contains(text).parent().find('td').should('contain', 'Restore');
            cy.wait(500);
            cy.contains(text).parent().get(`#asset_${text}_restore_btn`).click();
            cy.get('#confirmBox-confirmBtn').should('exist').click();

            // confirm original assets are back after restoring
            cy.get('table').find('td').should('contain', '3656536');
            cy.get('table').find('td').should('contain', '3656540');
        })
    });
});