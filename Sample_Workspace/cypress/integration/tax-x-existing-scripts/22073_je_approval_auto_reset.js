Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const clickSaveJeBtn = () => {
    cy.contains('Save').should('exist').parent().click();
    cy.contains('OK').should('exist').parent().click();
};

const getTestResult = () => {
    // check whether the status has been changed to unapprove
    cy.request({
        method: 'GET',
        url: '/webapi/v1/journalentry/3662405/',
        headers: {
            Authorization: `Token ${window.localStorage.getItem('token')}`
        }
    }).then((res) => {
        expect(res.body.status).to.eq(1);
    });
};

describe('22073 (Aubrey) JE status goes "unapproved" when any edit occurs', () => {
    beforeEach(() => {
        cy.login();
    });
    beforeEach(() => {
        // make sure test je status is approved
        cy.request({
            method: 'PATCH',
            url: '/webapi/v1/journalentry/3662405/',
            body: {
                status: 2,
            },
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        });
    });
    beforeEach(() => {
        cy.visit('/taxx/clientgroup/4/entity/6/journal/3662405');
        // this wait can make sure that get test function runs after page finished loading
        cy.wait(500);
    });
    it('Change Remark to make sure whether it will change status automatically', () => {
        let remarkInput = cy.get('[data-cy=docchooser_remark]').first().find('input');
        remarkInput.should('exist');
        remarkInput.clear();
        remarkInput.type(String(new Date().getTime()));
        clickSaveJeBtn();
        getTestResult();
    });
    it('Change Transaction one value to make sure whether it will change status automatically', () => {
        cy.get('[data-cy=transaction-input7]')
            .invoke('val')
            .then((text) => {
                if (text + '' === '100') {
                    cy.get('[data-cy=transaction-input7]').clear();
                    cy.get('[data-cy=transaction-input7]').type(101);
                    cy.get('[data-cy=transaction-input7]').next().contains(/^101 /).click();
                } else {
                    cy.get('[data-cy=transaction-input7]').clear();
                    cy.get('[data-cy=transaction-input7]').type(100);
                    cy.get('[data-cy=transaction-input7]').next().contains(/^100 /).click();
                }
                clickSaveJeBtn();
                getTestResult();
            });
    });
    it('Change Secord Principle Doc Rule to make sure whether it will change status automatically', () => {
        cy.get('[data-cy=je-docchooser-rule]').last().should('exist');
        cy.get('[data-cy=je-docchooser-rule]').last().select('4524132');
        clickSaveJeBtn();
        cy.wait(500);
        cy.get('[data-cy=je-docchooser-rule]').last().should('exist');
        cy.get('[data-cy=je-docchooser-rule]').last().select('');
        clickSaveJeBtn();
        getTestResult();
    });
});
