describe('Headless Demo', function () {

    //https://www.intouch.org/watch/sermons/an-introduction-to-jesus/notes

    it('Download', () => {
        cy.downloadFile('https://static.ffx.io/images/$zoom_0.138%2C$multiply_0.4431%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/c514b1cecc83858b8ec32a72ed66169bd952455a', 'Download', 'image.png')
    })

    //https://i.ytimg.com/vi/Ye0wpLQvEVg/hqdefault.jpg
    it('Man you stink', () => {
        cy.downloadFile('https://i.ytimg.com/vi/Ye0wpLQvEVg/hqdefault.jpg', 'Download', 'man_you_stink.jpeg')
    })

})