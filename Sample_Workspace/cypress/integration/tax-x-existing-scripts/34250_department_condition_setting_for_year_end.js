Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const yearEndListedDepartVal = -4;
const jeTypeId = 3209401;

describe('34250 (Jingda) Add Year End Listed Department in Department and Sub-Account Dropdown in TT page', () => {
    beforeEach(() => {
        // Go to Transaction Type Edit Page
        cy.login();
        cy.visit(`/taxx/admin/transtype/${jeTypeId}`);
    });

    it('34250.1 Can select Year end listed department when Year End Operation is checked', () => {
        // Cannot select Year end listed department if 'Year End Operation' option check box is not checked
        cy.get(`select[id="transtypepage-transtype-${jeTypeId}-transaction-0-department-select"]`)
            .find(`option[value="${yearEndListedDepartVal}"]`)
            .should('not.exist');

        // Cannot select Year end listed department from subaccount dropdown when main account is 999 - 部門
        cy.get(`select[id="transtypepage-transtype-${jeTypeId}-transaction-0-account-select"]`).select('999 - 部門').should('have.value', '999');
        cy.get(`select[id="transtypepage-transtype-${jeTypeId}-transaction-0-subaccount-select"]`)
            .find(`option[value="${yearEndListedDepartVal}"]`)
            .should('not.exist');

        // Can click on 'Year End Operation' option check box
        cy.get('input[id="yearendoperation_tbvalues-checkbox"]').should('not.exist');
        cy.contains('Operation in use').parent().parent().parent().within(() => {
            cy.get('select').select('Year End Operation').should('have.value', 'is_yearendoperation');
        });
        cy.get('input[id="yearendoperation_tbvalues-checkbox"]').should('be.visible');

        // Can select Year end listed department if 'Year End Operation' option check box is checked
        cy.get(`select[id="transtypepage-transtype-${jeTypeId}-transaction-0-department-select"]`)
            .find(`option[value="${yearEndListedDepartVal}"]`)
            .should('exist');
        cy.get(`select[id="transtypepage-transtype-${jeTypeId}-transaction-0-department-select"]`)
            .select('Year end listed department')
            .should('have.value', `${yearEndListedDepartVal}`);

        // Can select Year end listed department from subaccount dropdown when main account is 999 - 部門
        cy.get(`select[id="transtypepage-transtype-${jeTypeId}-transaction-0-subaccount-select"]`)
            .find(`option[value="${yearEndListedDepartVal}"]`)
            .should('exist');
        cy.get(`select[id="transtypepage-transtype-${jeTypeId}-transaction-0-subaccount-select"]`)
            .select('Year end listed department')
            .should('have.value', `${yearEndListedDepartVal}`);

        // Can save year end opteration tt settings
        cy.contains('Save').click();
        cy.contains('OK').click();
        cy.wait(3000);
        cy.get('input[id="yearendoperation_tbvalues-checkbox"]').should('be.visible');
        cy.get(`select[id="transtypepage-transtype-${jeTypeId}-transaction-0-department-select"]`).should('have.value', `${yearEndListedDepartVal}`);
        cy.get(`select[id="transtypepage-transtype-${jeTypeId}-transaction-0-subaccount-select"]`).should('have.value', `${yearEndListedDepartVal}`);
    });
});
