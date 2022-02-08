Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

const TT_SEARCH_LINK = 'Search transaction types';
const TT_DOCUMENT_FILTER = 'tt_filter_document_type';

describe('57931 TT search popup on JE detail page', () => {
    beforeEach(() => {
        cy.login();
    });
    it('Shows clickable link ', () => {
        // got to journal entry detail page with id 3085310
        cy.visit('taxx/clientgroup/1/entity/1/journal/3085310/');

        // check that test counter party exists and can navigate to details page with click
        cy.contains(TT_SEARCH_LINK).should('exist');
        cy.contains(TT_SEARCH_LINK).clickAttached();
        /// Todo: Add check for support document
    });

    it('Filters by document type ', () => {
        // check that table is displaying same data as the one loaded from the api
        cy.loadTransactionTypes(3).then((transactiontypes) => {
            cy.get(`[data-cy="${TT_DOCUMENT_FILTER}"]`).last().invoke('show')
            cy.get(`[data-cy="${TT_DOCUMENT_FILTER}"]`).last().children().contains('請求書 (Invoice)').clickAttached()
            // click first row
            cy.contains('span', transactiontypes[0].name).click({force: true})
            cy.get('[data-test-id="dropdown-input-field-je-transaction-type-0"]').invoke('attr', 'placeholder').should('contain', transactiontypes[0].name);
        })
    });
    

});


Cypress.Commands.add('loadTransactionTypes', (documenttypeId) => { 
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
        method: "GET",
        mode: "cors",
        credentials: "include",
        url: `/webapi/v1/journalentrytype/?page=1&ordering=&clientgroups__id=&documenttype__id=${documenttypeId}/`, 
    }).then((resp)=>{
        expect(resp.status).to.eq(200);
        return resp.body.results;
      });
});