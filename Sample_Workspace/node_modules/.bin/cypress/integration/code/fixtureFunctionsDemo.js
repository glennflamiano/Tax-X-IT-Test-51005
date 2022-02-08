//fixture
//it loads the files

var city = require('../../fixtures/city')

describe('Fixture Demo Different Functions', function () {

    it('Require', function () {
        cy.fixture('users').then((json) => {
            cy.intercept('GET', '/users/**', json)
        })
    })

    it('Test1', function(){
        cy.fixture('users').then((user) => {
            user.firstName = 'Carl'
            cy.intercept('GET', '/users/1', user).as('getUser')
        })
        
        cy.visit('/users')
        cy.wait('@getUser').then(({ request }) => {
            expect(request.body.firstName).to.eq('Carl')
        })
    })
})