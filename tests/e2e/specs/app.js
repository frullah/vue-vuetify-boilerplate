/// <reference types="cypress" />
/// <reference types="../support" />

describe('App views', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('have app login btn', () => {
    cy.get('[data-test="app-login-btn"]')
      .should('have.attr', 'href', '/login')
  })

  it('have app signup btn', () => {
    cy.get('[data-test="app-signup-btn"]')
      .should('have.attr', 'href', '/signup')
  })
})
