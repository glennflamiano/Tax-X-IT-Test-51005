const CLIENT_GROUP_A = 'Client Group 1';
const ENTITY_A = 'Company Alpha';
const ENTITY_A_OPTION = '会社Alpha (Company Alpha)';
const ENTITY_B = 'Company Beta';

describe('26064 (Charuwat) Trial balance evidence setting tests', () => {
    const clickCardMenu = (title) => {
        cy.contains('div:not([to=""])', new RegExp(`^${title}$`)) // Exact match
            .first()
            .click();
    };

    const clickNavMenu = (title) => {
        // Find nav menu or drop down menu
        cy.contains('a > div > div, div > div', new RegExp(`^${title}$`)) // Exact match
            .first()
            .click();
    };

    const visitEntityHome = (clientGroupName, entityName) => {
        cy.visit('/taxx/');
        clickCardMenu(clientGroupName);
        cy.wait(3000);
        clickCardMenu(entityName);
    };

    const ensureOnEntityHome = () => {
        cy.visit('/taxx/');
        cy.login().then(() => {
            visitEntityHome(CLIENT_GROUP_A, ENTITY_B);
        });
    };

    const ensureOnTbEvidenceSettingPage = () => {
        ensureOnEntityHome();
        clickCardMenu('Trial balance evidence setting');
        cy.wait(3000); // Rendering takes few seconds on this page
    };
    describe('accessing setting page', () => {
        beforeEach(ensureOnEntityHome);
        it('26064.1.1 accesses by card menu on entity home', () => {
            clickCardMenu('Trial balance evidence setting');
            cy.url().should('eq', `${Cypress.config().baseUrl}/taxx/clientgroup/1/entity/2/trialbalance-evidence/`);
        });
        it('26064.1.2 accesses by nav menu on entity home', () => {
            clickNavMenu('Trial balance');
            clickNavMenu('Trial balance evidence setting');
            cy.url().should('eq', `${Cypress.config().baseUrl}/taxx/clientgroup/1/entity/2/trialbalance-evidence/`);
        });
    });
    describe('on setting page', () => {
        beforeEach(ensureOnTbEvidenceSettingPage);
        it('shows entity option exists', () => {
            cy.get('#source-entity-select > option[value="1"]').contains(ENTITY_A).should('exist');
        });
        it('shows import button', () => {
            cy.get('button').contains('Import setting').should('be.visible');
        });
        it('shows revert button', () => {
            cy.get('button').contains('Revert').should('be.visible');
        });
        it('shows save button', () => {
            cy.get('button').contains('Revert').should('be.visible');
        });
        it('shows table of settings', () => {
            cy.get('table > tbody > tr').should('exist');
        });
    });
    describe('importing evidence setting', () => {
        beforeEach(ensureOnTbEvidenceSettingPage);
        it('select target entity', () => {
            cy.get('#source-entity-select').select(ENTITY_A_OPTION);
            cy.wait(3000);

        });
        it('clicks import button and when confirmation box appears, clicks "Cancel"', () => {
            cy.get('#source-entity-select').select(ENTITY_A_OPTION);

            cy.get('button').contains('Import setting').click();
            cy.contains('Are you sure you want to import a copy of TB evidence setting from 会社Alpha (Company Alpha)?');
            cy.get('#confirmBox-cancelBtn').click();

            // ensures first row still empty
            cy.get('tr select[name="documenttype_stditem"]').first().should('have.value', '');
        });
        it('clicks import button and when confirmation box appears, clicks "Yes"', () => {
            cy.get('#source-entity-select').select(ENTITY_A_OPTION);
            cy.get('button').contains('Import setting').click();
            cy.contains('Are you sure you want to import a copy of TB evidence setting from 会社Alpha (Company Alpha)?');
            cy.get('#confirmBox-confirmBtn').click()
            const BANK_STATEMENT_DOC_TYPE_SETTING = 1;
            cy.wait(3000);
            cy.get('tr select[name="documenttype_stditem"]').first().should('have.value', BANK_STATEMENT_DOC_TYPE_SETTING);
            // Shows imported entity
            cy.contains('Imported from Company Alpha');
        });   
       
    });
});
