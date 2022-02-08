Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('38873 (Hannah) Payment Schedule Tax Term Calculations', () => {
    beforeEach(() => {
        // Create payment schedule for each test
        cy.login();
        cy.visit('taxx/clientgroup/1/entity/1/file/3887300/');
        cy.wait(2000);
        cy.contains('Create JE').parent().click();
        cy.wait(2000);
        cy.contains('Save').clickAttached();
        cy.contains('OK').click();
        cy.contains('View payment schedule').parent().click();
        cy.wait(3000);
    });
    it('38873.1b Tax values can be grabbed from primary doc and calculated', () => {
        // Check values from primary doc
        // tax type, tax rate %, total amount, tax exempt amount, and tax amount
        cy.get('select').first().should('have.value', '2'); // Consumption tax rate type 'Identify tax rate when depreciating'
        cy.get('select').last().should('have.value', '10'); // Consumption tax rate 10%

        // tax exempt amount = doc std item total amount -  doc std item tax amount
        cy.get('[class="row-number"]').first().next().should('contain', '1,100,000');
        cy.get('[class="row-number"]').first().next().next().should('contain', '1,010,000');
        cy.get('[class="row-number"]').first().next().next().next().should('contain', '90,000');

        cy.contains('Delete').click();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.contains('OK').click();
    });
    it('38873.1 Tax values can be calculated properly after tax exempt amount edit', () => {
        // tax exempt amount (with valid tax type and % selected)
        // Check total amount, tax exempt amount, and tax amount
        cy.contains('Save').clickAttached(); // Updates to calculations rather than doc items
        cy.contains('OK').click();
        cy.get('select').first().should('have.value', '2'); // Consumption tax rate type 'Identify tax rate when depreciating'
        cy.get('select').last().should('have.value', '10'); // Consumption tax rate 10%

        // Amounts should not be recalculated when user not edit any of them
        cy.get('[class="row-number"]').first().next().should('contain', '1,100,000');
        cy.get('[class="row-number"]').first().next().next().should('contain', '1,010,000');
        cy.get('[class="row-number"]').first().next().next().next().should('contain', '90,000');

        // Edit tax exempt amount
        cy.contains('Edit').clickAttached();
        cy.get('[class="row-number"]').first().next().next().type('{selectall}{backspace}500000');
        cy.contains('Save').clickAttached();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.contains('OK').click();

        // Total amount: 'Tax exempt amount' + 'tax amount'
        // Tax exempt amount is the same
        // Tax amount: 'Tax exempt amount' * tax rate
        cy.get('[class="row-number"]').first().next().should('contain', '550,000');
        cy.get('[class="row-number"]').first().next().next().should('contain', '500,000');
        cy.get('[class="row-number"]').first().next().next().next().should('contain', '50,000');

        cy.contains('Delete').click();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.contains('OK').click();
    });
    it('38873.2 Tax values can be calculated properly after total amount edit', () => {
        // Edit total amount and tax exempt amount (with valid tax type and % selected)
        cy.contains('Save').clickAttached(); // Updates to calculations rather than doc items
        cy.contains('OK').click();
        cy.get('select').first().should('have.value', '2'); // Consumption tax rate type 'Identify tax rate when depreciating'
        cy.get('select').last().should('have.value', '10'); // Consumption tax rate 10%

        // Amounts should not be recalculated when user not edit any of them
        cy.get('[class="row-number"]').first().next().should('contain', '1,100,000');
        cy.get('[class="row-number"]').first().next().next().should('contain', '1,010,000');
        cy.get('[class="row-number"]').first().next().next().next().should('contain', '90,000');

        // Edit total amount
        cy.contains('Edit').clickAttached();
        cy.get('[class="row-number"]').first().next().type('{selectall}{backspace}500000');
        cy.contains('Save').clickAttached();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.contains('OK').click();

        // No changes because tax exempt amount takes priority
        cy.get('[class="row-number"]').first().next().should('contain', '1,111,000');
        cy.get('[class="row-number"]').first().next().next().should('contain', '1,010,000');
        cy.get('[class="row-number"]').first().next().next().next().should('contain', '101,000');

        // Edit total amount and tax exempt amount (with 0 tax % selected)
        cy.contains('Edit').clickAttached();
        cy.get('select').last().select('0%').should('have.value', '0');
        cy.get('[class="row-number"]').first().next().type('{selectall}{backspace}500000');
        cy.get('[class="row-number"]').first().next().next().type('{selectall}{backspace}600000');
        cy.contains('Save').clickAttached();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.contains('OK').click();

        // Tax exempt amount takes priority
        cy.get('[class="row-number"]').first().next().should('contain', '600,000');
        cy.get('[class="row-number"]').first().next().next().should('contain', '600,000');
        cy.get('[class="row-number"]').first().next().next().next().should('contain', '0');

        // Edit total amount and tax exempt amount (with no tax type selected)
        cy.contains('Edit').clickAttached();
        cy.get('select').first().select('Do not identify tax rate').should('have.value', '0');
        cy.get('[class="row-number"]').first().next().type('{selectall}{backspace}500000');
        cy.get('[class="row-number"]').first().next().next().type('{selectall}{backspace}600000');
        cy.contains('Save').clickAttached();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.contains('OK').click();

        // Total amount takes priority
        cy.get('[class="row-number"]').first().next().should('contain', '500,000');
        cy.get('[class="row-number"]').first().next().next().should('contain', '0');
        cy.get('[class="row-number"]').first().next().next().next().should('contain', '0');

        cy.contains('Delete').click();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.contains('OK').click();
    });

});
