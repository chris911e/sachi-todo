const { within } = require("@testing-library/dom");

describe('template spec', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="category-button"]').click();
  })

  it('should create a new category', () => {
    cy.get('[data-test="category-input"]').type('New Category');
    cy.get('[data-testid="add-category-button"]').click();

    cy.get('[data-test="category-list"]')
      .children()
      .should('have.length', 4);
  })

  it('should delete a new category', () => {
    cy.get('[data-testid="delete-Arbeit"]').click();
    
    cy.get('[data-test="category-list"]')
      .children()
      .should('have.length', 2);
  })
})