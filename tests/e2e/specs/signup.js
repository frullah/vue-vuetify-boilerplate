/// <reference types="Cypress" />
import { messages as veeEn } from 'vee-validate/dist/locale/en'
import { AxiosResponse } from 'axios'

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

    cy.contains(veeEn.required('email'))
    cy.contains(veeEn.required('username'))
    cy.contains(veeEn.required('password'))
    cy.contains(veeEn.required('name'))
  })

  it('username and password length constraint', () => {
    cy.get('[data-test="username-input"]')
      .type('x')
    cy.get('[data-test="password-input"]')
      .type('x')

    const params = [5, 32]

    cy.contains(veeEn.length('username', params))
    cy.contains(veeEn.length('password', params))
  })

  it('should registered', async () => {
    cy.resetDb()

    cy.get('[data-test="email-input"]')
      .type(Cypress.env('email'))
    cy.get('[data-test="username-input"]')
      .type(Cypress.env('username'))
    cy.get('[data-test="password-input"]')
      .type('tester')
    cy.get('[data-test="name-input"]')
      .type('tester')

    cy.get('[data-test="submit-btn"]').click()
    cy.location('pathname').should('eq', '/')
  })
})
