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

  it('back button leads to home page', () => {
    cy.get('[id="back"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('li span').first().should('have.text', '');
  })

  it('unlock button unlocks locker', () => {
    cy.get('[id="unlock-dialog"]').should('not.exist');
    cy.get('[id="unlock"]').click();
    cy.get('[id="unlock-dialog"]').should('be.visible');

    cy.get('[id="cancel"]').click();
    cy.get('[id="unlock-dialog"]').should('not.exist');

    cy.get('[id="unlock"]').click();
    cy.get('[id="confirm"]').click();
    cy.get('[id="unlock-dialog"]').should('not.exist');
  })

  context('Package submission', () => {
    it('submission failure', () => {
      cy.intercept('/new', { statusCode: 500 });

      cy.get('[id="err"]').should('not.exist');

      cy.get('[id="name"]').type('John Calvin');
      cy.get('[id="email"]').type('jc@calvin.edu');
      cy.get('[id="studentId"]').type('123456');
      cy.get('[id="packageId"]').type('000000');
      cy.get('[id="submit"]').click();

      cy.get('[id="err"]').should('be.visible');
    })

    it('submission success', () => {
      cy.get('[id="name"]').type('John Calvin');
      cy.get('[id="email"]').type('jc@calvin.edu');
      cy.get('[id="studentId"]').type('123456');
      cy.get('[id="packageId"]').type('000000');
      cy.get('[id="submit"]').click();
      cy.url().should('eq', 'http://localhost:3000/');
      cy.get('li span').first().should('have.text', 'John Calvin');
    })
  })
})