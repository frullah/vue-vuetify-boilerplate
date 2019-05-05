/// <reference types="cypress" />

describe('Reset password views', () => {
  beforeEach(() => {
    cy.visit('/reset-password')
  })

  it('autofocus to email', () => {
    cy.focused().should('have.attr', 'data-test', 'email-input')
  })
})
