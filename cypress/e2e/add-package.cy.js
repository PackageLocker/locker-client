describe('Add package', () => {
  beforeEach(() => {
    cy.login();
    cy.get('li').first().click();
  })

  it('accepts and validates inputs', () => {
    cy.get('[id="name-helper-text"]').should('not.exist');
    cy.get('[id="name"]').type('name').should('have.value', 'name');
    cy.get('[id="name-helper-text"]').should('not.exist');
    cy.get('[id="name"]').clear();
    cy.get('[id="name-helper-text"]').should('be.visible');

    cy.get('[id="email-helper-text"]').should('not.exist');
    cy.get('[id="email"]').type('abc');
    cy.get('[id="name-helper-text"]').should('be.visible');
    cy.get('[id="email"]').type('@abc.com').should('have.value', 'abc@abc.com');
    cy.get('[id="email-helper-text"]').should('not.exist');
    cy.get('[id="email"]').clear();
    cy.get('[id="email-helper-text"]').should('be.visible');

    cy.get('[id="studentId-helper-text"]').should('not.exist');
    cy.get('[id="studentId"]').type('abc');
    cy.get('[id="studentId-helper-text"]').should('be.visible');
    cy.get('[id="studentId"]').clear().type('12345').should('have.value', '12345');
    cy.get('[id="studentId-helper-text"]').should('not.exist');
    cy.get('[id="studentId"]').clear();
    cy.get('[id="studentId-helper-text"]').should('be.visible');

    cy.get('[id="packageId-helper-text"]').should('not.exist');
    cy.get('[id="packageId"]').type('00000').should('have.value', '00000');
    cy.get('[id="packageId-helper-text"]').should('not.exist');
    cy.get('[id="packageId"]').clear();
    cy.get('[id="packageId-helper-text"]').should('be.visible');
  })

  it('can only submit with valid inputs', () => {
    cy.get('[id="submit"]').should('be.disabled');

    cy.get('[id="name"]').type('John Calvin');
    cy.get('[id="submit"]').should('be.disabled');

    cy.get('[id="email"]').type('jc@calvin.edu');
    cy.get('[id="submit"]').should('be.disabled');

    cy.get('[id="studentId"]').type('123456');
    cy.get('[id="submit"]').should('be.disabled');

    cy.get('[id="packageId"]').type('000000');
    cy.get('[id="submit"]').should('not.be.disabled');
  })

  context('Package submission', () => {
    it('submission failure', () => {

    })

    it('submission success', () => {

      // cy.url().should('eq', 'http://localhost:3000/');
    })
  })
})