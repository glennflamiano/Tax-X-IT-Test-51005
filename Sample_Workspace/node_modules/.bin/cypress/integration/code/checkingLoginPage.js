/// <reference types="cypress" />

describe('Basic tests', function () {

    it('go to site', () => {
        cy.visit('https://codedamn.com')
    })

    it('We have correct page title', () => {
        cy.viewport(1280, 720)
        cy.wait(200)
        cy.contains('Sign in').should('exist')
        cy.contains('Sign in').click()
        cy.wait(200)
        cy.contains('Sign in to your account').should('exist')
    })

})