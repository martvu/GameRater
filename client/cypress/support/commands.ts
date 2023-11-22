/// <reference types="cypress" />

Cypress.Commands.add('tests_cleanup', () => {
  cy.task('clearDB');
});
