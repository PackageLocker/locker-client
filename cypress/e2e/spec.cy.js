describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('redirects to log in page', () => {
    cy.url().should('eq', 'http://localhost:3000/login');
  })

  it('accepts inputs', () => {
    const username = 'username';
    const password = "password";

    cy.get('[id="submit"]').should('be.disabled');

    cy.get('[id="username"]')
      .type(username)
      .should('have.value', username);

    cy.get('[id="submit"]').should('be.disabled');

    cy.get('[id="password"]')
      .type(password)
      .should('have.value', password);

    cy.get('[id="submit"]').should('not.be.disabled');
  })

  it('can hide/unhide password', () => {
    cy.get('[id="password"]').should('have.attr', 'type', 'password');

    cy.get('[id="visibility"] > svg')
      .should('have.attr', 'data-testid', 'VisibilityIcon')
      .click();

    cy.get('[id="password"]').should('have.attr', 'type', 'text');

    cy.get('[id="visibility"] > svg')
      .should('have.attr', 'data-testid', 'VisibilityOffIcon')
      .click();

    cy.get('[id="visibility"] > svg')
      .should('have.attr', 'data-testid', 'VisibilityIcon');

    cy.get('[id="password"]').should('have.attr', 'type', 'password');
  })
})