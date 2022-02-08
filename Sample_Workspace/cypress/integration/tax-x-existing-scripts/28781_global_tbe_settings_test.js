Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('28781 (Karl): Trial balance evidence global settings feature', () => {
    it('28781.1 Can set global TBE settings as an admin', () => {
        cy.login();
        cy.visit(`/`);
        cy.contains('Admin').click();
        cy.contains('Trial balance evidence setting').click();
        cy.contains('Trial balance evidence');
        cy.get('#documenttype_stditem_112').select('銀行取引明細書 (Bank Statement)').invoke('val');
        cy.get('#amount_stditem_112').select('Balance').invoke('val');
        cy.get('#entity_stditem_112').select('Bank account number').invoke('val');
        cy.contains('Save').click();
        cy.contains('Success');
    });
    it('28781.2.a The global settings will reflect in blank rows in the entity TBE settings', () => {
        cy.login();
        cy.visit(`/clientgroup/3/entity/4/trialbalance-evidence/`);
        cy.url().should('have.string', '/clientgroup/3/entity/4/trialbalance-evidence/');
        cy.contains('Trial balance evidence');
        cy.get('#documenttype_stditem_112').contains('銀行取引明細書 (Bank Statement)');
        cy.get('#amount_stditem_112').contains('Balance');
        cy.get('#entity_stditem_112').contains('Bank account number');
        cy.screenshot('28781.2.a_globalsettings_on_entity', {capture: 'viewport'});
    });
    it('28781.2.b The entity TBE settings can replace the global settings', () => {
        cy.login();
        cy.visit(`/clientgroup/3/entity/4/trialbalance-evidence/`);
        cy.url().should('have.string', '/clientgroup/3/entity/4/trialbalance-evidence/');
        cy.contains('Trial balance evidence');
        cy.get('#documenttype_stditem_112').select('請求書 (Invoice)').invoke('val');
        cy.get('#amount_stditem_112').select('Exchange Rate').invoke('val');
        cy.get('#entity_stditem_112').select('Department name').invoke('val');
        cy.contains('Save').click();
        cy.contains('Success');
        cy.contains('OK').click();
        cy.screenshot('28781.2.b_tbe_replaces_global_settings', {capture: 'viewport'});
    });
});
