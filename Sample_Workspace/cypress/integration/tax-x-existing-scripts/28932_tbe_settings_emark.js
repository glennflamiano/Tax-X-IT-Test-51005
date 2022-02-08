Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('28932 (Karl): Trial Balance Evidence Setting emark feature', () => {
    it('Initialize global TBE settings data', () => {
        cy.login();
        cy.visit(`/`);
        cy.contains('Admin').click();
        cy.contains('Trial balance evidence setting').click();
        cy.contains('Trial balance evidence');
        cy.get('#documenttype_stditem_113').select('受取利息通知書 (Interest Income Notice)').invoke('val');
        cy.get('#amount_stditem_113').select('Interest Rate').invoke('val');
        cy.get('#department_stditem_113').select('Document Name').invoke('val');
        cy.contains('Save').click();
        cy.contains('Success');
    });
    it('28932.a Can overwrite settings from the global admin at the entity level', () => {
        cy.login();
        cy.visit(`/clientgroup/1/entity/1/trialbalance-evidence/`);
        cy.contains('Trial balance evidence');
        // Check if global settings exist
        cy.get('#documenttype_stditem_113').contains('受取利息通知書 (Interest Income Notice)');
        cy.get('#amount_stditem_113').contains('Interest Rate');
        cy.get('#department_stditem_113').contains('Document Name');
        // Set new data
        cy.get('#documenttype_stditem_113').select('CAPEX一覧表 (CAPEX list)').invoke('val');
        cy.get('#amount_stditem_113').select('Construction Amount').invoke('val');
        cy.get('#department_stditem_113').select('Description').invoke('val');
        cy.contains('Save').click();
        cy.contains('Success');

        // after saving, check values after reloading the page
        cy.visit(`/clientgroup/1/entity/1/trialbalance-evidence/`);
        cy.get('#documenttype_stditem_113').contains('CAPEX一覧表 (CAPEX list)');
        cy.get('#amount_stditem_113').contains('Construction Amount');
        cy.get('#department_stditem_113').contains('Description');
    });
    it('28932.b Saved values have emarks', () => {
        cy.login();
        cy.visit(`/clientgroup/1/entity/1/trialbalance-evidence/`);
        cy.contains('Trial balance evidence');
        cy.get('#documenttype_stditem_113').contains('CAPEX一覧表 (CAPEX list)');
        cy.get('#amount_stditem_113').contains('Construction Amount');
        cy.get('#department_stditem_113').contains('Description');
        cy.get('#eIcon_113');
        
    });
    it('28932.c,e On hovering emark, x icon and tooltip should appear', () => {
        cy.login();
        cy.visit(`/clientgroup/1/entity/1/trialbalance-evidence/`);
        cy.contains('Trial balance evidence');
        cy.get('#eIcon_113');
        cy.get('#eIcon_113').parent().parent().trigger('mouseover');
        cy.get('#xIcon_113').should('be.visible');
        cy.contains('This rule setting row is customized for this entity.');
        cy.get('#xIcon_113').click();
    });
    it('28932.d Reset to global settings when clicking on the x mark', () => {
        cy.login();
        cy.visit(`/clientgroup/1/entity/1/trialbalance-evidence/`);
        cy.contains('Trial balance evidence');
        cy.get('#eIcon_113');
        cy.get('#eIcon_113').parent().parent().trigger('mouseover');
        cy.get('#xIcon_113').should('be.visible');
        cy.get('#xIcon_113').click();
        cy.get('#documenttype_stditem_113').contains('受取利息通知書 (Interest Income Notice)');
        cy.get('#amount_stditem_113').contains('Interest Rate');
        cy.get('#department_stditem_113').contains('Document Name');
        cy.get('#eIcon_113').should('not.be.visible');
    });    
});