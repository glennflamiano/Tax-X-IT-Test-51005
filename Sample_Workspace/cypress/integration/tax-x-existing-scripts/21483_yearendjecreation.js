Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const getLastRowFields = () => {
    return cy.contains('Calculation logic history').parent().find('tr').last().find('input');
};

let journal_entry_cell = null;
let counter_party = '';

describe('21483 (Hannah) Payment Schedule Year End JE Creation', () => {
    beforeEach(() => {
        // Go to Payment Schedule Page
        cy.login();
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule');
        cy.contains('Test Year End JE Creation (21483)').click();
        cy.wait(3000);
    })
    it('Can create principal schedule rows', () => {
        // Check Page
        cy.contains('Calculation logic history').should('be.visible');
        cy.contains('Principal schedule').should('be.visible');

        // Create Calculation logic history
        cy.contains('Edit').click();
        cy.contains('Calculation logic history').parent().find('.mdi-icon').last().click();
        cy.contains('Calculation logic history').parent().find('.mdi-icon').last().click();
        getLastRowFields().eq(0).type('500000');
        getLastRowFields().eq(2).type('{selectall}{backspace}11/03/2020');
        getLastRowFields().eq(3).type('{selectall}{backspace}12/03/2021');
        cy.contains('Save').last().click();
        cy.get('#confirmBox-confirmBtn').last().click();
        cy.contains('OK').click();

        // Get Journal Entry Column index
        cy.contains('Principal schedule').parent().within((el) => {
            cy.contains('th', 'Journal entry').invoke('index').then((i) => {
                journal_entry_cell = i - 1;
            })
        })
        // Get Counterparty name
        cy.contains('Counterparty').next().then((el) => {
            counter_party = el.text();
        })
        cy.screenshot('PaymentSchedulePage_Principal');
    });
    it('21483.1.a (Test 1/2) Can create only one JE for non year end JE months', () => {
        // Create 1 JE for 2020-11-30
        cy.click_add_je('Principal schedule', '2020-11-30', 'playlist_add');
        cy.contains('OK').click();
        cy.check_cell_contents('Principal schedule', '2020-11-30', journal_entry_cell, 'playlist_add', 'exist');
        cy.check_cell_contents('Principal schedule', '2020-11-30', journal_entry_cell, 'Payment Schedule (loan) principal', 'exist');
        cy.check_cell_contents('Principal schedule', '2020-11-30', journal_entry_cell, 'Payment Schedule (loan) year end', 'not.exist');

        // Create 1 JE for 2020-12-31
        cy.click_add_je('Principal schedule', '2020-12-31', 'playlist_add');
        cy.contains('OK').click();
        cy.check_cell_contents('Principal schedule', '2020-12-31', journal_entry_cell, 'playlist_add', 'exist');
        cy.check_cell_contents('Principal schedule', '2020-12-31', journal_entry_cell, 'Payment Schedule (loan) principal', 'exist');
        cy.check_cell_contents('Principal schedule', '2020-12-31', journal_entry_cell, 'Payment Schedule (loan) year end', 'not.exist');
    });
    it('21483.1.a (Test 2/2) Can create two JEs for year end JE required months', () => {
        // Create 2 JEs for 2021-01-31
        cy.click_add_je('Principal schedule', '2021-01-31', 'playlist_add');
        cy.contains('OK').click();
        cy.check_cell_contents('Principal schedule', '2021-01-31', journal_entry_cell, 'playlist_add', 'exist');
        cy.check_cell_contents('Principal schedule', '2021-01-31', journal_entry_cell, 'Payment Schedule (loan) principal', 'exist');
        cy.check_cell_contents('Principal schedule', '2021-01-31', journal_entry_cell, 'Payment Schedule (loan) year end', 'exist');

        // Create 2 JEs for 2021-05-31
        cy.click_add_je('Principal schedule', '2021-05-31', 'playlist_add');
        cy.contains('OK').click();
        cy.check_cell_contents('Principal schedule', '2021-05-31', journal_entry_cell, 'playlist_add', 'exist');
        cy.check_cell_contents('Principal schedule', '2021-05-31', journal_entry_cell, 'Payment Schedule (loan) principal', 'exist');
        cy.check_cell_contents('Principal schedule', '2021-05-31', journal_entry_cell, 'Payment Schedule (loan) year end', 'exist');
    });
    it('21483.1.b Can apply correct values to year end JEs', () => {
        // Check year end JE numbers for 2021-01-31
        // JEAmount = 39141
        cy.click_je_link('Principal schedule', '2021-01-31', journal_entry_cell, 'Payment Schedule (loan) year end');

        cy.get('[value="2021年12月31日"]').should('exist');       // Date = End of year
        cy.get('[value="'+ counter_party +'"]').should('exist'); // Counter Party = Schedule Counter Party
        cy.get('[value="0"]').should('have.length', 2);          // CT = 0
        cy.contains('DR sum').next().should('contain', '39141'); // Dr Amount = JEAmount
        cy.contains('CR sum').next().should('contain', '39141'); // Cr Amount = JEAmount

        // Check year end JE numbers for 2021-05-31
        // JEAmount = 39141
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule/6');
        cy.wait(2000);
        cy.click_je_link('Principal schedule', '2021-05-31', journal_entry_cell, 'Payment Schedule (loan) year end');

        cy.get('[value="2021年12月31日"]').should('exist');
        cy.get('[value="'+ counter_party +'"]').should('exist');
        cy.get('[value="0"]').should('have.length', 2);
        cy.contains('DR sum').next().should('contain', '39141');
        cy.contains('CR sum').next().should('contain', '39141');
    });
    it('21483.2.a Popup can cancel creation of new JE if JEs exist', () => {
        // Cancel JE creation popup for existing JE 2020-11-30
        cy.click_add_je('Principal schedule', '2020-11-30', 'playlist_add');
        cy.contains('Cancel').last().click();

        cy.check_cell_contents('Principal schedule', '2020-11-30', journal_entry_cell, 'playlist_add', 'exist');
        cy.check_cell_contents('Principal schedule', '2020-11-30', journal_entry_cell, 'Payment Schedule (loan) principal', 'exist');
        cy.check_cell_contents('Principal schedule', '2020-11-30', journal_entry_cell, 'Payment Schedule (loan) year end', 'not.exist');
        cy.count_cell_contents('Principal schedule', '2020-11-30', journal_entry_cell, 4);
    });
    it('21483.2.b Popup can create new JE and ignore existing JEs', () => {
        // Ignore existing JE with popup to create second JE for 2020-11-30
        cy.click_add_je('Principal schedule', '2020-11-30', 'playlist_add');
        cy.contains('Skip').last().click();
        cy.contains('OK').click();

        cy.check_cell_contents('Principal schedule', '2020-11-30', journal_entry_cell, 'playlist_add', 'exist');
        cy.check_cell_contents('Principal schedule', '2020-11-30', journal_entry_cell, 'Payment Schedule (loan) principal', 'exist');
        cy.count_cell_contents('Principal schedule', '2020-11-30', journal_entry_cell, 5);
    });
    it('21483.2.c Popup can overwrite existing JEs', () => {
        // Overwrite existing JEs with popup for 2021-05-31
        cy.click_add_je('Principal schedule', '2021-05-31', 'playlist_add');
        cy.contains('Overwrite').last().click();
        cy.contains('OK').click();

        cy.check_cell_contents('Principal schedule', '2021-05-31', journal_entry_cell, 'playlist_add', 'exist');
        cy.check_cell_contents('Principal schedule', '2021-05-31', journal_entry_cell, 'Payment Schedule (loan) principal', 'exist');
        cy.check_cell_contents('Principal schedule', '2021-05-31', journal_entry_cell, 'Payment Schedule (loan) year end', 'exist');
        cy.count_cell_contents('Principal schedule', '2021-05-31', journal_entry_cell, 5);
    });
});
