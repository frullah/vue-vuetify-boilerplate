describe('Sign up views', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('autofocus to email', () => {
    cy.focused().should('have.attr', 'data-test', 'email-input')
  })

  it('have login link', () => {
    cy.get('[data-test="login-link"]')
      .should('have.attr', 'href', '/login')
  })

  it('all field required', () => {
    cy.get('[data-test="submit-btn"]')
      .trigger('click')

    cy.contains('The email field is required.')
    cy.contains('The username field is required.')
    cy.contains('The password field is required.')
    cy.contains('The fullname field is required.')
  })

  it('username have at least 5 characters', () => {
    cy.get('[data-test="username-input"]')
      .type('1234')

    cy.contains('The username field must be at least 5 characters.')
  })

  it('password have at least 5 characters', () => {
    cy.get('[data-test="password-input"]')
      .type('1234')

    cy.contains('The password field must be at least 5 characters.')
  })
})
