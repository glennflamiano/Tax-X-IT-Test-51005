Cypress.Commands.add('resetTermsData', (psId) => { 
    console.log(window.localStorage.token);
    cy.request({
        headers: {
            accept: '*/*',
            authorization: `Token ${window.localStorage.token}`,
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
        },
        referrer: window.url,
        referrerPolicy: "strict-origin-when-cross-origin",
        body: {
            id: psId,
            entity: 1,
            terms: [],
            principalschedule: null,
            interestschedule: null,
        },
        method: "PATCH",
        mode: "cors",
        credentials: "include",
        url: `/webapi/v1/paymentschedule/${psId}/`, 
    }).then((resp)=>{
        expect(resp.status).to.eq(200);
      });
});

Cypress.Commands.add('click_add_je', (table_title, date_string, je_button_text) => {
    return cy.contains(table_title).should('exist').parent().within((el) => {
        cy.get('tbody').contains(date_string).should('exist').siblings().contains(je_button_text).click();
    })
});

Cypress.Commands.add('click_je_link', (table_title, date_string, cell_index, to_click) => {
    return cy.contains(table_title).should('exist').parent().within((el) => {
        cy.get('tbody').contains(date_string).should('exist').siblings().eq(cell_index).within((elTwo) => {
            cy.contains(to_click).should('exist').click();
        });
    })
});

Cypress.Commands.add('count_cell_contents', (table_title, date_string, cell_index, div_length) => {
    return cy.contains(table_title).parent().within((el) => {
        cy.get('tbody').contains(date_string).siblings().eq(cell_index).within((el) => {
            cy.get('div').should('have.length', div_length);
        })
    })
});

Cypress.Commands.add('check_cell_contents', (table_title, date_string, cell_index, to_check, req_exist) => {
    return cy.contains(table_title).parent().within((el) => {
        cy.get('tbody').contains(date_string).siblings().eq(cell_index).contains(to_check).should(req_exist);
    })
});

Cypress.Commands.add('check_jelink_bgcolor', (table_title, date_string, cell_index, to_check, should_have, color) => {
    return cy.contains(table_title).parent().within((el) => {
        cy.get('tbody').contains(date_string).siblings().eq(cell_index).within((elTwo) => {
            cy.contains(to_check).children().should(should_have, 'background-color', color);
        });
    })
});
