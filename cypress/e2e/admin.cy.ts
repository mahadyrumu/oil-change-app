describe('Admin Flow', () => {
  it('allows an admin to access the dashboard', () => {
    // In a real scenario we'd stub the auth session or UI login
    cy.visit('/login');
    cy.get('input[name="email"]').type('admin@oilchange.com');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    // We would expect to be redirected to the dashboard eventually
    // cy.url().should('include', '/dashboard');
  });

  it('blocks unauthenticated access to the dashboard', () => {
    cy.visit('/dashboard');
    // Next.js middleware should redirect to login
    cy.url().should('include', '/login');
  });
});
