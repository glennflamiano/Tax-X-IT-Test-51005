/// <reference types="cypress" />

describe('Basic tests', function () {

    it('We have correct page title', () => {
        cy.visit('https://codedamn.com')
        cy.contains('Learn Programming Interactively')
    })

    it('We have correct gotquestions page title', () => {
        cy.visit('https://www.gotquestions.org/whats-new.html')
        cy.contains('What is the gospel of Paul?')
    })

    it('We have correct gotquestions page title', () => {
        cy.visit('https://www.gotquestions.org/whats-new.html')
        cy.contains('Who is Saint Nicholas?')
    })

    it('We have correct software testing page title', () => {
        cy.visit('https://sites.google.com/awsys-i.com/course-software-testing-basics/case-study')
        cy.contains('CASE STUDY/WORKSHOP')
    })

    it('We have correct software testing CASE STUDY', () => {
        cy.visit('https://sites.google.com/awsys-i.com/course-software-testing-basics/case-study')
        cy.contains('CASE STUDY')
    })

    it('We have correct software testing WORKSHOP', () => {
        cy.visit('https://sites.google.com/awsys-i.com/course-software-testing-basics/case-study')
        cy.contains('WORKSHOP').should('exist')
    })


})