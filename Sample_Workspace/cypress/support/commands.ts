import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import "cypress-image-compare/commands";

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to match image snapshots.
     * @example cy.matchImageSnapshot('greeting')
     */
    matchImageSnapshot(snapshotName?: string): void;
  }
}

// We set up the settings
addMatchImageSnapshotCommand({
  customSnapshotsDir: 'src/snapshots',
  failureThreshold: 0.05, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport' // capture viewport in screenshot
});

// We also overwrite the command, so it does not take a sceenshot if we run the tests inside the test runner
Cypress.Commands.overwrite('matchImageSnapshot', (originalFn, snapshotName, options) => {
  if (Cypress.env('ALLOW_SCREENSHOT')) {
    originalFn(snapshotName, options)
  } else {
    cy.log(`Screenshot comparison is disabled`);
  }
})