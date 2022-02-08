Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

describe('31153 (Diego) Calculation Logic History deletion', () => {
    beforeEach(() => {
        // Go to File Page
        cy.login();
    });

    // it('31153 Prepaid: Delete row after creating Calculation logic history', () => {
    //     cy.visit('/taxx/clientgroup/1/entity/1/payschedule/8').then(() =>{
    //         cy.get('body').find('.edit-button').its('length').then(res => {
    //             if(res > 0) {
    //                 cy.contains('Payment Schedule (loan)').should('be.visible');
    //                 cy.get('.edit-button').contains('Edit').should('be.visible').click();
    //                 cy.get('.add-terms-button').click();
    //                 cy.get('.calculation-logic-history-row').its('length').then(result => {
    //                     if(result == 1) {
    //                         cy.get('.add-terms-button').click();
    //                     }
    //                     cy.get('.delete-calculation-logic-row').should('be.visible').last().click();
    //                     // there should only be 1 row after deletion
    //                     cy.get('.calculation-logic-history-row').its('length').should('be.lt', 2);
    //                     cy.get('.save-button').first().should('be.visible').click();
    //                     cy.get('#confirmBox-confirmBtn').first().should('be.visible').click();
    //                     cy.get('#alertBox-confirmBtn').first().should('be.visible').click();
    //                 })
                    
    //             }
    //         })
    //     });
    // });

    // it('31153 Prepaid: Delete existing Calculation logic history', () => {
    //     cy.visit('/taxx/clientgroup/1/entity/1/payschedule/8').then(() =>{
    //         cy.get('body').find('.edit-button').its('length').then(res => {
    //             if(res > 0) {
    //                 cy.contains('Payment Schedule (loan)').should('be.visible');
    //                 cy.get('.edit-button').contains('Edit').should('be.visible').click();
    //                 cy.get('.add-terms-button').click();
    //                 cy.get('.calculation-logic-history-row').its('length').should('be.gt', 0);
    //                 cy.get('.period-value-input').type(20000).blur();
    //                 cy.get('.save-button').first().should('be.visible').click();
    //                 cy.get('#confirmBox-confirmBtn').first().should('be.visible').click();
    //                 cy.get('#alertBox-confirmBtn').first().should('be.visible').click();
    //                 cy.get('.prepaid-principal-schedule-row').its('length').should('be.gt', 0);
    //                 cy.get('.delete-calculation-logic-row').should('be.visible').last().click();
    //                 cy.get('#confirmBox-confirmBtn').first().should('be.visible').click();
    //                 cy.get('#alertBox-confirmBtn').first().should('be.visible').click();
    //                 cy.get('.prepaid-principal-schedule-row').should('not.exist');
    //             }
    //         })
    //     });
    // });
    
    // it('31153 Prepaid: Cannot Delete when JE exists', () => {
    //     cy.visit('/taxx/clientgroup/1/entity/1/payschedule/8').then(() =>{
    //         cy.get('body').find('.edit-button').its('length').then(res => {
    //             if(res > 0) {
    //                 cy.contains('Payment Schedule (loan)').should('be.visible');
    //                 cy.get('.edit-button').contains('Edit').should('be.visible').click();
    //                 cy.get('.add-terms-button').click();
    //                 cy.get('.calculation-logic-history-row').its('length').should('be.gt', 0);
    //                 cy.get('.period-value-input').type(20000).blur();
    //                 cy.get('.save-button').first().should('be.visible').click();
    //                 cy.get('#confirmBox-confirmBtn').first().should('be.visible').click();
    //                 cy.get('#alertBox-confirmBtn').first().should('be.visible').click();
    //                 cy.get('.prepaid-principal-schedule-row').its('length').should('be.gt', 0);
    //                 cy.get('.prepaid-principal-schedule-row').find('button').click()
    //                 cy.get('#alertBox-confirmBtn').first().should('be.visible').click();
    //                 cy.get('.delete-calculation-logic-row').last().should('have.class', 'disabled');
    //             }
    //         })
    //     });
    // });

    it('31153 Loan/Bond: Delete row after creating Calculation logic history', () => {
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule/9').then(() =>{
            cy.get('body').find('.edit-button').its('length').then(res => {
                if(res > 0) {
                    cy.contains('Payment Schedule (loan)').should('be.visible');
                    cy.get('.edit-button').contains('Edit').should('be.visible').click();
                    cy.get('.add-terms-button').click();
                    cy.get('.calculation-logic-history-row').its('length').then(result => {
                        if(result == 1) {
                            cy.get('.add-terms-button').click();
                        }
                        cy.get('.delete-calculation-logic-row').should('be.visible').last().click();
                        // there should only be 1 row after deletion
                        cy.get('.calculation-logic-history-row').its('length').should('be.lt', 2);
                        cy.get('.save-button').first().should('be.visible').click();
                        cy.get('#confirmBox-confirmBtn').first().should('be.visible').click();
                        cy.get('#alertBox-confirmBtn').first().should('be.visible').click();
                    })
                    
                }
            })
        });
    });

    it('31153 Loan/Bond: Delete existing Calculation logic history', () => {
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule/9').then(() =>{
            cy.get('body').find('.edit-button').its('length').then(res => {
                if(res > 0) {
                    cy.contains('Payment Schedule (loan)').should('be.visible');
                    cy.get('.edit-button').contains('Edit').should('be.visible').click();
                    cy.get('.add-terms-button').click();
                    cy.get('.calculation-logic-history-row').its('length').should('be.gt', 0);
                    cy.get('.period-value-input').last().type('{selectall}{backspace}20000').blur();
                    cy.get('.period-from-input').last().type('{selectall}{backspace}2020/12/20').blur();
                    cy.get('.period-to-input').last().type('{selectall}{backspace}2021/01/20').blur();
                    cy.get('.save-button').first().should('be.visible').click();
                    cy.get('#confirmBox-confirmBtn').first().should('be.visible').click();
                    cy.get('#alertBox-confirmBtn').first().should('be.visible').click();
                    cy.get('.loanbond-interest-schedule-row').its('length').should('be.gt', 1);
                    cy.get('.delete-calculation-logic-row').should('be.visible').last().click();
                    cy.get('#confirmBox-confirmBtn').first().should('be.visible').click();
                    cy.get('#alertBox-confirmBtn').first().should('be.visible').click();
                    cy.get('.loanbond-interest-schedule-row').its('length').should('be.lt', 2);
                }
            })
        });
    });

    it('31153 Loan/Bond: Cannot Delete when JE exists', () => {
        cy.visit('/taxx/clientgroup/1/entity/1/payschedule/9').then(() =>{
            cy.get('body').find('.edit-button').its('length').then(res => {
                if(res > 0) {
                    cy.contains('Payment Schedule (loan)').should('be.visible');
                    cy.get('.edit-button').contains('Edit').should('be.visible').click();
                    cy.get('.add-terms-button').click();
                    cy.get('.calculation-logic-history-row').its('length').should('be.gt', 0);
                    cy.get('.period-value-input').last().type('{selectall}{backspace}20000').blur();
                    cy.get('.period-from-input').last().type('{selectall}{backspace}2020/12/20').blur();
                    cy.get('.period-to-input').last().type('{selectall}{backspace}2021/01/20').blur();
                    cy.get('.save-button').first().should('be.visible').click();
                    cy.get('#confirmBox-confirmBtn').first().should('be.visible').click();
                    cy.get('#alertBox-confirmBtn').first().should('be.visible').click();
                    cy.wait(2000);
                    cy.get('.loanbond-interest-schedule-row').its('length').should('be.gt', 1);
                    cy.get('.loanbond-interest-schedule-row').last().find('button').contains('Accrued JE').click()
                    cy.get('#alertBox-confirmBtn').first().should('be.visible').click();
                    cy.get('.delete-calculation-logic-row').last().should('have.class', 'disabled');
                }
            })
        });
    });
});
