require('cypress-downloadfile/lib/downloadFileCommand')

import 'cypress-file-upload'

var city = require('../../fixtures/city')
var country = require('../../fixtures/country')

describe('Download Demo', function () {
    
    it('And function', () => {
        cy.visit('https://www.fotor.com/features/one-tap-enhance')
        //cy.contains('Free Online Photo Enhancer').should('exist')
        //cy.contains('Sign in').click()
        
        //and functions
        cy.contains('Free Online Photo Enhancer').and('be.visible')
        cy.contains('Enhance Photos Now').and('be.visible')
        cy.contains('Free Online Photo Enhancerzzz').and('be.visible')
    })

    it('And function more connections', () => {
        cy.get('nav') // yields <nav>
            .should('be.visible') // yields <nav>
            .and('have.css', 'font-family') // yields 'sans-serif'
            .and('match', /Arial/) // yields 'sans-serif'
    })

    it('And function using buttons', () => {
        cy.get('button').should('have.class', 'DesktopHeader_signInButton__3wIOf').and('not.be.disabled')
    })

    it('as function', () => {
        cy.contains('Free Online Photo Enhancer').as('mainTitle')
        cy.get('@mainTitle').should('exist')
    })

    it('as function get india address file using fixture.', () => {
        cy.fixture('../fixtures/city.json').as('india')
        cy.get('@india').then((users) => {
          cy.log(`There are ${users.length} admins.`)
          cy.log(`The contents are ${users}.`)
          cy.log(`The contents are ${users.name}.`)
          cy.log(`The contents are ${users.favorite}.`)
          expect(users.name).to.deep.equal('New Delhi')
          expect(users.favorite).to.deep.equal('Utopia')
        })
    })

    it('check function on radio buttons and checkboxes.', () => {
        cy.visit('https://www.ironspider.ca/forms/checkradio.htm')

        //check all checkboxes
        cy.get('[type="checkbox"]').check()

        //select all radio buttons, note: the end result is the last radio is selected
        //because only one should be selected
        cy.get('[type="radio"]').check()
    })

    it('verify if all checkboxes buttons are checked.', () => {
        cy.get('input[value=red]').should('be.checked')
        cy.get('input[value=yellow]').should('be.checked')
        cy.get('input[value=blue]').should('be.checked')
        cy.get('input[value=orange]').should('be.checked')
        cy.get('input[value=green]').should('be.checked')
        cy.get('input[value=purple]').should('be.checked')
    })

    it('verify if last radio button is selected.', () => {
        cy.get('input[type=radio]').should('not.be.checked').and('have.text', 'Internet Explorer')
        cy.get('input[type=radio]').should('not.be.checked')
        cy.get('input[type=radio]').should('be.checked')
    })

    it('uncheck function on radio buttons and checkboxes.', () => {
        //check all checkboxes
        cy.get('[type="checkbox"]').uncheck()
    })

    it('verify if all checkboxes buttons are unchecked.', () => {
        cy.get('input[value=red]').should('not.be.checked')
        cy.get('input[value=yellow]').should('not.be.checked')
        cy.get('input[value=blue]').should('not.be.checked')
        cy.get('input[value=orange]').should('not.be.checked')
        cy.get('input[value=green]').should('not.be.checked')
        cy.get('input[value=purple]').should('not.be.checked')
    })

    it('children function', () => {
        cy.get('blockquote[class=Example]').children()
    })

    it('children function pt2', () => {
        cy.get('div[class=NavBarPath]').children().should('have.length', 4)
    })

    it('children function pt3 with error', () => {
        cy.get('div[class=NavBarPath]').children().should('have.length', 5)
    })

})