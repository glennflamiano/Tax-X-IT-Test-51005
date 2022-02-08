Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('51001 Bank Statement JE Bulk', () => {
    beforeEach(() => {
        cy.clearCookies();
        //cy.reload();
        cy.login();
    });

    it('Visit Client first', () => {
    	//cy.login();
        cy.visit('/taxx', { timeout: 5000 });
        cy.screenshot('50852-000001');
    });

    it('Go to file manager then journal entry', () => {
    	//cy.login();
    	//cy.login();
    	cy.visit('/taxx');
    	cy.screenshot('50852-000002');
        cy.contains("Aubrey's Test Client Group", { timeout: 5000 }).click();
        cy.url().should('contain', '/clientgroup/4');
        //cy.contains("Company Aubrey").click();
        cy.visit("/taxx/clientgroup/4/entity/6/")
        cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.screenshot('50852-000003');

        //go to file manager for JE creation
        cy.contains("File manager", { timeout: 5000 }).click();
        //cy.visit("/taxx/clientgroup/4/entity/6/journal/")
        //cy.url().should('contain', '/journal/');
        cy.screenshot('50852-000004');
    });

    it('Create JE for Bank Statement', () => {
        //cy.login();
        //cy.wait(2000);
        //cy.login();
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.contains("File manager", { timeout: 5000 }).click();
        cy.contains("57387 Test File For JE Doc Selection", { timeout: 5000 }).click({force: true});
        cy.wait(2000);
        //cy.contains("Create JE").click();
        cy.get('button[id=entity-6-file-5738700-doc-5738701-createJeBtn]', { timeout: 5000 }).click();

        //transitions to JE creation screen
        cy.wait(2000)
        cy.url().should('contain', '/journal/new');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('32094 Bank Statement Matching Test');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('{enter}');
        cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).select('32094 Bank Statement Match Rule');
        cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).type('{enter}');

        //add departments and CT
        //debit section
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('{enter}');

        //credit section
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('{enter}');

        //click save
        //cy.get('button[id=entity-6-je-5738701-new-saveBtn]').contains('Save').click();
        cy.get('button').contains('Save', { timeout: 5000 }).click();
        cy.wait(500);

        //Click confirm
        cy.contains('OK', { timeout: 5000 }).click()
        
        //click save
        //cy.get('button[id=entity-6-je-5738701-new-saveBtn]').contains('Save').click();
        cy.get('button').contains('Save', { timeout: 5000 }).click();
        cy.wait(500);

        //Click OK
        cy.contains('OK', { timeout: 5000 }).click()
    });

    it('Create 2nd JE for Bank Statement', () => {
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.contains("File manager", { timeout: 5000 }).click();
        cy.contains("57387 Test File For JE Doc Selection", { timeout: 5000 }).click({force: true});
        cy.wait(2000);
        //cy.contains("Create JE").click();
        cy.get('button[id=entity-6-file-5738700-doc-5738701-createJeBtn]', { timeout: 5000 }).click();

        //transitions to JE creation screen
        cy.wait(2000)
        cy.url().should('contain', '/journal/new');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('32094 Bank Statement Matching Test');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('{enter}');
        cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).select('32094 Bank Statement Match Rule');
        cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).type('{enter}');

        //add departments and CT
        //debit section
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('{enter}');

        //credit section
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('{enter}');

        //click save
        //cy.get('button[id=entity-6-je-5738701-new-saveBtn]').contains('Save').click();
        cy.get('button').contains('Save', { timeout: 5000 }).click();
        cy.wait(500);

        //Click confirm
        cy.contains('OK', { timeout: 5000 }).click()
        
        //click save
        //cy.get('button[id=entity-6-je-5738701-new-saveBtn]').contains('Save').click();
        cy.get('button').contains('Save', { timeout: 5000 }).click();
        cy.wait(500);

        //Click OK
        cy.contains('OK', { timeout: 5000 }).click()
    });

    it('Create 3rd JE for Bank Statement', () => {
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.contains("File manager", { timeout: 5000 }).click();
        cy.contains("57387 Test File For JE Doc Selection", { timeout: 5000 }).click({force: true});
        cy.wait(2000);
        //cy.contains("Create JE").click();
        cy.get('button[id=entity-6-file-5738700-doc-5738701-createJeBtn]', { timeout: 5000 }).click();

        //transitions to JE creation screen
        cy.wait(2000)
        cy.url().should('contain', '/journal/new');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('32094 Bank Statement Matching Test');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('{enter}');
        cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).select('32094 Bank Statement Match Rule');
        cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).type('{enter}');

        //add departments and CT
        //debit section
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('{enter}');

        //credit section
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('{enter}');

        //click save
        //cy.get('button[id=entity-6-je-5738701-new-saveBtn]').contains('Save').click();
        cy.get('button').contains('Save', { timeout: 5000 }).click();
        cy.wait(500);

        //Click confirm
        cy.contains('OK', { timeout: 5000 }).click()
        
        //click save
        //cy.get('button[id=entity-6-je-5738701-new-saveBtn]').contains('Save').click();
        cy.get('button').contains('Save', { timeout: 5000 }).click();
        cy.wait(500);

        //Click OK
        cy.contains('OK', { timeout: 5000 }).click()
    });

    it('Save bulk journal entry', () => {
        cy.visit('/taxx', { timeout: 5000 });
        cy.contains("Aubrey's Test Client Group", { timeout: 5000 }).click({force: true});
        //cy.url().should('contain', '/clientgroup/4');
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        //cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.contains("File manager", { timeout: 5000 }).click();
        cy.contains("57387 Test File For JE Doc Selection", { timeout: 10000 }).click({force: true});
        //cy.wait(2000);
        cy.get('button').contains('Save', { timeout: 5000 }).click({force: true});
    });

    it('Approve the journal entries', () => {
        cy.visit('/taxx');
        cy.contains("Aubrey's Test Client Group", { timeout: 5000 }).click();
        //cy.url().should('contain', '/clientgroup/4');
        //cy.contains("Company Aubrey", { timeout: 5000 }).click();
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        cy.url().should('contain', '/clientgroup/4/entity/6/');

        //go to file manager for JE creation
        cy.wait(1000);
        cy.contains("Journal entry", { timeout: 5000 }).click({force: true});
        cy.wait(1000);
        cy.contains("Batch operation", { timeout: 5000 }).click({force: true});
        cy.wait(10000);
        cy.contains("57387 Test File For JE Doc Selection", { timeout: 5000 }).click({force: true});
        cy.wait(1000);
        cy.contains("Approve all", { timeout: 5000 }).click({force: true});
    });
})