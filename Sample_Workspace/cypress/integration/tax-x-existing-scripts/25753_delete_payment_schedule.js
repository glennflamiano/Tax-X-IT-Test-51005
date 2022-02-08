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

describe('25753 (Kim) Payment Schedule Delete Function', () => {
    it('25753.3 Basic Delete Operation - Loan', () => {
        cy.request({
            method: 'POST',
            url: '/webapi/v1/paymentschedule/',
            headers: {
                Authorization: 'Basic YWRtaW46YWRtaW4=',
                'content-type': 'application/json'
            },
            body: {
                entity: 1,
                schedulename: 'Schedule To Delete',
                scheduletype: 'LOAN'
            }
        }).then((schedule) => {
            const paymentScheduleId = schedule.body.id;
            // Initialize payment schedule page data
            cy.login();
            cy.visit(`/taxx/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`);

            // Reset terms data
            cy.resetTermsData(paymentScheduleId);
        });

        // Resets interest table's data
        cy.get('.edit-button').last().click({ force: true });
        getAddButtonByTable('Calculation logic').click();
        cy.contains('Save').click();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.get('#alertBox-confirmBtn').last().click();

        // Start test
        cy.get('.edit-button').last().click({ force: true });
        getAddButtonByTable('Calculation logic').click();

        // Save a row to Terms table to automatically create a row in the Interest Table
        getLastRowFields('Calculation logic').eq(0).type('1000'); // Principal amount
        getLastRowFields('Calculation logic').eq(1).type('{selectall}{backspace}09/02/2020'); // Service from
        getLastRowFields('Calculation logic').eq(2).type('{selectall}{backspace}12/31/2020'); // Service to
        getLastRowFields('Calculation logic').eq(3).type('5.24'); // Interest rate
        cy.contains('Save').click();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.get('#alertBox-confirmBtn').last().click();

        //Delete Schedule
        cy.get('#delete-paysched').last().clickAttached();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.get('#alertBox-confirmBtn').last().click();
    });

    it('25753.3 Basic Delete Operation - Prepaid', () => {
        cy.request({
            method: 'POST',
            url: '/webapi/v1/paymentschedule/',
            headers: {
                Authorization: 'Basic YWRtaW46YWRtaW4=',
                'content-type': 'application/json'
            },
            body: {
                entity: 1,
                schedulename: 'Schedule To Delete',
                scheduletype: 'PREPAID_1'
            }
        }).then((schedule) => {
            const paymentScheduleId = schedule.body.id;
            // Initialize payment schedule page data
            cy.login();
            cy.visit(`/taxx/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`);

            // Reset terms data
            cy.resetTermsData(paymentScheduleId);
        });

        // Resets interest table's data
        cy.get('.edit-button').last().click({ force: true });
        getAddButtonByTable('Calculation logic').click();
        cy.contains('Save').click();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.get('#alertBox-confirmBtn').last().click();

        // Start test
        cy.get('.edit-button').last().click({ force: true });
        getAddButtonByTable('Calculation logic').click();

        // Save a row to Terms table to automatically create a row in the Principal Table
        getLastRowFields('Calculation logic').eq(0).type('1000'); // Principal amount
        getLastRowFields('Calculation logic').eq(2).type('{selectall}{backspace}09/02/2020'); // Service from
        getLastRowFields('Calculation logic').eq(3).type('{selectall}{backspace}12/31/2020'); // Service to
        cy.contains('Save').click();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.get('#alertBox-confirmBtn').last().click();

        //Delete Schedule
        cy.get('#delete-paysched').last().clickAttached();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.get('#alertBox-confirmBtn').last().click();
    });

    it('25753.3.a: Schedule cannot be deleted if already sent to OBC', () => {
        const paymentScheduleId = 3;
        cy.login();

        cy.visit(`/taxx/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`);

        //Delete Schedule
        cy.get('#delete-paysched').trigger('mouseenter', { force: true }).click({ force: true });
        cy.contains('cannot be deleted');
    });

    // it('25753.3.b: When payment schedule is deleted, associated JEs are deleted', () => {
    //     cy.login();
    //     cy.visit(`/taxx/clientgroup/1/entity/1/journal`);
    //     cy.get('JE Date').should('be.empty')
    // });
});
