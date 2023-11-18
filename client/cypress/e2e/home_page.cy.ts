/* describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.contains('GameRater')
  })
})

describe('Navigation', () => {
  it('navigates to a game details page', () => {
    cy.visit('/')
    cy.get('[data-testid="game-card-link"]').first().click() // Adjust the selector to match your app
    cy.url().should('include', '/game/') // Check if URL changed correctly
    cy.contains('Release Date') // Replace with text or element unique to the game details page
  })
})

describe('Sort Games', () => {
  it('sorts games by release date', () => {
    cy.visit('/')
    cy.get('[data-testid="sort-by-select"]').click() // Adjust based on your dropdown selector
    cy.contains('Release Date Asc').click() // Adjust based on sorting options
    // Add assertions to verify sorting


  })
}) */

describe('Filter Games', () => {
  it('filters games', () => {
    cy.visit('/')
    cy.get('[data-testid="filter-item-Nintendo Switch"]').click() // Adjust based on your dropdown selector
    cy.contains('2159 results')
    cy.get('[data-testid="search-input"]').click().type('mario{enter}')
    cy.contains('21 results') // Adjust based on filter options
    // Add assertions to verify filtering
  })
})