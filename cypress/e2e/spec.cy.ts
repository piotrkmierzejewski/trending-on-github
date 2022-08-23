describe('empty ', () => {
  it('favorites an element', () => {
    cy.visit('http://localhost:3000/')

    cy.get('div[data-testid="repoCard"] div[data-testid="repoCard-fullname"]')
      .eq(4)
      .invoke('text')
      .then((text) => text)
      .as('favoritedRepoName')

    cy.get('div[data-testid="repoCard"] button[data-testid="favoriteBtn"]')
      .eq(4)
      .click()

    cy.get('[data-testid="favoritesSwitch"]').click()

    cy.get('div[data-testid="repoCard"]').should('have.length', 1)

    cy.get('@favoritedRepoName').then((favoritedRepoName) => {
      cy.get(
        'div[data-testid="repoCard"] div[data-testid="repoCard-fullname"]'
      ).contains(String(favoritedRepoName))
    })
  })
})
