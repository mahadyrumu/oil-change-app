describe('Contact Flow', () => {
  it('allows a user to fill out the contact form', () => {
    cy.visit('/contact');
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('textarea[name="message"]').type('I have a question about my oil change.');
    cy.get('button[type="submit"]').contains('Send Message').should('exist');
  });
});
