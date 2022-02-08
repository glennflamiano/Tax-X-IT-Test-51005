describe('37460 Notification Center', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/taxx/');
    });

    it('37460.3 Bell icon opens and closes notification pane', () => {

        cy.get('[data-cy="notifications-container"]').should('exist');
        cy.get('[data-cy="notifications-pane"]').should('not.be.visible');
        cy.get('[data-cy="notifications-bell"]').click();
        cy.get('[data-cy="notifications-pane"]').should('be.visible');
        cy.get('[data-cy="notifications-bell"]').click();
        cy.get('[data-cy="notifications-pane"]').should('not.be.visible');

        // 37460.1 Notification snackbar appears when new notification is received
        cy.get('[data-cy="notifications-bell"]').click();

        cy.contains('Personal notifications').parent().children().within(() => {
            cy.get('div').first().children().children().click()
        });

        cy.get('[data-cy="notifications-bell"]').click();

        const title = 'This is a notification Title dated ' + (new Date()).toLocaleTimeString();
        const shortText = 'Short notification message dated ' + (new Date()).toLocaleTimeString();
        cy.get('[data-cy="notifications-container"]').should('exist');
        cy.request({
            method: 'POST',
            url: '/webapi/v1/notification/',
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`,
            },
            body: {
                target: 1,
                title: title,
                short_text: shortText,
                notification_type: 'ERROR',
                entity: 1,
            },
        });
        cy.wait(2000)
        cy.get('[data-cy="notifications-snackbar"]').should('be.visible');
        cy.get('[data-cy="notifications-snackbar-title"]').should('contain', title);
        cy.get('[data-cy="notifications-snackbar-short-text"]').should('contain', shortText);
        cy.wait(1100);
        cy.get('[data-cy="notifications-snackbar"]').should('not.exist');

        // 37460.2.5 Notification snackbar appears when 2 new notifications are received
        cy.wait(1000);

        const title2 = 'This is a notification Title dated ' + (new Date()).toLocaleTimeString();
        const shortText2 = 'Short notification message dated ' + (new Date()).toLocaleTimeString();
        cy.get('[data-cy="notifications-container"]').should('exist');
        for (let x = 0; x < 2; x++) {
            cy.request({
                method: 'POST',
                url: '/webapi/v1/notification/',
                headers: {
                    Authorization: `Token ${window.localStorage.getItem('token')}`,
                },
                body: {
                    target: 1,
                    title: x + title2,
                    short_text: x + shortText2,
                    notification_type: 'ERROR',
                    entity: 1,
                },
            });
        }
        cy.wait(2000);
        cy.get('[data-cy="notifications-snackbar"]').should('be.visible');
        cy.wait(500);
        cy.get('[data-cy="notifications-snackbar-title"]').should('contain', '2 new notifications');
        cy.get('[data-cy="notifications-snackbar-short-text"]').should('contain', 'You have 2 new notifications to view in the notification center.');
        cy.wait(12000);
        cy.get('[data-cy="notifications-snackbar"]').should('not.exist');
    });
});