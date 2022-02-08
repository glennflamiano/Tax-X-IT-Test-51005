import 'cypress-file-upload';
const fileName = 'example.json';
describe('File upload Test', function () {

    it('Upload file', function () {
        cy.viewport('macbook-15')
        cy.visit('https://the-internet.herokuapp.com/upload');
        cy.fixture(fileName).then(fileContent => {
            cy.get('#file-upload').upload({ fileContent, fileName, mimeType: 'application/json'});
        });
        cy.get('#file-submit').click();
        cy.get('#upload-files').invoke('text').then((text) => {
            expect(text.trim()).equal('example.json')
        });
    });

});