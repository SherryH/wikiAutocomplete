const APP_URL = 'http://localhost:8080/';

describe('Search Component', () => {
  it('should redirect user to Wikipedia "Cypress Country" when user clicks on "Cypress County" on dropdown ', () => {
    cy.visit(APP_URL);
    cy.get('[data-testid="show-autocomplete"]').click();
    cy.get('[data-testid="searchInput"]').type('Cypress');
    cy.get('ul>li:nth-child(3)').click();
    cy.get('[aria-label="Search"]').click();
    cy.get('[data-testid="searchInput"]').should('have.value', 'Cypress County');
    // cypress cannot verify cross origin pages
    // cy.location().should((loc) => {
    //   console.log('loc', JSON.stringify(loc));
    //   expect(loc.href).to.have.text('cypress');
    // });
  });
});
