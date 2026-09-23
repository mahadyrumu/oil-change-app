describe('Navigation Flow', () => {
  it('navigates between all public pages', () => {
    cy.visit('/');
    
    // Go to Services
    cy.contains('Services').click();
    cy.url().should('include', '/services');
    
    // Go to About
    cy.contains('About').click();
    cy.url().should('include', '/about');
    
    // Go to Pricing
    cy.contains('Pricing').click();
    cy.url().should('include', '/pricing');
    
    // Go to Contact
    cy.contains('Contact').click();
    cy.url().should('include', '/contact');
    
    // Return to Home
    cy.contains('Oil Change').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
