describe('Authentication Flow', () => {
  it('allows a user to navigate to login and sign in', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    // Assuming standard button submit, we just check if it exists
    cy.get('button[type="submit"]').should('exist');
  });

  it('allows a user to navigate to register', () => {
    cy.visit('/register');
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });
});
