Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('26063 (Diego) Trial balance evidence tests', () => {
    
    it('Can view trial balance evidence page', () => {
        cy.login();
        cy.visit('/taxx/clientgroup/1/entity/1/trialbalance-evidence/');
        cy.contains('Trial balance evidence').should('be.visible');
        cy.contains('Account code').should('be.visible');
        cy.contains('Account name').should('be.visible');
        cy.contains('Sub account code').should('be.visible');
        cy.contains('Sub account name').should('be.visible');
        cy.contains('Document type').should('be.visible');
        cy.contains('Amount').should('be.visible');
        cy.contains('Date').should('be.visible');
        cy.contains('Department').should('be.visible');
        cy.contains('Entity information').should('be.visible');
        cy.contains('Gap calculation method').should('be.visible');
        cy.screenshot('TrialBalanceEvidencePage');
    });

    it('26063.2 Can add new rule conditions to empty rules', () => {
        cy.login();
        cy.visit('/taxx/clientgroup/1/entity/1/trialbalance-evidence/');
        cy.get('#showRuleConditions_111-0 svg').scrollIntoView().should('exist');
        // confirm data has loaded
        cy.get('#documenttype_stditem_111-0').should('have.value', '1');
        
        cy.get('#showRuleConditions_111-0 svg').should('exist').click();
        cy.get('#tbeRuleConditions_111-0 .importRuleBtn').should('be.visible')
        cy.get('#tbeRuleConditions_111-0').contains('Create new rule condition').should('be.visible')
        cy.get('#tbeRuleConditions_111-0 .addRuleCondition').click()
        const conditionSelect = cy.get('#tbeRuleConditions_111-0 .condition:first')
        conditionSelect.select('contains').should('have.value', 'contains')
        conditionSelect.select('!contains').should('have.value', '!contains')
        conditionSelect.select('>').should('have.value', '>')
        conditionSelect.select('<').should('have.value', '<')
        conditionSelect.select('=').should('have.value', '=')
        conditionSelect.select('gte').should('have.value', 'gte')
        conditionSelect.select('lte').should('have.value', 'lte')
        conditionSelect.select('neq').should('have.value', 'neq')
        
    });

    it('26063.3 Can remove existing rule conditions', () => {
        cy.login();
        cy.visit('/taxx/clientgroup/1/entity/1/trialbalance-evidence/');
        // confirm data has loaded
        cy.get('#documenttype_stditem_111-0').should('have.value', '1');

        cy.get('#showRuleConditions_111-1 svg').should('exist').click()
        cy.get('#tbeRuleConditions_111-1 .importRuleBtn').should('be.visible')
        cy.get('#tbeRuleConditions_111-1 .removeRuleCondition:last').should('be.visible')
        cy.get('#tbeRuleConditions_111-1 .removeRuleCondition:last').click()
        cy.get('#tbeRuleConditions_111-1').contains('Create new rule condition').should('be.visible')
    });

    it('26063.5 Cannot add new rule conditions to entry without document type', () => {
        cy.login();
        cy.visit('/taxx/clientgroup/1/entity/1/trialbalance-evidence/');
        // confirm data has loaded
        cy.get('#documenttype_stditem_111-0').should('have.value', '1');

        cy.get('#showRuleConditions_111-2').should('have.class', 'disabled')
        cy.get('#showRuleConditions_111-2 svg').click()
        cy.get('#tbeRuleConditions_111-2').should('not.be.visible')
    });
});
