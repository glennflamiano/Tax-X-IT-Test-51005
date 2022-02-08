// <reference types="cypress" />

describe('Basic tests', function () {

    it('plays video', () => {
        cy.visit('https://www.youtube.com/watch?v=OIAzwr-_jhY')
        // https://html.spec.whatwg.org/multipage/media.html#playing-the-media-resource
        cy.get('video')
          .should('have.prop', 'paused', false)
          .and('have.prop', 'ended', false)
          .then(($video) => {
            $video[0].pause()
          })

        //check video status again
        cy.wait(1000)
        cy.get('video')
          .should('have.prop', 'paused', true)
          .and('have.prop', 'ended', false)
    })

    it('has known duration', () => {
        cy.visit('https://www.youtube.com/watch?v=sUMjK9rwG_E')
        cy.get('video').should('have.prop', 'duration', 239.841)
        cy.get('video').should(($video) => {
            expect($video[0].duration).to.be.gt(239)
        })
        cy.get('video').should(($video) => {
            expect($video[0].duration).to.be.lt(400)
        })
    })

    it('plays video at 4x speed', () => {
        cy.visit('https://www.youtube.com/watch?v=9M3NqnPhlSQ')
        cy.get('video').then(($video) => {
          $video[0].playbackRate = 4
          $video[0].play()
        })
      
        // wait for the video to finish playing
        // because the video is playing at 4x speed
        // we don't have to wait as long
        cy.get('video', { timeout: 5000 }).and('have.prop', 'ended', true)
    })

})