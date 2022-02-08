Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});


describe('48128 counterparty detail document issuer', () => {
//Discuss at https://dev.azure.com/kpmgjp-prod-001/kpmgjp-kit-projects/_workitems/edit/64538
// For https://dev.azure.com/kpmgjp-prod-001/kpmgjp-kit-projects/_workitems/edit/64127
// Save and delete button was blocked while uploading, 
// and uploading need really a time ,so this case shall be not tested automatically

    // beforeEach(() => {
    //     cy.login();
    //     cy.wait(500);
    // });
    // it('Show Counterparty key in the breadcrumb', () => {
    //     // got to counterparty detail page with id 1
    //     cy.visit('taxx/admin/counterparty/1/');
    //     cy.get('[href="/taxx/admin/counterparty/1/"]').contains('1').should('exist')
    // });

    // it('Remove test chips if exist', () => {
    //     // confirm Bank Statement is PDF, so it can be included in issuer doctype list
    //     cy.visit('taxx/admin/doctype/1/');
    //     cy.get('[data-cy=doctype-format-select]').should('exist').select('pdf');
    //     cy.get('[data-cy=doctype-save-button]').should('exist').click();
    //     cy.contains('OK').click();

    //     cy.visit('taxx/admin/counterparty/1/');

    //     cy.get(':nth-child(12) > [colspan="3"]').children().children().next().then(($div) => {
    //         if ($div.find('div').find('span').text().includes('銀行取引明細書 (Bank Statement)')) {
    //             cy.get(':nth-child(12) > [colspan="3"]').children().children().next().contains('銀行取引明細書 (Bank Statement)').next().click(); 
    //         }
    //     });
    //     cy.get(':nth-child(13) > [colspan="3"]').children().children().next().then(($div) => {
    //         if ($div.find('div').find('span').text().includes('Client Group 1')) {
    //             cy.get(':nth-child(13) > [colspan="3"]').children().children().next().contains('Client Group 1').next().click(); 
    //         }
    //     });
    //     cy.get('#counterparty-1-save-btn').click();
    //     cy.contains('OK').click();

    //     cy.visit('taxx/admin/counterparty');
    //     cy.get('[data-cy=三井住友銀行-documentIssuer]').should('not.exist');

    // });


    // it('Can add Document type', () => {
    //     cy.visit('taxx/admin/counterparty/1/');
    //     // add a document type
    //     cy.get(':nth-child(12) > [colspan="3"]').children().children().contains('銀行取引明細書 (Bank Statement)').click({force: true});
    //     cy.get(':nth-child(12) > [colspan="3"]').children().children().next().contains('銀行取引明細書 (Bank Statement)').should('exist'); 
    //     // save added document type and reload
    //     cy.get('#counterparty-1-save-btn').click();
    //     cy.contains('OK').click();

    //     cy.get(':nth-child(12) > [colspan="3"]').children().children().next().contains('銀行取引明細書 (Bank Statement)').should('exist'); 

    // });

    // it('Can add Client Group', () => {
    //     cy.visit('taxx/admin/counterparty/1/');
    //     // add a client group
    //     cy.get(':nth-child(13) > [colspan="3"]').children().children().contains('Client Group 1').click({force: true});
    //     cy.get(':nth-child(13) > [colspan="3"]').children().children().next().contains('Client Group 1').should('exist'); 
    //     // save added client group and reload
    //     cy.get('#counterparty-1-save-btn').click();
    //     cy.contains('OK').click();

    //     cy.get(':nth-child(13) > [colspan="3"]').children().children().next().contains('Client Group 1').should('exist');

    //     cy.visit('taxx/admin/counterparty/');
    //     cy.get('[data-cy=三井住友銀行-documentIssuer]').should('exist');

    // });

    // it('Reset the counterparty data to confirm there is no other effect', () => {
    //     cy.visit('taxx/admin/counterparty/1/');

    //     cy.get(':nth-child(12) > [colspan="3"]').children().children().next().then(($div) => {
    //         if ($div.find('div').find('span').text().includes('銀行取引明細書 (Bank Statement)')) {
    //             cy.get(':nth-child(12) > [colspan="3"]').children().children().next().contains('銀行取引明細書 (Bank Statement)').next().click(); 
    //         }
    //     });
    //     cy.get(':nth-child(13) > [colspan="3"]').children().children().next().then(($div) => {
    //         if ($div.find('div').find('span').text().includes('Client Group 1')) {
    //             cy.get(':nth-child(13) > [colspan="3"]').children().children().next().contains('Client Group 1').next().click(); 
    //         }
    //     });
    //     cy.get('#counterparty-1-save-btn').click();
    //     cy.contains('OK').click();

    //     cy.visit('taxx/admin/counterparty/');
    //     cy.get('[data-cy=三井住友銀行-documentIssuer]').should('not.exist');

    // });
});