Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

/* After creating a new row, this function can be used to get the input fields of the new row
    You can then chain .first(), .last(), .eq(indexnumber), etc. to call the specific input field
*/
const getLastRowFields = () => {
    return cy.contains('Calculation logic history').parent().find('tr').last().find('input');
};

const getAddButtonByTable = (tableTitle) => {
    return cy.contains(tableTitle).parent().find('.mdi-icon').last();
};

describe('25251 (Karl) Terms schedule to calculate interest schedule', () => {
    const paymentScheduleId = 3;

    it('Can update the interest schedule automatically', () => {
        // Navigate to list
        cy.login();
        cy.visit(`/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`).then(() => {
            cy.url().should('have.string', `/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`);
            cy.resetTermsData(paymentScheduleId);
        });

        cy.contains('Calculation logic history').should('be.visible');
        cy.contains('Interest schedule').should('be.visible');

        // Resets principal or interest table's data
        cy.get('.edit-button')
            .last()
            .then((e) => {
                Cypress.$(e).click();
            });
        getAddButtonByTable('Calculation logic history').click();
        cy.get('.save-button')
            .last()
            .then((e) => {
                Cypress.$(e).click();
            });
        cy.get('#confirmBox-confirmBtn').click();
        cy.get('#alertBox-confirmBtn').click();

        // -- Start of test scenario -- //
        cy.get('.edit-button')
            .last()
            .then((e) => {
                Cypress.$(e).click();
            });
        getAddButtonByTable('Calculation logic history').click();

        // First Row
        getLastRowFields().eq(0).type('1000');
        getLastRowFields().eq(1).type('{selectall}{backspace}09/02/2020');
        getLastRowFields().eq(2).type('{selectall}{backspace}12/31/2020');
        getLastRowFields().eq(3).type('5');

        cy.get('.save-button')
            .last()
            .then((e) => {
                Cypress.$(e).click();
            });
        cy.get('#confirmBox-confirmBtn')
            .last()
            .then((e) => {
                Cypress.$(e).click();
            });
        cy.get('#alertBox-confirmBtn')
            .last()
            .then((e) => {
                Cypress.$(e).click();
            });

        // Second Row
        cy.contains('Edit').clickAttached();
        getAddButtonByTable('Calculation logic history').click();
        getLastRowFields().eq(0).type('1500');
        getLastRowFields().eq(1).type('{selectall}{backspace}10/02/2020');
        getLastRowFields().eq(2).type('{selectall}{backspace}12/31/2020');
        getLastRowFields().eq(3).type('6');

        cy.get('.save-button')
            .last()
            .then((e) => {
                Cypress.$(e).click();
            });
        cy.get('#confirmBox-confirmBtn')
            .last()
            .then((e) => {
                Cypress.$(e).click();
            });
        cy.get('#alertBox-confirmBtn')
            .last()
            .then((e) => {
                Cypress.$(e).click();
            });

        // Third Row
        cy.contains('Edit').clickAttached();
        getAddButtonByTable('Calculation logic history').click();
        getLastRowFields().eq(0).type('2000');
        getLastRowFields().eq(1).type('{selectall}{backspace}11/02/2020');
        getLastRowFields().eq(2).type('{selectall}{backspace}3/31/2021');
        getLastRowFields().eq(3).type('7');

        cy.get('.save-button')
            .last()
            .then((e) => {
                Cypress.$(e).click();
            });
        cy.get('#confirmBox-confirmBtn').click();
        cy.get('#alertBox-confirmBtn').click();

        cy.contains('Interest schedule').parent().find('tbody').should('be.visible');
        cy.screenshot('PaymentSchedulePage_InterestTable');
    });
});

describe('25251 (Karl) Terms schedule to calculate principal schedule', () => {
    const paymentScheduleId = 4;

    it('Can update the principal schedule automatically', () => {
        // This will save the page everytime a row is added
        // Navigate to list
        cy.login();
        cy.visit(`/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`).then(() => {
            cy.url().should('have.string', `/clientgroup/1/entity/1/payschedule/${paymentScheduleId}`);
            cy.resetTermsData(paymentScheduleId);
            cy.contains('Calculation logic history').should('be.visible');
        });

        cy.contains('Principal schedule').should('be.visible');

        // Resets tables' data
        cy.contains('Edit').clickAttached();
        getAddButtonByTable('Calculation logic').click();
        cy.contains('Save').clickAttached();
        cy.get('#confirmBox-confirmBtn').click();
        cy.get('#alertBox-confirmBtn').click();

        // Start
        cy.contains('Edit').clickAttached();
        getAddButtonByTable('Calculation logic history').click();

        // First Row
        getLastRowFields().eq(0).type('1000'); // Total Amount
        getLastRowFields().eq(2).type('{selectall}{backspace}09/02/2020'); // From Date
        getLastRowFields().eq(3).type('{selectall}{backspace}12/31/2020');

        cy.contains('Save').clickAttached();
        cy.get('#confirmBox-confirmBtn').click();
        cy.get('#alertBox-confirmBtn').click();

        // Second Row
        cy.contains('Edit').clickAttached();
        getAddButtonByTable('Calculation logic history').click();
        getLastRowFields().eq(0).type('1500');
        getLastRowFields().eq(2).type('{selectall}{backspace}10/02/2020');
        getLastRowFields().eq(3).type('{selectall}{backspace}12/31/2020');

        cy.contains('Save').clickAttached();
        cy.get('#confirmBox-confirmBtn').click();
        cy.get('#alertBox-confirmBtn').click();

        // Third Row
        cy.contains('Edit').clickAttached();
        getAddButtonByTable('Calculation logic history').click();
        getLastRowFields().eq(0).type('2000');
        getLastRowFields().eq(2).type('{selectall}{backspace}11/02/2020');
        getLastRowFields().eq(3).type('{selectall}{backspace}3/31/2021');

        cy.contains('Save').clickAttached();
        cy.get('#confirmBox-confirmBtn').click();
        cy.get('#alertBox-confirmBtn').click();

        cy.contains('Principal schedule').parent().find('tbody').should('be.visible');
        cy.screenshot('PaymentSchedulePage_PrincipalTable');
    });
});
