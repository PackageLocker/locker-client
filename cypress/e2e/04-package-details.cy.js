describe('package details', () => {
  beforeEach(() => {
    cy.login();
    cy.get('li').first().click();
  })

  it('shows correct package information', () => {
    cy.get('header .MuiTypography-root').should('have.text', 'Locker 1');
    cy.get('[id="name"] span').should('have.text', 'Name: John Calvin');
    cy.get('[id="email"] span').should('have.text', 'Email: jc@calvin.edu');
    cy.get('[id="studentId"] span').should('have.text', 'Student ID: 123456');
    cy.get('[id="packageId"] span').should('have.text', 'Package # 000000');
    cy.get('[id="timestamp"] span').contains('Delivery Time');
  })

  it('back arrbuttonow leads to home page', () => {
    cy.get('[id="back"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('li span').first().should('have.text', 'John Calvin');
  })

  it('can delete package information', () => {
    cy.get('[id="delete"]').should('not.be.disabled');
    cy.get('[id="delete-dialog"]').should('not.exist');
    cy.get('[id="delete"]').click();
    cy.get('[id="delete-dialog"]').should('be.visible');

    cy.get('[id="cancel"]').click();
    cy.get('[id="delete-dialog"]').should('not.exist');

    cy.get('[id="delete"]').click();
    cy.get('[id="confirm"]').click();
    cy.get('[id="delete-dialog"]').should('not.exist');

    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('li span').first().should('have.text', '');
  })
})