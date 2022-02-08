Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

// this tests creates new departments in the entityid 1 and deletes them without saving.
// this should minize dependency on fixture or backend data.

describe('(Nubli) Entity admin tests', () => {
    it('When adding multiple departments, bank/trustbank/loan/bond subaccounts cannot be shared between them', () => {
        // Navigate to list
        cy.login();
        cy.visit('/taxx/admin/entityadmin/1/');
        const depName1 = `1 Name in Japanese ${Date.now()}`;
        const depName2 = `2 Name in Japanese ${Date.now()}`;
        cy.get('#entityadminpage-entity-1-addfirstdepartment-button, #entityadminpage-entity-1-addnextdepartment-button').then((e) => {
            Cypress.$(e).click();
        });
        cy.get('#entityadminpage-entity-department-name-jp-field').type(depName1);
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);
        cy.contains(depName1).should('exist');
        cy.get('#entityadminpage-entity-1-addnextdepartment-button').click();
        cy.get('#entityadminpage-entity-department-name-jp-field').type(depName2);
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);
        cy.contains(depName2).should('exist');

        // open the popup for depName1 and create 1 of each bank/trustbank/bond/loan
        cy.contains(depName1).parent().contains('Detailed info').click();
        cy.contains('Bank information')
            .parent()
            .parent()
            .within(() => {
                cy.get('button').click();
            });
        cy.contains('Trust bank information')
            .parent()
            .parent()
            .within(() => {
                cy.get('button').click();
            });
        cy.contains('Bond information')
            .parent()
            .parent()
            .within(() => {
                cy.get('button').click();
            });
        cy.contains('Loan information')
            .parent()
            .parent()
            .within(() => {
                cy.get('button').click();
            });
        // choose subaccount options for bank/trustbank/bond/loan
        cy.contains('option', /^普通預金1$/)
            .parent()
            .select('普通預金1');
        cy.contains('option', /^信託預金2$/)
            .parent()
            .select('信託預金2');
        cy.contains('option', /^社債3$/).parent().select('社債3');
        cy.contains('option', /^長期借入金4$/)
            .parent()
            .select('長期借入金4');

        // close dep1 and open dep2
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);
        cy.contains(depName2).parent().contains('Detailed info').click();
        // create 1 of each bank/trustbank/bond/loan
        cy.contains('Bank information')
            .parent()
            .parent()
            .within(() => {
                cy.get('button').click();
            });
        cy.contains('Trust bank information')
            .parent()
            .parent()
            .within(() => {
                cy.get('button').click();
            });
        cy.contains('Bond information')
            .parent()
            .parent()
            .within(() => {
                cy.get('button').click();
            });
        cy.contains('Loan information')
            .parent()
            .parent()
            .within(() => {
                cy.get('button').click();
            });
        // the options chosen for dep1 should be missing from the dropdowns here
        cy.get('#kitui-popup-window-grey-bg').within(() => {
            cy.contains('option', /^普通預金1$/).should('not.exist');
            cy.contains('option', /^信託預金2$/).should('not.exist');
            cy.contains('option', /^社債3$/).should('not.exist');
            cy.contains('option', /^長期借入金4$/).should('not.exist');
        });

        cy.get('#kitui-popup-window-grey-bg').click(5, 5);
        // open the popup for depName1 again to change the subaccounts chosen
        cy.contains(depName1).parent().contains('Detailed info').click();
        cy.contains('option', /^普通預金2$/)
            .parent()
            .select('普通預金2');
        cy.contains('option', /^信託預金3$/)
            .parent()
            .select('信託預金3');
        cy.contains('option', /^社債4$/).parent().select('社債4');
        cy.contains('option', /^長期借入金5$/)
            .parent()
            .select('長期借入金5');

        // close dep1 and open dep2
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);
        cy.contains(depName2).parent().contains('Detailed info').click();
        // the options 1,2,3,4 should now be presentin  the dropdowns here
        cy.get('#kitui-popup-window-grey-bg').within(() => {
            cy.contains('option', /^普通預金1$/).should('exist');
            cy.contains('option', /^信託預金2$/).should('exist');
            cy.contains('option', /^社債3$/).should('exist');
            cy.contains('option', /^長期借入金4$/).should('exist');
        });
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);

        // delete the new deps
        cy.contains(depName1).parent().contains('remove_circle_outline').should('exist');
        cy.contains(depName1).parent().contains('remove_circle_outline').click();
        cy.contains(depName2).parent().contains('remove_circle_outline').should('exist');
        cy.contains(depName2).parent().contains('remove_circle_outline').click();
        // check if deletion is done
        cy.contains(depName1).should('not.exist');
        cy.contains(depName2).should('not.exist');
    });

    it('When adding multiple departments, subaccounts cannot be shared between them', () => {
        // Navigate to list
        cy.login();
        cy.visit('/taxx/admin/entityadmin/1/');
        const depName1 = `1 Name in Japanese ${Date.now()}`;
        const depName2 = `2 Name in Japanese ${Date.now()}`;
        cy.get('#entityadminpage-entity-1-addfirstdepartment-button, #entityadminpage-entity-1-addnextdepartment-button').then((e) => {
            Cypress.$(e).click();
        });
        cy.get('#entityadminpage-entity-department-name-jp-field').type(depName1);
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);
        cy.contains(depName1).should('exist');
        cy.get('#entityadminpage-entity-1-addnextdepartment-button').click();
        cy.get('#entityadminpage-entity-department-name-jp-field').type(depName2);
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);
        cy.contains(depName2).should('exist');

        // open the popup for depName1 and set its subaccount to bumon6
        cy.contains(depName1).parent().contains('Detailed info').should('exist');
        cy.contains(depName1).parent().contains('Detailed info').click();
        cy.contains('Sub-account')
            .parent()
            .within(() => {
                cy.get('select').select('部門6');
            });
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);

        // open the popup for depName2 and make sure bumon6 is missing
        cy.contains(depName2).parent().contains('Detailed info').should('exist');
        cy.contains(depName2).parent().contains('Detailed info').click();
        cy.contains('Sub-account')
            .parent()
            .within(() => {
                cy.get('option').within(() => {
                    cy.contains('部門6').should('not.exist');
                });
            });
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);

        // change depName1's subaccount to something else and check to see that bumon6
        // is now present in depName2's dropdown
        cy.contains(depName1).parent().contains('Detailed info').click();
        cy.contains('Sub-account')
            .parent()
            .within(() => {
                cy.get('select').select('部門1');
            });
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);
        cy.contains(depName2).parent().contains('Detailed info').click();
        cy.contains('Sub-account')
            .parent()
            .within(() => {
                cy.get('option').within(() => {
                    cy.contains('部門6').should('exist');
                });
            });
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);

        // delete the new deps
        cy.contains(depName1).parent().contains('remove_circle_outline').should('exist');
        cy.contains(depName1).parent().contains('remove_circle_outline').click();
        cy.contains(depName2).parent().contains('remove_circle_outline').should('exist');
        cy.contains(depName2).parent().contains('remove_circle_outline').click();
        // check if deletion is done
        cy.contains(depName1).should('not.exist');
        cy.contains(depName2).should('not.exist');
    });

    it('Depreciation method list appears when "Applicable" is selected and disappears when "Inapplicable" is selected', () => {
        cy.login();
        cy.visit('/taxx/admin/entityadmin/1/');
        cy.contains('Depreciation method change')
            .parent()
            .within(() => {
                cy.get('label').first().click();
            });
        cy.contains('Depreciation method to apply').should('exist');
        cy.contains('Depreciation method change')
            .parent()
            .within(() => {
                cy.get('label').eq(1).click();
            });
        cy.contains('Depreciation method to apply').should('not.exist');
    });

    it('End date of fiscal year shows error message when invalid MMDD format is entered', () => {
        cy.login();
        cy.visit('/taxx/admin/entityadmin/1/');
        cy.get('#entityadminpage-entity-1-periodend-accountinfo-input').type('abcd');
        cy.get('#entityadminpage-entity-1-periodend-accountinfo-input').parents('td').contains('Invalid MMDD date').should('exist');
    });

    it('Can add a new department to entity and then remove it', () => {
        // Navigate to list
        cy.login();
        cy.visit('/taxx/admin/entityadmin/1/');
        cy.get('#entityadminpage-entity-1-addfirstdepartment-button').then((e) => {
            Cypress.$(e).click();
        });
        const depName = `Name in Japanese ${Date.now()}`;
        cy.get('#entityadminpage-entity-department-name-jp-field').type(depName);
        cy.get('#kitui-popup-window-grey-bg').click(5, 5);
        cy.contains(depName).should('exist');

        // delete the new dep
        cy.contains(depName).parent().contains('remove_circle_outline').should('exist');
        cy.contains(depName).parent().contains('remove_circle_outline').click();
        // check if deletion is done
        cy.contains(depName).should('not.exist');
    });
});
