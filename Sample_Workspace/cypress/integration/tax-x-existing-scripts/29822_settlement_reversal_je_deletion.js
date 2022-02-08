Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const parent_url = 'taxx/clientgroup/1/entity/1/journal/2982200/'
describe('29822 (Hannah) Delete Settlement Reversal Journal Entry and Unsettled Parent', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(parent_url)
        cy.contains('Journal entry 2982200').should('exist')

    })
    it('29822.1 Can create and then delete settlement reversal journal entry', () => {

        // Check Unsettled Parent Journal Entry
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Test-Unsettled`);
        cy.get('[data-cy="settlement-status-select"]').should('contain', 'Unsettled');

        // Create Settlement Reversal Journal Entry
        cy.contains('Settle JE').should('exist').click();
        cy.contains('Settle JE').should('not.exist');


        // Check Settlement Reversal Journal Entry
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Test-Settled`);
        cy.contains('Settled (changed)').should('exist');

        // Add Supporting Document
        cy.get('a').filter(':contains("Select document")').last().should('exist').click()
        cy.contains('File name').should('exist').next().type('27462')
        cy.contains('27462 Bank Statement').should('exist').clickAttached();
        cy.contains("2021/02/14").clickAttached();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.get('#kitui-popup-window-grey-bg').should('not.be.visible')
        cy.contains('Select supporting document to save this JE').should('not.be.visible');
        cy.contains('Save').clickAttached();
        cy.get('#alertBox-confirmBtn').last().click();

        cy.url().then(url => {
            let child_url = url;
            child_url = child_url.split('taxx/')[1];
            child_url = 'taxx/' + child_url;
            cy.wrap(child_url).as('child_url');
        });

        // Check Linked Parent Journal Entry
        cy.scrollTo('bottom');
        cy.contains('JE Date').should('exist').parent().parent().parent().parent().within((el) => {
            cy.contains('2982200').should('exist');
        });

        cy.screenshot('Saved_Reversal_JE_1');

        // Check Updated Unsettled Parent Journal Entry
        cy.visit(parent_url)
        cy.contains('Journal entry 2982200').should('exist')
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Test-Unsettled`);
        cy.contains('Settled (changed)').should('exist');
        cy.scrollTo('bottom');
        cy.contains('JE Date').should('exist');

        // Delete Settlement Reversal Journal Entry
        cy.get('@child_url').then(child_url => {
            cy.visit(child_url);
        });

        cy.contains('Delete').clickAttached();
        cy.contains('Linked journal entry will also be deleted').should('not.be.visible');
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.get('#alertBox-confirmBtn').last().click();
        cy.contains('Batch operation').should('exist')

        // Check That The Journal Entry was Deleted
        cy.visit(parent_url)
        cy.contains('Journal entry 2982200').should('exist')
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Test-Unsettled`);
    })

    it('29822.2 Can create settlement reversal je and then delete parent je',()=>{
        
        // Create Settlement Reversal Journal Entry
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Test-Unsettled`);
        cy.contains('Settle JE').should('exist').click();
        cy.contains('Settle JE').should('not.exist');

        // Check Settlement Reversal Journal Entry
        cy.contains('Journal entry link').should('exist');

        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Test-Settled`);
        cy.contains('Settled (changed)').should('exist');

        // Add Supporting Document
        cy.get('a').filter(':contains("Select document")').last().should('exist').click()
        cy.contains('File name').should('exist').next().type('27462')
        cy.contains('27462 Bank Statement').should('exist').clickAttached();
        cy.contains("2021/02/14").clickAttached();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.get('#kitui-popup-window-grey-bg').should('not.be.visible')
        cy.contains('Save').clickAttached();
        cy.get('#alertBox-confirmBtn').last().click();

        cy.url().then(url => {
            let child_url = url;
            child_url = child_url.split('taxx/')[1];
            child_url = 'taxx/' + child_url;
            cy.wrap(child_url).as('child_url');
        });

        // Check Linked Parent Journal Entry
        cy.scrollTo('bottom');
        cy.contains('JE Date').should('exist').parent().parent().parent().parent().within((el) => {
            cy.contains('2982200').should('exist');
        })

        cy.screenshot('Saved_Reversal_JE_2');

        cy.visit(parent_url)
        cy.contains('Journal entry 2982200').should('exist')
        cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', `Test-Unsettled`);
        cy.contains('Settled (changed)').should('exist');
        cy.scrollTo('bottom');
        cy.contains('JE Date').should('exist');

        // Delete Parent Unsettled Journal Entry
        cy.contains('Delete').clickAttached();
        cy.contains('Linked journal entry will also be deleted').should('exist');
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.get('#alertBox-confirmBtn').last().click();

        // Check That Both Journal Entries are Deleted
        cy.contains('Next').should('not.exist');
        cy.contains('2982200').should('not.exist');

        cy.get('@child_url').then(child_url => {
            cy.visit(child_url);
        });

        cy.contains('Test-Settled').should('not.be.visible');
    })

});
