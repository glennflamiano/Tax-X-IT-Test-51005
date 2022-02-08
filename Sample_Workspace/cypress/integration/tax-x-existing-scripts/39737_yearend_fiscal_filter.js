/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  
  describe('39737 (Karl) Tests yearend operation page Fiscal Year filter', () => {
    it('39737.1.1 Fiscal filter date should be the same as entity fiscal year date', () => {    
        cy.login();
        cy.visit(`taxx/clientgroup/3/entity/4/yearend-operation/`);
        cy.contains('Closing')
            .invoke('text')
            .then(value => {
                // NOTE: this will fali on leap years
                cy.log(value);
                cy.request({
                    method: 'GET',
                    url: '/webapi/v1/entity/4/',
                    headers: {
                        Authorization: `Token ${window.localStorage.getItem('token')}`
                    }
                }).then((res) => {
                    let filterDate = (value).substr(5, 6).replace('\/', '')
                    const entity = res.body;
                    if (entity.periodend + ''.localeCompare(filterDate + '')) {
                        assert(true, 'Fiscal year end from entity and current filter are the same');
                    } else {
                        assert(false, 'Fiscal year end from entity and current filter are different');
                    }  
                });
            });
    });

    it('39737.1.2 Fiscal filter can select other dates', () => {    
        cy.login();
        cy.visit(`taxx/clientgroup/1/entity/1/yearend-operation/`);
        cy.contains('Monthly');
        cy.get('[data-cy=number-scroller-dropdown]').invoke('show');
        cy.contains('2021').click();
        cy.contains('2021-02-28');
    });

    it('39737.2.1 and 2.2 Months that are not applicable will be grayed out', () => {    
        cy.login();
        cy.visit(`taxx/clientgroup/3/entity/4/yearend-operation/`);
        cy.get('[data-cy=month-picker]').invoke('show');
        cy.contains('All');
        cy.get('[data-cy=month-picker]').contains('2022').first()
            .parent().children().first().click();
        cy.contains('January');
        cy.contains('January').should('have.css', 'color', 'rgb(128, 128, 128)'); // color is gray
    });

    it('39737.3 can display all the generated rows', () => {    
        cy.login();
        cy.visit(`taxx/clientgroup/1/entity/1/yearend-operation/`);

        const year = '2022'
        cy.contains('Closing');
        cy.contains(`${year}-01-31`);
        cy.contains(`${year}-02-28`);
        cy.contains(`${year}-03-31`);
        cy.contains(`${year}-04-30`);
        cy.contains(`${year}-05-31`);
        cy.contains(`${year}-06-30`);
        cy.contains(`${year}-07-31`);
        cy.contains(`${year}-08-31`);
        cy.contains(`${year}-09-30`);
        cy.contains(`${year}-10-31`);
        cy.contains(`${year}-11-30`);
    });

    it('39737.3 can display the month-filtered rows', () => {    
        cy.login();
        cy.visit(`taxx/clientgroup/1/entity/1/yearend-operation/`);
        cy.get('[data-cy=month-picker]').invoke('show');
        cy.contains('All');
        cy.get('[data-cy=month-picker]')
        cy.contains('June').click()
        cy.contains('2022-06-30');
    });
  });
  