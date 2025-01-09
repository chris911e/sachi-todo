describe('tests todo manipulation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('[data-test="todo-input"]').type('New Todo');
    cy.get('[data-test="todo-expiration"]').type('2030-12-01');
    cy.get('[data-test="todo-button"]').click();
  });

  it('should create a new todo', () => {
    cy.get('[data-testid="todo-list"]')
      .children()
      .should('have.length', 1);
  });

  it('should edit category', () => {
    cy.get('[data-test="category-select"]').select("Arbeit");

    cy.get('[data-test="category-select"]')
      .invoke('val')
      .should('eq', 'Arbeit');
  });

  it('should edit priority', () => {
    cy.get('[data-test="priority-dot"]').click();
    cy.get('[data-test="priority-severity"]')
      .invoke('text')
      .should('eq', 'medium')
  })

  it('should allow editing the expiration date', () => {
    cy.get('[data-test="expiration-div"]').dblclick();
    cy.get('[data-test="expiration-input"]').should('be.visible');

    const newDate = '2030-12-25';
    cy.get('[data-test="expiration-input"]').clear().type(newDate);
    cy.get('[data-test="expiration-input"]').blur();
    cy.get('[data-test="expiration-div"] p').should('contain', 'Wednesday, 25.12.2030');
  });

  it('should delete a todo', () => {
    cy.get('[data-test="delete-todo"]').click();
    cy.get('[data-testid="todo-list"] div')
      .invoke('text')
      .should('equal', 'No todos');
  })

  it('should mark a todo as completed', () => {
    cy.get('[data-test="todo-checkbox"]').click();
    cy.get('[data-test="todo-edit"]')
      .should('have.css', 'text-decoration-line', 'line-through');
  });

});
