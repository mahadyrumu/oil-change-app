describe('Booking Flow', () => {
  it('allows a user to start the booking process from the home page', () => {
    cy.visit('/');
    cy.contains('Book Appointment').click();
    cy.url().should('include', '/book');
  });

  it('displays the services and allows selection', () => {
    cy.visit('/services');
    cy.contains('Standard Oil Change').should('exist');
    cy.contains('Book Now').first().click();
    // Assuming the Booking Drawer opens
    cy.contains('Vehicle Information').should('exist');
  });
});
