/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('31013 (Karl) Evidence File Column in Interest Schedule', () => {
    it('31013 can upload file from computer or choose from x', () => {    
        cy.login();
        cy.visit(`taxx/clientgroup/3/entity/4/payschedule/315041`);

        // this part is just to make sure the whole page is rendered before I click on edit
        // (the file name is rendered later than other fields since it is at the bottom and has a lot of computation)
        cy.get('.loanbond-interest-schedule-row').parent().contains('1908_武蔵中原_4523777.pdf');

        cy.contains('Edit').clickAttached();
        cy.get('[data-cy=evidence-file-upload]').last().click();
        cy.contains('Upload from computer');
        cy.contains('Choose from X');
    });

    it('31013.1 can save file and display it in the evidence file column', () => { 
        cy.login();
        cy.visit(`taxx/clientgroup/3/entity/4/payschedule/315041`);
        cy.get('.loanbond-interest-schedule-row').parent().contains('1908_武蔵中原_4523777.pdf');
        cy.get('.loanbond-interest-schedule-row').first().scrollIntoView();
        cy.screenshot('PS_interest_row_evidencefile');
    });
});
