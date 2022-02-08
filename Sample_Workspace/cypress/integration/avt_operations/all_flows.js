require('cypress-downloadfile/lib/downloadFileCommand')

import 'cypress-file-upload'

describe('Download Demo', function () {

    it('Visit AVT site.', () => {
        cy.visit('https://avt-test.azurewebsites.net/new')
    })

    it('Sign In', () => {
        cy.get('input[name=username]').type('avatar')
        cy.get('input[name=password]').type('7xtU3s@9')
        cy.contains('Sign In').click()
        cy.screenshot()
        cy.wait(200)
    })

    it('Add dialogues', () => {
        cy.contains('Add Talk Text').click()
        cy.get('textarea[id=talk-text]').type('Hello my name is Dennis Chambers!')
        cy.screenshot()
        cy.wait(200)
        cy.get('span[class=MuiButton-label]').last().click()

        cy.contains('Add Talk Text').click()
        cy.get('textarea[id=talk-text]').type('Hello Dennis, nice to meet you. My name is Tony Williams!')
        cy.screenshot()
        cy.wait(200)
        cy.get('span[class=MuiButton-label]').last().click()
    })

    it('Play dialogue', () => {
        cy.contains('Listen to Scenario').click()
        cy.screenshot()
        cy.wait(200)
    })

    //Add new avatar button is not clickable
    //it('Create English Male Avatar', () => {
        //cy.get('svg[class=MuiSvgIcon-root]').first().click()
        //cy.contains('Settings').click()
        //cy.get('main[class=jss10]').scrollIntoView({ offset: { top: 0, left: 0 } })
        //cy.get('button[type=button]').eq(5).click({force: true})
        //MuiTouchRipple-root
        //cy.get('span[class=button]').eq(5).click({force: true})

        //cy.contains(' Add New Speaker ').click()
        //cy.wait(1000)
        //cy.get('input[type=button]').first().click()
        //cy.get('input[type=text]').first().type('Hezekiah')
    //})
    it('Delete Created Avatars (If already exists)', () => {
        //call two times to ensure the buttons and elements are visible
        cy.contains('Settings').click()
        cy.contains('Settings').click()
        cy.contains('Hezekiah').click()
        cy.contains('Delete').click()
        cy.screenshot()
        cy.wait(200)
        cy.contains('Yes').click()
        cy.contains('Jeroboam').click()
        cy.contains('Delete').click()
        cy.screenshot()
        cy.wait(200)
        cy.contains('Yes').click()
    })

    it('Create 1st Avatar', () => {
        //call two times to ensure the buttons and elements are visible
        cy.contains('Settings').click()
        cy.screenshot()
        cy.wait(200)
        cy.contains('Settings').click()
        cy.get('main[class=jss10]').scrollIntoView({ offset: { top: 0, left: 0 } })
        cy.get('button[type=button]').eq(5).click({force: true})
        //cy.contains(' Add New Speaker ').click()
        cy.wait(1000)
        //cy.get('input[type=button]').first().click()
        cy.get('input[type=text]').first().type('Hezekiah')
        cy.screenshot()
        cy.wait(200)
        //.MuiSelect-nativeInput
        //cy.get('input[value=MuiSelect-nativeInput]').click()
        cy.contains('Save').click()
        cy.screenshot()
        cy.wait(200)
        //cy.contains('Settings').click()
        cy.contains('Yes').click()
        cy.screenshot()
        cy.wait(200)
    })

    it('Create 2nd Avatar', () => {
        //call two times to ensure the buttons and elements are visible
        cy.contains('Settings').click()
        cy.contains('Settings').click()
        cy.screenshot()
        cy.wait(200)
        cy.get('main[class=jss10]').scrollIntoView({ offset: { top: 0, left: 0 } })
        cy.get('button[type=button]').eq(5).click({force: true})
        //cy.contains(' Add New Speaker ').click()
        cy.wait(1000)
        //cy.get('input[type=button]').first().click()
        cy.get('input[type=text]').first().type('Jeroboam')
        cy.screenshot()
        cy.wait(200)
        //.MuiSelect-nativeInput
        //cy.get('input[value=MuiSelect-nativeInput]').click()
        cy.contains('Save').click()
        cy.screenshot()
        cy.wait(200)
        //cy.contains('Settings').click()
        cy.contains('Yes').click()
        cy.screenshot()
        cy.wait(200)
    })

    it('Verify if both avatars are created', () => {
        //call two times to ensure the buttons and elements are visible
        cy.contains('Settings').click()
        cy.contains('Settings').click()
        cy.contains('Hezekiah').should('exist')
        cy.screenshot()
        cy.wait(200)
        cy.contains('Jeroboam').should('exist')
        cy.screenshot()
        cy.wait(200)
    })

    it('Create New Scenario', () => {
        //call two times to ensure the buttons and elements are visible
        cy.contains('Home').click()
        cy.screenshot()
        cy.wait(200)
        cy.contains('New Project').click()
        cy.screenshot()
        cy.wait(200)
        cy.get('input[id=prefix-text]').focus().clear()
        cy.get('input[id=prefix-text]').type('MyScenario')
        cy.screenshot()
        cy.wait(200)
        cy.contains('Import Existing Scenario').click()
        cy.screenshot()
        cy.wait(200)

        //import from fixtures
        const filepath = 'files/GlennTalk'
        cy.get('input[type="file"]').attachFile(filepath)
        cy.screenshot()
        cy.wait(200)
    })

    //it('Check if newly created avatar exists', () => {
        //call two times to ensure the buttons and elements are visible
        //cy.contains('Cancel').click()

        //cy.contains('Add Talk Text').click()
        //cy.get('textarea[id=talk-text]').type('Hello my name is Dennis Chambers!')
        //cy.get('span[class=MuiButton-label]').last().click()

        //check if created avatar exists
        //cy.get('div[class=MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input]').click()  
    //})

    it('Go back to Home Page', () => {
        cy.contains("Cancel").click()
        cy.screenshot()
        cy.wait(200)
        cy.contains("Home").click()
        cy.screenshot()
        cy.wait(200)
    })

    it('Create video for avatar dialogues', () => {
        cy.contains("New Project").click()
        cy.contains('Add Talk Text').click()
        cy.get('textarea[id=talk-text]').type('Hello my name is Dennis Chambers!')
        cy.get('span[class=MuiButton-label]').last().click()
        cy.screenshot()
        cy.wait(200)

        cy.contains('Add Talk Text').click()
        cy.get('textarea[id=talk-text]').type('Hello Dennis, nice to meet you. My name is Tony Williams!')
        cy.get('span[class=MuiButton-label]').last().click()
        cy.screenshot()
        cy.wait(1000)
        cy.contains("Open Frame Editor").click()
        cy.contains("Backdrop").click()
        cy.screenshot()
        cy.wait(200)

        //MuiButtonBase-root jss120 jss124
        //cy.get('span[class=MuiButton-label]').eq(2).click()
        //cy.get('img').invoke('attr', 'class').should('contain', 'jss167').click()
        //cy.get('div[class="jss121"]')
        //.find('img[src="/backgrounds/t/IpypDtqxtIvo2sZp.jpg"]')     // *= gives a partial match on src
        //.click()

        //cy.focused().click(82.85, 17.4)

        cy.contains("Save").click()
        cy.screenshot()
        cy.wait(1000)
        cy.contains("Back").click()
        cy.screenshot()
        cy.wait(1000)
    })

    it('Save and Download Dialogue', () => {
        //change scenario name
        cy.get('input[type=text]').focus().clear()
        cy.get('input[type=text]').type('Cypress_autoCreate_Scenario')
        cy.screenshot()
        cy.wait(200)

        cy.contains("Save Scenario").click()
        cy.screenshot()
        cy.wait(1000)
        cy.contains("Save & Download").click()
        cy.screenshot()
        cy.wait(200)
    })

})