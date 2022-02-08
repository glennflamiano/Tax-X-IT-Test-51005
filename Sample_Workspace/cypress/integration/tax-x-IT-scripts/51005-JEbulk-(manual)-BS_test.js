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

    it('Visit Page', () => {
    	//cy.login();
        cy.visit('/taxx');
        cy.screenshot('51005-000001');
    });

    it('Create Entity', () => {
        //cy.login();
        cy.visit('/taxx/admin');
        cy.screenshot('51005-000002');
        cy.contains('Client group / Entity', {timeout: 5000}).click();

        //remove existing client first
        cy.screenshot('51005-000003');
        cy.contains('Create client group', {timeout: 10000}).click();
        cy.get('input[id=undefined-popup-create-button]', {timeout: 5000}).type('Client-51005');
        cy.get('button[id=undefined-popup-create-button]', {timeout: 5000}).click();
        //cy.contains('Create').last().click();
        cy.screenshot('51005-000004');

        //add company
        cy.wait(2000);
        cy.contains("Client-51005", {timeout: 5000}).click();
        cy.contains("Add", {timeout: 5000}).click();
        cy.contains("Create new entity", {timeout: 5000}).click();

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

        //click register
        cy.contains("Register", {timeout: 5000}).click();

    });

    it('Go to Home page to find created entity', () => {
        //cy.login();
        cy.visit('/taxx');
        cy.contains("Client-51005", {timeout: 5000}).should('exist');
    });

    it('Create Transaction Type', () => {
        //cy.login();
        cy.visit('/taxx/admin');
        //cy.screenshot('51005-000002');
        cy.contains('Transaction types', {timeout: 5000}).click();
        cy.contains('Create', {timeout: 5000}).click();
        
        //input general information
        cy.get('input[id=transtypelist-transtype-crud-name-input]', {timeout: 5000}).type('Client-51005 transaction');
        cy.get('input[id=transtypelist-transtype-crud-description-input]', {timeout: 5000}).type('Client-51005 transaction rules');
        cy.get('button[id=transtypelist-transtype-crud-popup-create-button]', {timeout: 5000}).click();

        //edit the created transaction
        cy.contains('Client-51005 transaction', {timeout: 10000}).click();

        //goes to transaction type page
        cy.get('input[id=transtypepage-transtype-4524158-description-input]', {timeout: 10000}).type('Client-51005 transaction description');
        cy.get('select[id=transtypepage-transtype-4524140-jedatetype-select]', { timeout: 10000 }).select('End of business year');
        cy.get('select[class=sc-gSQFLo]', {timeout: 10000}).select('Create payment schedule with JE');

        cy.get('i[id=transtypepage-transtype-4524134-addfirsttransaction-icon]', {timeout: 10000}).click()
    });

    /*it('Go to journal entry', () => {
    	cy.login();
    	cy.visit('/taxx');
    	cy.screenshot('51005-000006');
        //cy.contains("Client-51005").click();
        cy.visit("/taxx/clientgroup/64085")
        //cy.contains("Client-51005").click({force: true});
        cy.visit("/taxx/clientgroup/64085/entity/100033/")
        //cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.screenshot('51005-000007');
        cy.contains("Journal entry", {timeout: 5000}).click();
        //cy.visit("/taxx/clientgroup/4/entity/6/journal/")
        //cy.url().should('contain', '/journal/');
        cy.screenshot('51005-000008', {timeout: 5000});
    });

    it('Create JE for Bank Statement', () => {
        cy.contains("Create", {timeout: 5000}).click({force: true});
        cy.url().should('contain', '/clientgroup/4/entity/6/journal/new/');
        cy.screenshot('51005-000008', {timeout: 5000});
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', {timeout: 5000}).type('32094 Bank Statement Matching Test');
        cy.get('input[data-test-id=dropdown-input-field-je-transaction-type-0]', {timeout: 5000}).type('{enter}');
        cy.get('select[data-cy=je-docchooser-rule]', {timeout: 5000}).select('32094 Bank Statement Match Rule')
        //cy.contains('Transaction types').select('32094 Bank Statement Matching Test');
        //cy.get('#dropdown-icon-toggle-button-je-transaction-type-0 svg').should('exist').click();

        //add single JE
        cy.get('svg[class=mdi-icon sc-gsNilK fpiXhK]').click({force: true});

        //to be continued ...
        //there are still errors
    });

    it('Go to File Manager', () => {
        cy.login();
        cy.visit('/taxx');
        cy.screenshot('51005-000006');
        //cy.contains("Client-51005").click();
        cy.visit("/taxx/clientgroup/64085")
        //cy.contains("Client-51005").click({force: true});
        cy.visit("/taxx/clientgroup/64085/entity/100033/")
        //cy.url().should('contain', '/clientgroup/4/entity/6/');
        cy.screenshot('51005-000007');
        cy.contains("File manager", {timeout: 5000}).click({force: true});
        //cy.visit("/taxx/clientgroup/4/entity/6/journal/")
        //cy.url().should('contain', '/journal/');
        cy.screenshot('51005-000008');
    });*/
})