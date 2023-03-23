describe('Home page', () => {
  it('loads packages on page load', () => {
    cy.login();
    cy.get('header .MuiTypography-root').should('have.text', 'Package Locker');
    cy.get('li').should('have.length', 7);
  })

  it('displays error on failure', () => {
    cy.get('[id="fetchErr"]').should('not.exist');

    cy.intercept('/packages', { statusCode: 500 });
    cy.login();

    cy.get('[id="fetchErr"]').should('be.visible');
  })


})