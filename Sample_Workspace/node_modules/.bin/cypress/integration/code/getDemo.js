/// <reference types="cypress" />

describe('Basic tests', function () {

    it('We have correct page title', () => {
        cy.visit('https://www.techwithtim.net/tutorials/python-programming/beginner-python-tutorials/variables-data-types/')
    })

    it('We have correct page title2', () => {
        cy.viewport('macbook-15')
        cy.get('div#page').should('exist')
        cy.get('div#notpage').should('not.exist')
        cy.screenshot()
        cy.wait(1000)
    })

    it('Get by specific attributes', () => {
        cy.viewport('iphone-7')
        cy.get('div[id=page]').should('exist')
        cy.screenshot()
        cy.wait(1000)
    })

    it('Get by specific attributes 2', () => {
        cy.viewport(1280, 720)
        cy.get('div#notpage').should('not.exist')
        cy.screenshot()
        cy.wait(1000)
    })

    it('for button', () => {
        cy.contains('Basic Operators & Input')
        cy.screenshot()
        cy.wait(1000)
    })

    it('for button and click', () => {
        cy.get('[class=sow-icon-fontawesome sow-fas]').click()
        cy.screenshot()
        cy.wait(1000)
    })

})