//fixture
//it loads the files

var city = require('../../fixtures/city')
var country = require('../../fixtures/country')

describe('Fixture Demo', function () {

    //this checks the specific json property
    it('Require for city', function () {
        expect(city.name).to.deep.equal('New Delhi')
    })

    it('Require for country', function () {
        expect(country.name).to.deep.equal('India')
    })

    it('Require', function () {
        expect(city.name).to.deep.equal('Los Santos')
    })

    it('Require', function () {
        expect(city.name).to.deep.equal('New Delhi')
        expect(city.favorite).to.deep.equal('Utopia')
    })

    //nested fixture sample
    it('Fixture file has City and Country', function () {
        cy.fixture("country").then(function(country) {
            cy.fixture("city").then(function(city) {
                expect({ city, country }).to.deep.equal({ 
                    city: { name: 'New Delhi' }, 
                    country: { name: 'India' },
                })
            })
        })
    })

    //for these functions the whole json must be equals to, not the specific json
    //pass sample
    it('Fixture file has City', function () {
        cy.fixture("city").then(function() {
            expect(city).to.deep.equal({ name: 'New Delhi', favorite : 'Utopia'})
        })
    })

    it('Fixture file has Country', function () {
        cy.fixture("country").then(function() {
            expect(country).to.deep.equal({ name: 'India'})
        })
    })

    //fail sample
    it('Fixture file has City', function () {
        cy.fixture("city").then(function() {
            expect(city).to.deep.equal({name: 'New Delhi', favorite : 'New Delhi'})
        })
    })

})