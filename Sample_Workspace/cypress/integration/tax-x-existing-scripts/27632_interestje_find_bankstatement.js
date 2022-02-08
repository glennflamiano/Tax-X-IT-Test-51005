Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

let journal_entry_cell = null;

describe('27632 (Hannah) Find Bank Statement Principal Document for Interest Paid JE', () => {
    beforeEach(() => {
        // Go to Payment Schedule Page
        cy.login();
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule');
        cy.contains('Test Bank Statement Found for Interest Paid JE (27632)').click();
        cy.contains('Edit').should('exist');
    });
    it('Can create interest schedule rows', () => {
        // Check Page
        cy.contains('Calculation logic history').should('be.visible');
        cy.contains('Interest schedule').should('be.visible');

        // Create Calculation logic history
        cy.contains('Edit').clickAttached();
        cy.contains('Calculation logic history').parent().find('.mdi-icon').last().click();
        cy.get('input[value="0"]').first().type('{selectall}{backspace}2000000');
        cy.get('.period-from-input').last().type('{selectall}{backspace}11/16/2020');
        cy.get('.period-to-input').last().type('{selectall}{backspace}02/28/2021');
        cy.get('input[value="0"]').last().type('{selectall}{backspace}7');
        cy.contains('Save').last().click();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.contains('OK').click();

        // Get Journal Entry Column index
        cy.contains('Interest schedule').parent().within((el) => {
            cy.contains('th', 'Journal entry').invoke('index').then((i) => {
                journal_entry_cell = i - 1;
            });
        });

        cy.visit('/taxx/clientgroup/1/entity/1/payschedule/7');
        cy.contains('Edit').should('exist')

        // Create 2 JEs for 2020-11-30
        cy.click_add_je('Interest schedule', '2020-11-30', 'Accrued JE');
        cy.contains('OK').click();
        cy.click_add_je('Interest schedule', '2020-11-30', 'Payment JE');
        cy.contains('OK').click();

        // Create 2 JEs for 2021-12-31
        cy.click_add_je('Interest schedule', '2020-12-31', 'Accrued JE');
        cy.contains('OK').click();
        cy.click_add_je('Interest schedule', '2020-12-31', 'Payment JE');
        cy.contains('OK').click();

        // Create 2 JEs for 2021-01-31
        cy.click_add_je('Interest schedule', '2021-01-31', 'Accrued JE');
        cy.contains('OK').click();
        cy.click_add_je('Interest schedule', '2021-01-31', 'Payment JE');
        cy.contains('OK').click();

        cy.screenshot('PaymentSchedulePage_Interest');
    });
    it('27632.1 Can find matching Bank Statement document when it exists', () => {
        // CR Amount = Bank Statement Debit Amount
        // It should pick first by month and year, and then by closest date

        // Check Interest Paid Data for 2020-12-31
        // CR Amount = 2
        // Has Correct Bank Statement Row
        cy.click_je_link('Interest schedule', '2020-12-31', journal_entry_cell, '借入利息（未払取崩）');
        cy.contains('Principal document').should('exist')
        cy.contains('銀行取引明細書 (Bank Statement):Document 1 - Transactions 1').should('exist')
        // Check Interest Paid Data for 2021-01-31
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule/7');
        cy.contains('Edit').should('exist')
        // CR Amount = 2
        // Has Correct Bank Statement Row
        cy.click_je_link('Interest schedule', '2021-01-31', journal_entry_cell, '借入利息（未払取崩）');
        cy.contains('Principal document').should('exist')
        cy.contains('銀行取引明細書 (Bank Statement):Document 1 - Transactions 3').should('exist')
    });
    it('27632.2 Can show red je link when matching bs is not found', () => {

        // Red JE Link
        cy.contains('Interest schedule').parent().children().contains('2020-11-30').siblings().eq(journal_entry_cell)
            .get('[data-cy=flagged-je-pill]')
            .contains('借入利息（未払取崩）').should('exist')

        // Non Red JE Link
        cy.contains('Interest schedule').parent().children().contains('2021-01-31').siblings().eq(journal_entry_cell)
            .get('[data-cy=je-pill]')
            .contains('借入利息（未払取崩）').should('exist')
        cy.contains('Interest schedule').parent().children().contains('2020-12-31').siblings().eq(journal_entry_cell)
            .get('[data-cy=je-pill]')
            .contains('借入利息（未払取崩）').should('exist')

        // Check that JE Primary Doc (Bank Statement) does not exist
        cy.click_je_link('Interest schedule', '2020-11-30', journal_entry_cell, '借入利息（未払取崩）');
        cy.contains('Principal document').parent().should('not.contain', 'select');
    });
});
