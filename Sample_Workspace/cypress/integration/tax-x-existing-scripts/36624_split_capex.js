Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

// TO DO We need add a task to fix this test
describe('36624 Test Capex Asset Split', () => {
    beforeEach(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.visit('taxx/clientgroup/4/entity/6/capex/3662408/');
        cy.wait(500);
    });
    it('Split Capex Asset', () => {
        cy.scrollTo('bottom');
        // Add comment
        cy.get('#capex_add_comment').should('exist').click();
        cy.get('#capex_detail_comments_table').should('exist').find('tr').last().find('input').first().type('Comment2');
        cy.get('#capex_detail_comments_table').should('exist').find('tr').last().find('input').last().type('0');
        cy.contains('Save').parent().click();

        cy.get('#alertBox-confirmBtn').should('exist').click();
        // go to split asset creating page and save it
        cy.get('#capex_detail_comments_table').should('exist').find('tr').last().contains(/^Add asset/).parent().click()
        cy.wait(500);
        cy.scrollTo('top');
        cy.contains('Create').parent().click();
        cy.get('#alertBox-confirmBtn').should('exist').click();
        cy.wait(500);
        cy.scrollTo('top');
        // judge according split asset code
        cy.get('#capex_detail_asset_code').should('exist').invoke('text').then((text) => {
            cy.visit('taxx/clientgroup/4/entity/6/capex/3662408/');
            cy.contains('CAPEX一覧表 (CAPEX list)').should('exist');
            cy.scrollTo('bottom');
            cy.get('#capex_detail_comments_table')
                .should('exist')
                .find('a')
                .last().find('div')
                .should('have.text', text)
            // go to capex list to confirm
            cy.visit(`taxx/clientgroup/4/entity/6/capex/`);
            cy.contains('Test Split Asset').should('exist');
            cy.contains('200 建物').should('exist');
            // split asset exist then restore it
            cy.get('table').should('exist').find('td').should('contain', text);
            cy.contains(text).parent().find('td').should('contain', 'Restore');

            cy.contains(text).parent().get(`#asset_${text}_restore_btn`).should('exist').clickAttached();
            cy.get('#confirmBox-confirmBtn').should('exist').clickAttached();
            cy.contains('Merge Asset 1 Comment').should('exist');
            // confirm restore successfully
            cy.get('table').find('td').should('not.contain', text);
        })
    });
});
