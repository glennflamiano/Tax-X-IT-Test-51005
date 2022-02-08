require('cypress-downloadfile/lib/downloadFileCommand')

import 'cypress-file-upload'

describe('Download Demo', function () {
    
    it('Home page has correct elements', () => {
        cy.visit('https://www.fotor.com/features/one-tap-enhance')
        cy.wait(200)
        cy.contains('Free Online Photo Enhancer').should('exist')
        cy.contains('Sign in').click()
        cy.wait(200)
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

        cy.wait(200)
        cy.contains('Enhance Photos Now').click()

        //close pop up
        cy.wait(200)
        cy.get('path[fill-rule=evenodd]').last().click()
    })

    it('File Upload using cypress-file-upload npm package', () => {
        cy.wait(1000)
        const filepath = 'images/memories.png'
        cy.get('input[type="file"]').attachFile(filepath)
       
        //crop
        cy.wait(200)
        cy.get('button#el-collapse-trigger-btn _3Mu_A _2Q_fT GnMym').click()
        //cy.contains('Crop').click()
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