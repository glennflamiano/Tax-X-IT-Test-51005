Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

/* After creating a new row, this function can be used to get the input fields of the new row
    You can then chain .first(), .last(), .eq(indexnumber), etc. to call the specific input field
*/
const getLastRowFields = (tableTitle) => {
    return cy.contains(tableTitle).parent().find('tr').last().find('input');
};
const getAddButtonByTable = (tableTitle) => {
    return cy.contains(tableTitle).parent().find('.mdi-icon').last();
};

describe('27598 (Karl) Editable principal schedule to manipulate calculation history table', () => {
    // it('27598.1.a For LOAN type PS, the principal schedule can be edited ', () => {
    //     const paymentScheduleId = 3;
    //     // Initialize payment schedule page data
    //     cy.login();
    //     cy.visit(`/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`).then(() => {
    //         cy.url().should('have.string', `/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`);
    //         // Reset terms data
    //         cy.resetTermsData(paymentScheduleId);
    //     });

    //     cy.contains('Calculation logic history');
    //     cy.contains('Delete this payment schedule');

    //     // Resets interest table's data
    //     cy.get('.edit-button').contains('Edit').clickAttached();
    //     getAddButtonByTable('Calculation logic').clickAttached();
    //     cy.get('.save-button').contains('Save').clickAttached();
    //     cy.get('#confirmBox-confirmBtn').last().clickAttached();
    //     cy.get('#alertBox-confirmBtn').last().clickAttached();
        
    //     cy.contains('Accrued JE');
    //     cy.contains('Payment JE');
      

    //     // Start test
    //     cy.get('.edit-button').contains('Edit').clickAttached();
    //     getAddButtonByTable('Calculation logic').clickAttached();

    //     // Save a row to Terms table to automatically create a row in the Interest Table
    //     getLastRowFields('Calculation logic').eq(0).type('1000'); // Principal amount
    //     getLastRowFields('Calculation logic').eq(1).type('{selectall}{backspace}09/02/2020'); // Service from
    //     getLastRowFields('Calculation logic').eq(2).type('{selectall}{backspace}12/31/2020'); // Service to
    //     getLastRowFields('Calculation logic').eq(3).type('5.24'); // Interest rate
    //     cy.get('.save-button').contains('Save').clickAttached();
    //     cy.get('#confirmBox-confirmBtn').last().clickAttached();
    //     cy.get('#alertBox-confirmBtn').last().clickAttached();

    //     cy.contains('2020-10-31');
    //     cy.contains('5.24%');

    //     // Edit fields in Principal Schedule
    //     cy.get('.edit-button').contains('Edit').clickAttached();
    //     getAddButtonByTable('Principal schedule').clickAttached();
    //     getLastRowFields('Principal schedule').eq(0).type('{selectall}{backspace}11/25/2020', { force: true }); // Date
    //     getLastRowFields('Principal schedule').eq(1).type('300'); // JE amount
    //     getLastRowFields('Principal schedule').eq(2).type('Test remarks'); // remarks
    //     cy.screenshot('27598_EditablePrincipalTable');
    // });

    // it('27598.1.a The principal schedule can be saved ', () => {
    //     cy.login();
    //     cy.get('.save-button').contains('Save').clickAttached();
    //     cy.get('#confirmBox-confirmBtn').last().clickAttached();
    //     cy.contains('Successfully saved');
    //     cy.screenshot('27598_SaveSuccessfulPrincipalTable');
    //     cy.get('#alertBox-confirmBtn').last().clickAttached();
    // });

    // it('27598.2 The values entered should be saved and remaining amount should be updated', () => {
    //     cy.login();
    //     cy.contains('Principal schedule').parent().contains('300');
    //     cy.contains('Principal schedule').parent().contains('Test remarks');
    //     cy.contains('Principal schedule').parent().find('tr').contains('700');
    //     cy.screenshot('27598_UpdatedValuesPrincipalTable');
    // });

    // it('27598.1.b NOT LOAN Principal Schedules cannot be added', () => {
    //     const paymentScheduleId = 4;
    //     // Initialize payment schedule page data
    //     cy.login();
    //     cy.visit(`/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`);
    //     cy.url().should('have.string', `/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`);
    //     // Reset terms data
    //     cy.resetTermsData(paymentScheduleId);

    //     // The plus button should not be visible
    //     cy.contains('Principal schedule').parent().contains('.mdi-icon').should('not.be.visible');
    // });

    // it('27598.1.b NOT LOAN Principal Schedule cannot be editable', () => {
    //     const paymentScheduleId = 4;
    //     cy.login();

    //     // Resets interest table's data
    //     cy.get('.edit-button').contains('Edit').clickAttached();
    //     getAddButtonByTable('Calculation logic').clickAttached();
    //     cy.get('.save-button').contains('Save').clickAttached();
    //     cy.get('#confirmBox-confirmBtn').last().clickAttached();
    //     cy.get('#alertBox-confirmBtn').last().clickAttached();
    //     cy.wait(500);

    //     // Start test
    //     cy.get('.edit-button').contains('Edit').clickAttached();
    //     getAddButtonByTable('Calculation logic').clickAttached();

    //     // Save a row to Terms table to automatically create a row in the Principal Table
    //     getLastRowFields('Calculation logic').eq(0).type('1000'); // Principal amount
    //     getLastRowFields('Calculation logic').eq(2).type('{selectall}{backspace}09/02/2020'); // Service from
    //     getLastRowFields('Calculation logic').eq(3).type('{selectall}{backspace}12/31/2020'); // Service to

    //     cy.get('.save-button').contains('Save').clickAttached();
    //     cy.get('#confirmBox-confirmBtn').last().clickAttached();
    //     cy.get('#alertBox-confirmBtn').last().clickAttached();
    //     cy.wait(500);
    //     cy.get('.edit-button').contains('Edit').clickAttached();

    //     // No input field in the principal schedule should be visible
    //     getLastRowFields('Principal schedule').find('input').should('not.be.visible');
    // });
});
