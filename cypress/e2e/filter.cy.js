describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('[data-test="todo-input"]').type('New Todo 1');
    cy.get('[data-test="todo-expiration"]').type('2028-12-01');
    cy.get('[data-test="todo-button"]').click();

    cy.get('[data-test="todo-input"]').type('New Todo 2');
    cy.get('[data-test="todo-expiration"]').type('2029-12-01');
    cy.get('[data-test="todo-button"]').click();
    
    cy.get('[data-test="todo-input"]').type('New Todo 3');
    cy.get('[data-test="todo-expiration"]').type('2017-12-01');
    cy.get('[data-test="todo-button"]').click();
    
    cy.get('[data-test="todo-input"]').type('New Todo 4');
    cy.get('[data-test="todo-expiration"]').type('2045-12-01');
    cy.get('[data-test="todo-button"]').click();

    cy.get('[data-testid="filter-button"]').click();
  });

  it('should filter todos by priority', () => {
    cy.get('[data-testid="priority-filter"]').click();
    cy.get('[data-test="priority-Medium"]').click();
    cy.get('[data-test="hide-filter-modal"]').click();
    cy.get('[data-testid="todo-list"] div')
      .invoke('text')
      .should('equal', 'No todos');
  })

  it('should filter todos by category', () => {
    cy.get('[data-testid="category-filter"]').click();
    cy.get('[data-test="category-Arbeit"]').click();
    cy.get('[data-test="hide-filter-modal"]').click();
    cy.get('[data-testid="todo-list"] div')
      .invoke('text')
      .should('equal', 'No todos');
  })

  it('should filter todos by expiration', () => {
    cy.get('[data-testid="expiration-filter"]').click();
    cy.get('[data-test="expiration-Ascend"]').click();
    cy.get('[data-test="hide-filter-modal"]').click();

    cy.get('[data-testid="todo-list"] [data-testid="todo-item"]')
      .first()
      .within(() => {
        cy.get('[data-test="todo-edit"]')
          .invoke('text')
          .should('equal', 'New Todo 3');
      });
  })
})