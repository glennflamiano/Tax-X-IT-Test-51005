Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('51005 Bank Statement JE Bulk', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.login();
    });

    it('Create Entity', () => {
        //cy.login();
        cy.visit('/taxx/admin');
        cy.screenshot('51005-000001');
        cy.contains('Client group / Entity', {timeout: 5000}).click();

        //remove existing client first
        cy.screenshot('51005-000002');
        cy.contains('Create client group', {timeout: 10000}).click();
        cy.screenshot('51005-000003');
        cy.get('input[id=undefined-popup-create-button]', {timeout: 5000}).type('Client-51005');
        cy.get('button[id=undefined-popup-create-button]', {timeout: 5000}).click();
        //cy.contains('Create').last().click();
        cy.screenshot('51005-000004');

        //add company
        cy.wait(2000);
        cy.contains("Client-51005", {timeout: 5000}).click();
        cy.contains("Add", {timeout: 5000}).click();
        cy.screenshot('51005-000005');
        cy.contains("Create new entity", {timeout: 5000}).click();
        cy.screenshot('51005-000006');

        //fill in information
        cy.get('input[id=entityadminpage-entity-new-name-input]', {timeout: 5000}).type('Client-51005 Company EN');
        cy.get('input[id=entityadminpage-entity-new-jpnname-input]', {timeout: 5000}).type('Client-51005 Company JP');
        cy.get('input[id=entityadminpage-entity-new-description-input]', {timeout: 5000}).type('Test description');
        //entityadminpage-entity-new-tenant-input
        cy.get('input[id=entityadminpage-entity-new-tenant-input]', {timeout: 5000}).type('Test');
        //cy.get('select[id=entityadminpage-entity-new-client-select]').select('Client-51005');
        cy.get('input[id=entityadminpage-entity-new-periodend-accountinfo-input]', {timeout: 5000}).type('0301');
        cy.get('select[id=entityadminpage-entity-new-numCloseBook-accountinfo-select]', {timeout: 5000}).select('2');
        cy.get('select[id=entityadminpage-entity-new-taxStatus-accountinfo-select]', {timeout: 5000}).select('Taxable');
        cy.screenshot('51005-000007');
        //click register
        cy.contains("Register", {timeout: 5000}).click();

    });

    it('Go to Home page to find created entity', () => {
        //cy.login();
        cy.visit('/taxx');
        cy.contains("Client-51005", {timeout: 5000}).should('exist');
        cy.screenshot('51005-000008');
    });

    it('Create Transaction Type', () => {
        //cy.login();
        cy.visit('/taxx/admin');
        //cy.screenshot('51005-000002');
        cy.contains('Transaction types', {timeout: 5000}).click();
        cy.screenshot('51005-000009');
        cy.contains('Create', {timeout: 10000}).click();
        cy.screenshot('51005-000010');
        
        //input general information
        cy.get('input[id=transtypelist-transtype-crud-name-input]', {timeout: 5000}).type('Client-51005 transaction');
        cy.get('input[id=transtypelist-transtype-crud-description-input]', {timeout: 5000}).type('Client-51005 transaction rules');
        cy.screenshot('51005-000011');
        cy.get('button[id=transtypelist-transtype-crud-popup-create-button]', {timeout: 5000}).click();
        cy.screenshot('51005-000012');

        //edit the created transaction
        cy.contains('Client-51005 transaction', {timeout: 10000}).click();
        cy.screenshot('51005-000013');

        //goes to transaction type page
        // use * in attributes for contains in any part of attribute
        cy.get('input[id*=-description-input]', {timeout: 10000}).last().type('Client-51005 transaction description');
        cy.get('select[id*=-jedatetype-select]', { timeout: 10000 }).last().select('End of business year');
        cy.get('select[class*=sc-gSQFLo]', {timeout: 10000}).eq(1).select('Year End Operation');
        cy.screenshot('51005-000014');
        cy.get('i[id*=-addfirsttransaction-icon]', {timeout: 10000}).click()

        //add debit and credit part
        cy.get('input[id*=is_account_payable-checkbox]', {timeout: 10000}).check()
        
        //accounts payable part
        cy.get('input[class*=sc-khQegj]', {timeout: 10000}).eq(2).type('Unsettled transaction 51005');
        //cy.get('select[class*=sc-gSQFLo]', { timeout: 10000 }).eq(2).select('End of business year'); //fix this later
        cy.get('select[id*=transaction-undefined-counterparty-select]', { timeout: 10000 })
            .eq(0).select('支払先（当月支払） – Payee (This month payment)');
        cy.get('select[id*=transaction-undefined-counterparty-select]', { timeout: 10000 })
            .eq(1).select('支払先（当月支払） – Payee (This month payment)');

        cy.get('input[class*=sc-khQegj]', {timeout: 10000}).eq(3).type('Settled transaction 51005');
        cy.get('select[id*=transaction-undefined-counterparty-select]', { timeout: 10000 })
            .eq(2).select('支払先（当月支払） – Payee (This month payment)');
        cy.get('select[id*=transaction-undefined-counterparty-select]', { timeout: 10000 })
            .eq(3).select('支払先（当月支払） – Payee (This month payment)');

        //debit part
        cy.get('select[id*=-transaction-0-account-select]', { timeout: 10000 })
            .select('110 - 当座預金');
        //cy.get('select[id*=-transaction-0-subaccount-select]', { timeout: 10000 })
            //.select('Condition');
        cy.get('select[id*=-transaction-0-taxaccount-select]', { timeout: 10000 })
            .select('1 - 非課税仕入');
        cy.get('select[id*=-transaction-0-counterparty-select]', { timeout: 10000 })
            .select('支払先（当月支払） – Payee (This month payment)');
        cy.get('input[id*=equation-input-1]', {timeout: 10000}).type('round(_num)');
        cy.get('input[id*=-transaction-0-taxequation-input]', {timeout: 10000}).type('round(_num)');
        cy.get('select[id*=-transaction-0-department-select]', { timeout: 10000 })
            .select('100 - 営業者');

        //credit part
        cy.get('select[id*=-transaction-1-account-select]', { timeout: 10000 })
            .select('110 - 当座預金');
        //cy.get('select[id*=-transaction-1-subaccount-select]', { timeout: 10000 })
            //.select('Condition');
        cy.get('select[id*=-transaction-1-taxaccount-select]', { timeout: 10000 })
            .select('1 - 非課税仕入');
        cy.get('select[id*=-transaction-1-counterparty-select]', { timeout: 10000 })
            .select('支払先（当月支払） – Payee (This month payment)');
        cy.get('input[id*=equation-input-2]', {timeout: 10000}).type('round(_num)');
        cy.get('input[id*=-transaction-1-taxequation-input]', {timeout: 10000}).type('round(_num)');
        cy.get('select[id*=-transaction-1-department-select]', { timeout: 10000 })
            .select('100 - 営業者');

        //cy.get('select[class*=sc-gSQFLo]', {timeout: 10000}).eq(5).select('contains');
        //cy.get('select[class*=sc-gSQFLo]', {timeout: 10000}).eq(6).select('contains');
        //cy.get('select[class*=sc-gSQFLo]', {timeout: 10000}).eq(7).select('contains');
        //cy.get('select[class*=sc-gSQFLo]', {timeout: 10000}).eq(8).select('contains');

        cy.get('select[id*=-primaryDoc-select]', {timeout: 10000}).select('銀行取引明細書 (Bank Statement)');
        cy.screenshot('51005-000015');

        //click save
        cy.get('button[id*=-save-button]', {timeout: 10000}).eq(1).click({force: true});
        cy.contains('OK', {timeout: 10000}).click({force: true});
    });

    it('Check if the created transaction exists', () => {
        cy.visit('/taxx/admin');
        cy.contains('Transaction types', {timeout: 5000}).click();
        cy.contains('Client-51005 transaction', {timeout: 10000});
    });

    it('Create JE for Bank Statement', () => {
        //cy.login();
        //cy.wait(2000);
        //cy.login();
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.screenshot('51005-000016');
        cy.contains("File manager", { timeout: 5000 }).click();
        cy.screenshot('51005-000017');
        cy.contains("57387 Test File For JE Doc Selection", { timeout: 5000 }).click({force: true});
        cy.wait(2000);
        cy.screenshot('51005-000018');
        //cy.contains("Create JE").click();
        cy.get('button[id=entity-6-file-5738700-doc-5738701-createJeBtn]', { timeout: 5000 }).click();

        //transitions to JE creation screen
        cy.wait(2000)
        cy.screenshot('51005-000019');
        cy.url().should('contain', '/journal/new');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('Client-51005 transaction');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('{enter}');
        //cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).select('32094 Bank Statement Match Rule');
        cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).type('{enter}');
        cy.screenshot('51005-000020');

        //set to settled
        cy.get('select[data-cy*=settlement-status-select]', {timeout: 5000}).select('Settled');

        //add departments and CT
        //debit section
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('{enter}');
        cy.screenshot('51005-000021');

        //credit section
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('{enter}');
        cy.screenshot('51005-000022');

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
        cy.screenshot('51005-000023');
    });

    it('Create 2nd JE for Bank Statement', () => {
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.contains("File manager", { timeout: 5000 }).click();
        cy.screenshot('51005-000024');
        cy.contains("57387 Test File For JE Doc Selection", { timeout: 5000 }).click({force: true});
        cy.wait(2000);
        cy.screenshot('51005-000025');
        //cy.contains("Create JE").click();
        cy.get('button[id=entity-6-file-5738700-doc-5738701-createJeBtn]', { timeout: 5000 }).click();

        //transitions to JE creation screen
        cy.wait(2000)
        cy.screenshot('51005-000026');
        cy.url().should('contain', '/journal/new');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('Client-51005 transaction');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('{enter}');
        //cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).select('32094 Bank Statement Match Rule');
        cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).type('{enter}');
        cy.screenshot('51005-000027');

        //set to settled
        cy.get('select[data-cy*=settlement-status-select]', {timeout: 5000}).select('Settled');

        //add departments and CT
        //debit section
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('{enter}');
        cy.screenshot('51005-000028');

        //credit section
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('{enter}');
        cy.screenshot('51005-000029');

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
        cy.screenshot('51005-000030');
    });

    it('Create 3rd JE for Bank Statement', () => {
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.contains("File manager", { timeout: 5000 }).click();
        cy.screenshot('51005-000031');
        cy.contains("57387 Test File For JE Doc Selection", { timeout: 5000 }).click({force: true});
        cy.wait(2000);
        cy.screenshot('51005-000032');
        //cy.contains("Create JE").click();
        cy.get('button[id=entity-6-file-5738700-doc-5738701-createJeBtn]', { timeout: 5000 }).click();

        //transitions to JE creation screen
        cy.wait(2000)
        cy.screenshot('51005-000033');
        cy.url().should('contain', '/journal/new');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('Client-51005 transaction');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', { timeout: 5000 }).type('{enter}');
        //cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).select('32094 Bank Statement Match Rule');
        cy.get('select[data-cy=je-docchooser-rule]', { timeout: 5000 }).type('{enter}');
        cy.screenshot('51005-000034');

        //set to settled
        cy.get('select[data-cy*=settlement-status-select]', {timeout: 5000}).select('Settled');

        //add departments and CT
        //debit section
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input2"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input11"]', { timeout: 5000 }).type('{enter}');
        cy.screenshot('51005-000035');

        //credit section
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('Test TK Department');
        cy.get('input[data-cy="transaction-input5"]', { timeout: 5000 }).type('{enter}');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('000');
        cy.get('input[data-cy="transaction-input14"]', { timeout: 5000 }).type('{enter}');
        cy.screenshot('51005-000036');

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
        cy.screenshot('51005-000037');
    });

    it('Save bulk journal entry', () => {
        cy.visit('/taxx', { timeout: 5000 });
        cy.contains("Aubrey's Test Client Group", { timeout: 5000 }).click({force: true});
        cy.screenshot('51005-000038');
        //cy.url().should('contain', '/clientgroup/4');
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        //cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.contains("File manager", { timeout: 5000 }).click();
        cy.screenshot('51005-000039');
        cy.contains("57387 Test File For JE Doc Selection", { timeout: 10000 }).click({force: true});
        cy.screenshot('51005-000040');
        cy.get('button').contains('Save', { timeout: 5000 }).click({force: true});
        cy.screenshot('51005-000041');
    });

    it('Approve the journal entries', () => {
        cy.visit('/taxx');
        cy.contains("Aubrey's Test Client Group", { timeout: 5000 }).click();
        cy.screenshot('51005-000042');
        //cy.url().should('contain', '/clientgroup/4');
        //cy.contains("Company Aubrey", { timeout: 5000 }).click();
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.screenshot('51005-000043');

        //go to file manager for JE creation
        cy.wait(1000);
        cy.contains("Journal entry", { timeout: 5000 }).click({force: true});
        cy.screenshot('51005-000044');
        cy.wait(1000);
        cy.contains("Batch operation", { timeout: 5000 }).click({force: true});
        cy.screenshot('51005-000045');
        cy.wait(10000);
        cy.contains("57387 Test File For JE Doc Selection", { timeout: 5000 }).click({force: true});
        cy.screenshot('51005-000046');
        cy.wait(1000);
        cy.contains("Approve all", { timeout: 5000 }).click({force: true});
        cy.wait(10000);
        cy.screenshot('51005-000047');
    });

    it('Check if the journal entries are approved', () => {
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        cy.wait(1000);
        cy.contains("Journal entry", { timeout: 5000 }).click({force: true});
        cy.wait(1000);
        cy.contains("Batch operation", { timeout: 5000 }).click({force: true});
        cy.wait(10000);
        cy.contains("57387 Test File For JE Doc Selection", { timeout: 5000 }).should('not.exist');
        cy.wait(1000);
        cy.screenshot('51005-000048');
    });

    it('Upload to OBC', () => {
        cy.visit("/taxx/clientgroup/4/entity/6/", { timeout: 5000 })
        cy.wait(1000);
        cy.contains("Journal entry", { timeout: 5000 }).click({force: true});
        cy.wait(1000);
        cy.contains("Upload to OBC", { timeout: 5000 }).click({force: true});
        cy.wait(1000);
        cy.contains("Yes", { timeout: 5000 }).click({force: true});
    });
})