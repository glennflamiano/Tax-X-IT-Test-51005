// <reference types="cypress" />

describe('Basic tests', function () {

    it('Home page has correct elements', () => {
        cy.visit('https://www.fotor.com/features/one-tap-enhance')
        cy.wait(200)
        cy.contains('Free Online Photo Enhancer').should('exist')
        cy.contains('Sign in').click()
        cy.wait(200)
    })

    it('check if links are correct', () => {
        cy.wait(200)
        cy.url().should('include','/one-tap-enhance')
        cy.url().then((value) => {
            cy.log('The current real URL is: ', value)
        })
    })

    it('Type in the fields', () => {
        cy.wait(200)
        cy.get('input[type=text]').type('admin@gmail.com')
        cy.get('input[type=password]').type('admin123')
    })

    it('Check invalid sign in', () => {
        cy.wait(200)
        cy.get('.info').last().click()
        cy.wait(200)
        cy.contains('Account or password is invalid').should('exist')
    })

    it('Check successful sign in', () => {
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

        //check if the logged in username is displayed
        cy.contains('Kazuto-Chan').should('exist')
    })

    //Opens new window and this elements cannot be checked
    it('Sign up with Facebook', () => {
        cy.contains('Sign in with Facebook').click()
        cy.wait(200)
        cy.contains('Email or phone:').should('exist')
        cy.contains('Password:').should('exist')
        cy.contains('Log In').should('exist')
        cy.contains('Create new account').click()
    })

    //Note codedamn website throws web page visit error
    it('Visit codedamn', () => {
        cy.wait(200)
        cy.visit('https://codedamn.com/playgrounds')
    })

    //check playground elements and set timeout
    it('Test playground', () => {
        cy.wait(200)
        cy.get('div')
        //cy.pause()
        cy.debug()

        cy.log('Checking sidebar')
        cy.contains('Dashboard').should('exist')
        cy.contains('Social').should('exist')
        cy.contains('Courses').should('exist')

        cy.log('Checking main page')
        cy.contains('Solidity').should('exist')
        cy.contains('React').should('exist')

        //go to Node.js page and check time out
        // 6 * 1000 means 6 seconds or 6000 miliseconds
        cy.contains('Node.js', { timeout: 6 * 1000 }).click()
        cy.contains('MEAN Stack', { timeout: 6 * 1000 }).click()
    })

})