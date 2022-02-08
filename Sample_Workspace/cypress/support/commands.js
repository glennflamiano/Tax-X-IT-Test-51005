// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import './paymentschedulecommands';

Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: '/webapi/v1/auth/login/',
        headers: {
            Authorization: 'Basic YWRtaW46YWRtaW4='
        }
    }).then((resp) => {
        window.localStorage.setItem('token', resp.body.token);
    });
});

Cypress.Commands.add('clickAttached', { prevSubject: 'element' }, (subject) => {
    cy.wrap(subject).should(($el) => {
        // Ensure the element is attached
        expect(Cypress.dom.isDetached($el)).to.be.false;

        // Using Jquery .click() here so no queuing from cypress side and not chance for the element to detach
        $el.click();
    });
});
