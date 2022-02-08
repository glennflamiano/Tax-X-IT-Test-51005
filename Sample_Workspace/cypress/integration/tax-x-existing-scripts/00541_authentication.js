describe('00541 (Thomas) Authentication tests', () => {
    it('00541 Can login', () => {
        cy.visit('/taxx/logout');
        cy.get('#logoutpage-username-input').type('admin');
        cy.get('#logoutpage-password-input').type('admin');
        cy.screenshot('LoginPage');
        cy.contains('Login').click();
        cy.url().should('contain', '/taxx/');
    });
    it('00541 Can go directly to page if we have token', () => {
        cy.login();
        cy.visit('/taxx/');
        cy.contains('Admin').click();
    });
    it('00541 Can visit admin pages if we are admin', () => {
        cy.login();
        cy.visit('/taxx/admin/');
        cy.contains('description').click();
    });
});
