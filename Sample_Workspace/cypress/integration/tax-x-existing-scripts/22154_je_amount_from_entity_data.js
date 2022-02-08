describe('22154 (Thomas) JE Amount Calculation using Entity Date Data', () => {
    it('Can add primary document info to equation', () => {
        cy.login()
        cy.visit('/taxx/admin/transtype/2215400/');
        cy.get('#equation-input-1').type('{selectall}{backspace}TotalInvoiceAmount')
        cy.get('#equation-search-1').click()
        cy.contains('GrandTotalAmount').click()
        cy.get('#equation-input-1').should('have.value', 'TotalInvoiceAmount+GrandTotalAmount')
    });
    it('22154.1.a Can add daycount function to equation', () => {
        cy.login()
        cy.visit('/taxx/admin/transtype/2215400/');
        cy.get('#equation-input-1').type('{selectall}{backspace}TotalInvoiceAmount')
        cy.get('#equation-search-1').click()
        cy.contains('daycount(_from,_to)').click()
        cy.get('#equation-input-1').should('have.value', 'TotalInvoiceAmount+daycount(_from,_to)')
    });
    it('22154.2.a Can add entity data to equation', () => {
        cy.login()
        cy.visit('/taxx/admin/transtype/2215400/');
        cy.get('#equation-input-1').type('{selectall}{backspace}')
        cy.get('#equation-search-1').click()
        cy.contains('EndFiscalYear').click()
        cy.get('#equation-input-1').should('have.value', 'Entity_EndFiscalYear')
    });
});
