/// <reference types="cypress" />

describe('Login views', () => {
  describe('Component check', () => {
    beforeEach(() => {
      cy.visit('/login')
    })

    it('autofocus to username', () => {
      cy.focused().should('have.attr', 'data-test', 'username-input')
    })

    it('have create account link', () => {
      cy.get('[data-test="signup-link"]')
        .should('have.attr', 'href', '/signup')
    })

    it('have reset password link', () => {
      cy.get('[data-test="reset-password-link"]')
        .should('have.attr', 'href', '/reset-password')
    })

    it('password required', () => {
      cy.get('[data-test="username-input"]')
        .type(`${Cypress.env('username')}{enter}`)
    })

    it('username required', () => {
      cy.get('[data-test="password-input"]')
        .type(`${Cypress.env('password')}{enter}`)
    })
  })

  it('redirect to home page', () => {
    cy.login()
  })
})
