describe('Home page', () => {
  it.only('loads packages on page load', () => {
    cy.intercept('/packages', { fixture: 'packages.json' });
    cy.login();

    cy.get('header .MuiTypography-root').should('have.text', 'Package Locker');

    cy.get('li').should('have.length', 7);

    cy.get('li span').first().should('have.text', 'John Calvin');
  })

  it('loads packages on page load from database', () => {
    cy.login();

    cy.get('header .MuiTypography-root').should('have.text', 'Package Locker');

    cy.get('li').should('have.length', 7);

    cy.get('li span').first().should('have.text', '');
  })

  it('displays error on failure', () => {
    cy.get('[id="fetchErr"]').should('not.exist');

    cy.intercept('/packages', { statusCode: 500 });
    cy.login();

    cy.get('[id="fetchErr"]').should('be.visible');
  })
})