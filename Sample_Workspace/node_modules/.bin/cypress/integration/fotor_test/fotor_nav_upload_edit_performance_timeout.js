require('cypress-downloadfile/lib/downloadFileCommand')

import 'cypress-file-upload'

describe('Download Demo', function () {
    
    it('Visit page', () => {
        cy.visit('https://www.fotor.com/features/one-tap-enhance', { timeout: 5 * 1000 })
    })

    it('Find label', () => {
        cy.contains('Free Online Photo Enhancer', { timeout: 5 * 1000 }).should('exist')
    })

    it('Find Sign in', () => {
        cy.contains('Sign in', { timeout: 1 * 1000 }).click()
    })

    it('Sign in input random values', () => {
        cy.get('input[type=text]', { timeout: 5 * 1000 }).type('fgfdgggfggfghgfd')
        cy.get('input[type=password]', { timeout: 5 * 1000 }).type('gdfgfgfdggdfgdfgdgfd')
    })

    it('Clear input values', () => {
        cy.get('input[type=text]', { timeout: 5 * 1000 }).focus().clear()
        cy.get('input[type=password]', { timeout: 5 * 1000 }).focus().clear()
    })

    it('Input valid values', () => {
        cy.get('input[type=text]', { timeout: 5 * 1000 }).type('alvinflamiano@gmail.com')
        cy.get('input[type=password]', { timeout: 5 * 1000 }).type('kolnerdom')
        cy.get('.info', { timeout: 5 * 1000 }).last().click()
    })

    it('Check successful sign in', () => {
        //check if the logged in username is displayed
        cy.contains('Kazuto-Chan', { timeout: 5 * 1000 }).should('exist')
        cy.contains('Enhance Photos Now', { timeout: 5 * 1000 }).click()
    })

    it('Close ad pop up', () => {
        //close pop up
        cy.get('path[fill-rule=evenodd]', { timeout: 5 * 1000 }).last().click()
    })

    it('File Upload using cypress-file-upload npm package', () => {
        cy.wait(1000)
        const filepath = 'images/memories.png'
        cy.get('input[type="file"]').attachFile(filepath)
       
        //crop
        cy.wait(200)
        cy.contains('Crop').as('cropNav')
        cy.get('@cropNav').children()
        cy.get('@cropNav').click()
        //cy.wait(200)
        //cy.contains('Got it').click()
        //cy.wait(200)
        //cy.wait(1000)
        cy.contains('3 x 4').last().click()

        //apply changes
        cy.wait(200)
        cy.contains('Apply').last().click()

    })

})