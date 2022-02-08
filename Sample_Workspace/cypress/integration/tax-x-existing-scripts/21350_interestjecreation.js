Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

let journal_entry_cell = null;
let amount_paid_cell = null;
let unpaid_amount_cell = null;
let counter_party = '';

describe('21350 (Hannah) Payment Schedule Interest JE Creation', () => {
    beforeEach(() => {
        // Go to Payment Schedule Page
        cy.login();
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule');
        cy.contains('Test Interest JE Creation (21350)').click();
        cy.wait(2000);
    })
    it('Can create interest schedule rows', () => {
        // Check Page
        cy.contains('Calculation logic history').should('be.visible');
        cy.contains('Interest schedule').should('be.visible');

        // Create Calculation logic history
        cy.contains('Edit').click();
        cy.contains('Calculation logic history').parent().find('.mdi-icon').last().click();
        cy.get('input[value="0"]').first().type('{selectall}{backspace}500000');
        cy.get('.period-from-input').last().type('{selectall}{backspace}11/03/2020');
        cy.get('.period-to-input').last().type('{selectall}{backspace}05/03/2021');
        cy.get('input[value="0"]').last().type('{selectall}{backspace}7');
        cy.contains('Save').last().click();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.contains('OK').click();

        // Get Journal Entry Column index
        cy.contains('Interest schedule').parent().within((el) => {
            cy.contains('th', 'Journal entry').invoke('index').then((i) => {
                journal_entry_cell = i - 1;
            })
        })
        // Get Amount Paid Column index
        cy.contains('Interest schedule').parent().within((el) => {
            cy.contains('th', 'Amount paid').invoke('index').then((i) => {
                amount_paid_cell = i - 1;
            })
        })
        // Get Unpaid Amount Column index
        cy.contains('Interest schedule').parent().within((el) => {
            cy.contains('th', 'Unpaid amount').invoke('index').then((i) => {
                unpaid_amount_cell = i - 1;
            })
        })
        // Get Counterparty name
        cy.contains('Counterparty').next().then((el) => {
            counter_party = el.text();
        })
        cy.screenshot('PaymentSchedulePage_Interest');
    });
    it('21350.1 Interest table has JE creation button', () => {
        // Check that JE creation button exists
        cy.check_cell_contents('Interest schedule', '2020-11-30', journal_entry_cell, 'playlist_add', 'exist');
    });
    it('21350.4 (Test 1/2) Can create two interest JEs (interest and interest paid)', () => {
        // Create 2 JEs for 2020-11-30
        cy.click_add_je('Interest schedule', '2020-11-30', 'Accrued JE');
        cy.contains('OK').click();
        cy.click_add_je('Interest schedule', '2020-11-30', 'Payment JE');
        cy.contains('OK').click();
        // Check created JE links existance: No add button, Interest JE link, Interest Paid JE link
        cy.check_cell_contents('Interest schedule', '2020-11-30', journal_entry_cell, 'playlist_add', 'exist');
        cy.check_cell_contents('Interest schedule', '2020-11-30', journal_entry_cell, 'Payment Schedule (loan) 借入利息（未払計上）', 'exist');
        cy.check_cell_contents('Interest schedule', '2020-11-30', journal_entry_cell, '借入利息（未払取崩', 'exist');
        cy.count_cell_contents('Interest schedule', '2020-11-30', journal_entry_cell, 8);

        // Create 2 JEs for 2021-04-30
        cy.click_add_je('Interest schedule', '2021-04-30', 'Accrued JE');
        cy.contains('OK').click();
        cy.click_add_je('Interest schedule', '2021-04-30', 'Payment JE');
        cy.contains('OK').click();
        // Check created JE links existance: No add button, Interest JE link, Interest Paid JE link
        cy.check_cell_contents('Interest schedule', '2021-04-30', journal_entry_cell, 'playlist_add', 'exist');
        cy.check_cell_contents('Interest schedule', '2021-04-30', journal_entry_cell, 'Payment Schedule (loan) 借入利息（未払計上）', 'exist');
        cy.check_cell_contents('Interest schedule', '2021-04-30', journal_entry_cell, '借入利息（未払取崩）', 'exist');
        cy.count_cell_contents('Interest schedule', '2021-04-30', journal_entry_cell, 8);
    });
    it('21350.5 Can click on JE icon and be routed to JE Detail Page', () => {
        // Check Interest JE link
        cy.click_je_link('Interest schedule', '2020-11-30', journal_entry_cell, 'Payment Schedule (loan) 借入利息（未払計上）');
        cy.url().should('include', 'taxx/clientgroup/1/entity/1/journal/')
        cy.contains('DR sum').should('exist');
        cy.contains('CR sum').should('exist');
        
        // Check Interest Paid JE link
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule/5');
        cy.wait(2000);
        cy.click_je_link('Interest schedule', '2020-11-30', journal_entry_cell, '借入利息（未払取崩）');
        cy.url().should('include', 'taxx/clientgroup/1/entity/1/journal/')
        cy.contains('DR sum').should('exist');
        cy.contains('CR sum').should('exist');
    });
    it('21350.4 (Test 2/2) Can create two interest JEs with proper data', () => {
        // Check Interest Data for 2020-11-30
        // Interest Amount = 278,082
        cy.click_je_link('Interest schedule', '2020-11-30', journal_entry_cell, 'Payment Schedule (loan) 借入利息（未払計上）');
        cy.get('[value="2020年11月30日"]').should('exist');        // Date = from TT (end of year)
        cy.get('[value="'+ counter_party +'"]').should('exist');  // Counter Party = Schedule Counter Party
        cy.get('[value="0"]').should('have.length', 2);           // CT = 0
        cy.contains('DR sum').next().should('contain', '2685');   // Dr Amount = Interest Amount
        cy.contains('CR sum').next().should('contain', '2685');   // Cr Amount = Interest Amount

        // Check Interest Data for 2021-04-30
        // Interest Amount = 287,671
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule/5');
        cy.wait(2000);
        cy.click_je_link('Interest schedule', '2021-04-30', journal_entry_cell, 'Payment Schedule (loan) 借入利息（未払計上）');
        cy.get('[value="2021年04月30日"]').should('exist');
        cy.get('[value="'+ counter_party +'"]').should('exist');
        cy.get('[value="0"]').should('have.length', 2);
        cy.contains('DR sum').next().should('contain', '14481');
        cy.contains('CR sum').next().should('contain', '14481');

        // Check Interest Paid Data for 2020-11-30
        // Interest Amount = 278,082
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule/5');
        cy.wait(2000);
        cy.click_je_link('Interest schedule', '2020-11-30', journal_entry_cell, '借入利息（未払取崩）');
        cy.get('[value="2020年11月30日"]').should('exist');        // Date = from TT (end of year)
        cy.get('[value="'+ counter_party +'"]').should('exist');  // Counter Party = Schedule Counter Party
        cy.get('[value="0"]').should('have.length', 4);           // CT = 0
        cy.contains('DR sum').next().should('contain', '2685');   // Dr Amount = Interest Amount
        cy.contains('CR sum').next().should('contain', '2685');   // Cr Amount = 0

        // Check Interest Paid Data for 2021-04-30
        // Interest Amount = 287,671
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule/5');
        cy.wait(2000);
        cy.click_je_link('Interest schedule', '2021-04-30', journal_entry_cell, '借入利息（未払取崩）');
        cy.get('[value="2021年04月30日"]').should('exist');
        cy.get('[value="'+ counter_party +'"]').should('exist');
        cy.get('[value="0"]').should('have.length', 4);
        cy.contains('DR sum').next().should('contain', '14481');
        cy.contains('CR sum').next().should('contain', '14481');
    });
    it('21350.3 Can use created JEs to update unpaid paid and paid amount', () => {
        // Check Payment Scedule Interest Column Data
        // JE amount = Interest amount
        // Paid amount += JE amount
        // Unpaid amount -= JE amount

        // Amount Paid: 0 += 278,082
        cy.check_cell_contents('Interest schedule', '2020-11-30', amount_paid_cell, '2,685', 'exist');
        // Unpaid Amount: 278,082 -= 278,082
        cy.check_cell_contents('Interest schedule', '2020-11-30', unpaid_amount_cell, '0', 'exist');

        // Amount Paid: 0 += 287,671
        cy.check_cell_contents('Interest schedule', '2021-04-30', amount_paid_cell, '14,481', 'exist');
        // Unpaid Amount: 287,671 -= 287,671
        cy.check_cell_contents('Interest schedule', '2021-04-30', unpaid_amount_cell, '0', 'exist');
    });
});
