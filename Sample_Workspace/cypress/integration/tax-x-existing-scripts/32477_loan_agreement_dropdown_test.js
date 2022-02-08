Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

// TO DO We need add a task to fix this test
describe('32477 (Karl) New dropdown for Gross-up, Interest calc, and Interest rate type for Loan Agreement Docs', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`/taxx/clientgroup/3/entity/4/file/324770/`);
        cy.contains('Extracted data').should('exist').click();
        cy.contains('Show only required fields').should('exist').next().click();
    });
    it('32477.1.a Gross-up calculation options', () => {    
        cy.contains('Gross-up Calculation');
        cy.get('option[value="有 (Applicable)"]').should('have.value', '有 (Applicable)');
        cy.get('option[value="無 (Non-applicable)"]').should('have.value', '無 (Non-applicable)');
    });
    it('32477.1.b Interest Calculation Method options', () => {
        cy.contains('Interest Calculation Method');
        cy.get('option[value="360"]').should('have.value', '360');
        cy.get('option[value="365"]').should('have.value', '365');
    });
    it('32477.1.c Interest Rate Type options', () => {
        cy.contains('Interest Rate Type');
        cy.get('option[value="固定 (Fixed)"]').should('have.value', '固定 (Fixed)');
        cy.get('option[value="変動 (Float)"]').should('have.value', '変動 (Float)');
    });
});
