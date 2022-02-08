Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('27531.2 (Karl) Export button should be disabled', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`/clientgroup/3/entity/4/trialbalance-evidence/`);
        cy.url().should('have.string', '/clientgroup/3/entity/4/trialbalance-evidence/')
        cy.contains('Bank');
        cy.get('#documenttype_stditem_100').should('have.value','1');
    });
    it('If rule condition is empty Export button should be disabled', () => {
        cy.get('#showRuleConditionsIcon_101').click();
        cy.get('.exportRuleBtn').should('have.css', 'background')
            .should('contain', 'rgb(128, 128, 128)');
        
    });
});

describe('27531.1 (Karl): Import rule condition', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`/clientgroup/3/entity/4/trialbalance-evidence/`);
        cy.url().should('have.string', '/clientgroup/3/entity/4/trialbalance-evidence/')
        cy.contains('Bank');
        cy.get('#documenttype_stditem_100').should('have.value','1');
    });
    it('27531.1.1 Can open a popup window then show initial selectors based on import AC', () => {
        cy.get('#showRuleConditionsIcon_100').should('exist').click();
        cy.get('.importRuleBtn').should('exist').click();
        cy.get('.rule-conditions-popup').should('contain','Import rule condition');
        cy.get('#from-entity').should('have.value', '');
        cy.get('#from-account').should('have.value', '');
        cy.get('#to-entity').should('have.value', '4');
        cy.get('#to-account').should('contain', '100');
    });
    it('27531.1.2 If From selectors are empty, Execute should be disabled', () => {
        
        cy.get('#showRuleConditionsIcon_100').should('exist').click();
        cy.get('.importRuleBtn').should('exist').click();

        cy.get('#from-entity').should('have.value', '');
        cy.get('#from-account').should('have.value', '');
        cy.get('#executeBtn').should('have.css', 'background')
            .should('contain', 'rgb(128, 128, 128)');
    });
    it('27531.1.4.2.2 If document types does not match, button should be disabled and message is shown', () => {

        cy.get('#showRuleConditionsIcon_100').should('exist').click();
        cy.get('.importRuleBtn').should('exist').click();

        cy.get('#from-entity').select('5');
        cy.get('#from-account').select('101');
        cy.get('#executeBtn').should('have.css', 'background')
            .should('contain', 'rgb(128, 128, 128)');
        cy.contains('Cannot copy because document types do not match');
    });
    it('27531.1.4.2.1 If document types match, copy data', () => {
        cy.get('#showRuleConditionsIcon_100').should('exist').click();
        cy.get('.importRuleBtn').should('exist').click();

        cy.get('#from-entity').select('5');
        cy.get('#from-account').select('100');
        cy.get('#executeBtn').click();
        cy.contains('Success').screenshot('Import_document_match_success');
        cy.visit(`/clientgroup/3/entity/4/trialbalance-evidence/`);

        cy.contains('Bank');
        cy.get('#documenttype_stditem_100').should('have.value','1');

        cy.get('#showRuleConditionsIcon_100').click();
        cy.contains('Opening Balance');
    });
});

describe('27531.3 (Karl): Export rule condition', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`/clientgroup/3/entity/4/trialbalance-evidence/`);

        cy.contains('Bank');
        cy.get('#documenttype_stditem_100').should('have.value','1');
    });
    it('27531.3.1 Can open a popup window then show initial selectors based on export AC', () => {

        cy.get('#showRuleConditionsIcon_100').click();
        cy.get('.exportRuleBtn').click();
        cy.get('.rule-conditions-popup').should('contain','Export rule condition');
        cy.get('#from-entity').should('have.value', '4');
        cy.get('#from-account').should('contain', '100');
        cy.get('#to-entity').should('have.value', '');
        cy.get('#to-account').should('have.value', '');
    });
    
    it('27531.3.3.2 If To selectors are empty, Execute should be disabled', () => {
        cy.get('#showRuleConditionsIcon_100').click();
        cy.get('.exportRuleBtn').click();

        cy.get('#to-entity').should('have.value', '');
        cy.get('#to-account').should('have.value', '');
        cy.get('#executeBtn').should('have.css', 'background')
            .should('contain', 'rgb(128, 128, 128)');
    });

    it('27531.3.4.2.2 If document types does not match, button should be disabled and message is shown', () => {
        cy.get('#showRuleConditionsIcon_100').click();
        cy.get('.exportRuleBtn').click();

        cy.get('#to-entity').select('5');
        cy.get('#to-account').select('101');
        cy.get('#executeBtn').should('have.css', 'background')
            .should('contain', 'rgb(128, 128, 128)');
        cy.contains('Cannot copy because document types do not match');
    });
    it('27531.3.4.2.1 If document types match, copy data', () => {
        cy.get('#showRuleConditionsIcon_100').click();
        cy.get('.exportRuleBtn').click();

        cy.get('#to-entity').select('5');
        cy.get('#to-account').select('100');
        cy.get('#executeBtn').click();
        cy.contains('Success').screenshot('Export_document_match_success');
        cy.visit(`/clientgroup/3/entity/5/trialbalance-evidence/`);
        cy.contains('Bank');
        cy.get('#documenttype_stditem_100').should('have.value','1');
        cy.get('#showRuleConditionsIcon_100').click();
        cy.contains('Debit Amount');
    });
    it('27531.3.4.1 If document type is empty, copy data', () => {

        cy.get('#showRuleConditionsIcon_101').click();
        cy.get('.importRuleBtn').last().click();
        cy.get('.rule-conditions-popup').should('contain','Import rule condition');
        cy.get('#from-entity').select('5');
        cy.get('#from-account').select('101');
        cy.get('#executeBtn').click();
        cy.contains('Success').should("be.visible").screenshot('Copy_to_empty_document_type_success');
        cy.visit(`/clientgroup/3/entity/5/trialbalance-evidence/`);
        cy.contains('Bank');
        cy.get('#documenttype_stditem_100').should('have.value','1');
        cy.get('#showRuleConditionsIcon_101').click();
        cy.get('input[value=ValueBTest]');
    });
});

    