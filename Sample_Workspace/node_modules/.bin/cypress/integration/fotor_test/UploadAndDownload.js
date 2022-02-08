require('cypress-downloadfile/lib/downloadFileCommand')

import 'cypress-file-upload'

describe('Download Demo', function () {

    it('Download', () => {
        cy.downloadFile('https://library.concordia.ca/help/technology/recovering_save_files.pdf', 'Download', 'demo.pdf')
    })

    //https://www.intouch.org/watch/sermons/an-introduction-to-jesus/notes

    it('Download', () => {
        cy.downloadFile('https://static.ffx.io/images/$zoom_0.138%2C$multiply_0.4431%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/c514b1cecc83858b8ec32a72ed66169bd952455a', 'Download', 'image.png')
    })

    //https://i.ytimg.com/vi/Ye0wpLQvEVg/hqdefault.jpg
    it('Orange12 Picture', () => {
        cy.downloadFile('https://i.ytimg.com/vi/Ye0wpLQvEVg/hqdefault.jpg', 'Download', 'orange12.jpeg')
    })
    
    it('File Upload using cypress-file-upload npm package', () => {
        cy.visit('https://the-internet.herokuapp.com/upload')
        cy.wait(1000)
        const filepath = 'images/memories.png'
        cy.get('input[type="file"]').attachFile(filepath)
        cy.get('#file-submit').click()
        cy.get('#uploaded-files').contains('memories.png')
    })

    //back function will not work in some websites possibly to security reasons like fotor.com. Possible limitation
    it('Go back to previous page', () => {
        cy.go('back')
        cy.wait(200)
        cy.go('forward')
    })

})