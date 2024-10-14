describe('Login Screen', () => {
    beforeEach(() => {
      cy.visit('/login'); // Adjust URL if needed
    });
  
    it('should display login form', () => {
      cy.get('.login-title').should('contain', 'Login');
      cy.get('input[placeholder="Username"]').should('be.visible');
      cy.get('input[placeholder="Password"]').should('be.visible');
      cy.get('button.btn-primary').should('be.visible');
    });
  
    it('should login successfully with valid credentials', () => {
      cy.get('input[placeholder="Username"]').type('validUsername'); // Use valid credentials
      cy.get('input[placeholder="Password"]').type('validPassword'); // Use valid credentials
      cy.get('button.btn-primary').click();
  
      // Check if redirected to the home page
      cy.url().should('include', '/home');
      cy.contains('Welcome').should('be.visible'); // Change based on your app's structure
    });
  
    it('should show an error message with invalid credentials', () => {
      cy.get('input[placeholder="Username"]').type('invalidUsername');
      cy.get('input[placeholder="Password"]').type('invalidPassword');
      cy.get('button.btn-primary').click();
  
      // Check if the error message is displayed
      cy.contains('Login failed!').should('be.visible'); // Adjust this based on your error message
    });
  });
  