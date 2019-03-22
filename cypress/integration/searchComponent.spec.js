const APP_URL = 'http://localhost:8080/';

describe('Search Component', () => {
  it('should redirect user to Wikipedia "Cypress Country" when user clicks on "Cypress Country" on dropdown ', () => {
    cy.visit(APP_URL);
    cy.get('[data-testid="show-autocomplete"]').click();
    cy.get('[data-testid="searchInput"]');
  });
});
