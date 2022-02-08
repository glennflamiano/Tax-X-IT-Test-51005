let url = null;
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});
describe('41596 JE remark per row for multiple documents', () => {
    beforeEach(() => {
        cy.login();
    });
    it('Create JE with multiple documents', () => {
        cy.visit('taxx/clientgroup/4/entity/6/journal/new/');
        // add first document
        cy.contains('Select document').should('exist').click();

        // select document
        cy.contains('File name').should('exist').next().type('Document For Multiple One Invoice');
        cy.contains('Document For Multiple One Invoice').should('exist');
        cy.get('[data-cy=4159600_tile_click_area]').parent().children().should('have.length', 1);

        cy.contains('Test1 One Invoice').clickAttached();
        cy.get('#confirmBox-confirmBtn').clickAttached();

        cy.wait(2000)
        cy.get('#kitui-popup-window-grey-bg').should('not.exist');
        // select TT
        cy.get('input[data-test-id="dropdown-input-field-je-transaction-type-0"]').click();
        cy.contains(`Rule For Document One`).should('exist').click();
        // check the remark
        cy.get('input[data-cy=docchooser_remark]').should('have.value', 'Invoice Descroption Test One One One');

        // add second document
        cy.contains('Principal document').next().should('exist').click();
        cy.get('a').filter(':contains("Select document")').last().should('exist').click();

        cy.contains('File name').should('exist').next().type('Document For Multiple Two Another');
        cy.contains('Document For Multiple Two Another').should('exist');
        cy.get('[data-cy=4238900_tile_click_area]').parent().children().should('have.length', 1);
        cy.contains("Test2 Twon In").clickAttached();

        cy.get('#confirmBox-confirmBtn').clickAttached();
        cy.wait(2000)
        cy.get('#kitui-popup-window-grey-bg').should('not.exist');

        cy.get('input[data-test-id="dropdown-input-field-je-transaction-type-1"]').click();
        cy.contains(`Rule For Document Two`).should('exist').click();
        cy.get('input[data-cy=docchooser_remark]').last().should('have.value', '三井住友銀行');

        // add third document
        cy.contains('Principal document').next().should('exist').click();
        cy.get('a').filter(':contains("Select document")').last().should('exist').click();
        cy.contains('File name').should('exist').next().type('File For Capex');
        cy.get('[data-cy=3656500_tile_click_area]').parent().children().should('have.length', 1);
        cy.contains('File For Capex').should('exist');

        cy.get('#kitui-popup-window-grey-bg').children().contains("Test2").clickAttached();
        cy.get('#confirmBox-confirmBtn').click();
        cy.wait(2000)
        cy.get('#kitui-popup-window-grey-bg').should('not.exist');
        cy.contains('38873 tax%');
        cy.get('input[data-cy=docchooser_remark]').last().type('111');
        cy.get('input[data-test-id="dropdown-input-field-je-transaction-type-2"]').click();
        cy.contains(`36624 Capex TT`).clickAttached();
        cy.get('input[data-cy=docchooser_remark]').last().should('have.value', '');
        cy.get('input[data-cy=docchooser_remark]').last().clear()
            .type('manually add ramark and is over 200 length'.repeat(10)).then(() => {
                cy.get('input[data-cy=docchooser_remark]').last().should(($ipt) => {
                    expect($ipt.attr('value'))
                        .eq('manually add ramark and is over 200 length'.repeat(10).substring(0, 200 - '36624 Capex TT '.length));
                });
            });


        cy.contains('Save').clickAttached();
        cy.get('#alertBox-confirmBtn').click({ force: true });

        cy.url().then(url => {
            const urlArr = url.split('/');
            const jeId = urlArr[urlArr.length - 2];
            // keep this link because this link will be sent from backend in user situation
            cy.visit(`/taxx/clientgroup/4/entity/6/journal/?je_ids=${jeId}`);

        });


        // Check in JE list page
        cy.url().should('contains', 'je_ids=');

        cy.get(':nth-child(3) > dd > .react-datepicker-wrapper > .react-datepicker__input-container > input')
        .should('exist').clear().type('2022/12/31');
       
        cy.get('[data-cy=transaction_tt_remark]').should('have.length', 3);
        cy.contains('Invoice Descroption Test One One One').should('exist');
        cy.contains('三井住友銀行').should('exist');
        cy.contains(
            'manually add ramark and is over 200 length'
                .repeat(10).substring(0, 200 - '36624 Capex TT '.length)
        ).should('exist');

    });

});