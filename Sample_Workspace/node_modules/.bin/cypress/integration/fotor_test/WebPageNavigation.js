// <reference types="cypress" />

describe('Web Navigation', function () { 
    
    //login
    it('Check successful sign in', () => {
        cy.visit('https://www.fotor.com/features/one-tap-enhance')
        cy.wait(200)
        cy.contains('Sign in').click()
        cy.wait(200)

        //clear input fields
        cy.get('input[type=text]').focus().clear()
        cy.get('input[type=password]').focus().clear()

        cy.wait(200)
        cy.get('input[type=text]').type('alvinflamiano@gmail.com')
        cy.get('input[type=password]').type('kolnerdom')
        cy.wait(200)
        cy.get('.info').last().click()
        cy.wait(200)
    })
    
    // click enhance photos now
    it('web page navigation', () => {
        cy.wait(200)
        cy.contains('Enhance Photos Now').click()
        cy.wait(200)
        cy.get('path[fill-rule=evenodd]').last().click()
        cy.wait(200)
        cy.go('back')
        cy.wait(200)
        cy.contains('Enhance Photos Now').should('exist')
        cy.go('forward')
        cy.wait(200)
        cy.contains('Drag or upload your own images').should('exist')
    })

})