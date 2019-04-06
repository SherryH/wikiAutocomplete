import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const url = 'http://localhost:8080/';

Given('"Cypress" in Search box', () => {
  cy.visit(url);
  cy.get('[data-testid="show-autocomplete"]').click();
  cy.get('[data-testid="searchInput"]').type('cypress');
});

When('I removed all text from Search box', () => {
  cy.get('[data-testid="searchInput"]').clear();
});

// This is the same step that we have in socialNetworks/Facebook/different.js, but you don't have to worry about collisions!
Then('the dropdown menu should disappear', () => {
  cy.get('ul>li').should('not.exist');
});
