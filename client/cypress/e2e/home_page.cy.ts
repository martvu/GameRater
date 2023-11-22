describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/'); // change URL to match your dev URL
    cy.contains('GameRater');
  });
});

describe('Navigation', () => {
  it('navigates to a game details page', () => {
    cy.visit('/');
    cy.get('[data-testid="game-card-link"]').first().click(); // Adjust the selector to match your app
    cy.url().should('include', '/game/'); // Check if URL changed correctly
    cy.contains('Release Date'); // Replace with text or element unique to the game details page
  });
});

describe('Sort Games', () => {
  it('sorts games by release date ascending', () => {
    // Sort by release date ascending
    cy.visit('/');
    cy.get('[data-testid="sort-by-select"]').click(); // Adjust based on your dropdown selector
    cy.contains('Release Date Asc').click(); // Adjust based on sorting options
    // Check that the first game is South Park Rally
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.contains('South Park Rally');
  });

  it('sorts games by release date descending', () => {
    // Sort by release date descending
    cy.visit('/');
    cy.get('[data-testid="sort-by-select"]').click();
    cy.contains('Release Date Desc').click();
    // Check that the first game is The Wolf Among Us 2
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.contains('The Wolf Among Us 2');
  });

  it('sorts games by name A-Z', () => {
    // Sort by name A-Z
    cy.visit('/');
    cy.get('[data-testid="sort-by-select"]').click();
    cy.contains('Name A-Z').click();
    // Check that the first game is .Detuned
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.contains('.Detuned');
  });

  it('sorts games by name Z-A', () => {
    // Sort by name Z-A
    cy.visit('/');
    cy.get('[data-testid="sort-by-select"]').click();
    cy.contains('Name Z-A').click();
    // Check that the first game is Zwei: The Ilvard Insurrection
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.contains('Zwei: The Ilvard Insurrection');
  });

  it('sorts games by Metascore', () => {
    // Sort by Metascore
    cy.visit('/');
    cy.get('[data-testid="sort-by-select"]').click();
    cy.contains('Metascore').click();
    // Check that the first game has a Metascore of 100
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.contains('Metascore: 100');
  });
});

describe('Filter Games', () => {
  it('filters games', () => {
    cy.visit('/');
    cy.get('[data-testid="filter-item-Nintendo Switch"]').click(); // Adjust based on your dropdown selector
    cy.contains('2159 results');
    cy.get('[data-testid="search-input"]').click().type('mario{enter}');
    cy.contains('21 results'); // Adjust based on filter options
    // Add assertions to verify filtering
  });
});

describe('Login and Logout', () => {
  beforeEach(() => {
    // Remove all reviews and users from the database before each test
    // Cypress recommends doing this before each test instead of after
    cy.task('clearDB');
  });

  it('logs in and out', () => {
    // Log in
    cy.visit('/');
    cy.get('[data-testid="modal-sign-in-button"]').click();
    cy.get('[data-testid="username-input"]').click().type('testuser');
    cy.get('[data-testid="form-sign-in-button"]').click();

    // Check that buttons for Favorites and Reviewed are present
    cy.contains('Favorites');
    cy.contains('Reviewed');

    // Log out
    cy.get('[data-testid="user-nav"]').click();
    cy.get('[data-testid="sign-out-button"]').click();
    cy.contains('Sign In');

    // Check that the buttons for Favorites and Reviewed are gone
    cy.contains('Favorites').should('not.exist');
    cy.contains('Reviewed').should('not.exist');
  }
)});

describe('Add and Remove Favorite', () => {
  beforeEach(() => {
    // Remove all reviews and users from the database before each test
    // Cypress recommends doing this before each test instead of after
    cy.task('clearDB');
  });

  it('logs in, adds a favorite, removes a favorite, logs out', () => {
    // Log in
    cy.visit('/');
    cy.get('[data-testid="modal-sign-in-button"]').click();
    cy.get('[data-testid="username-input"]').click().type('testuser');
    cy.get('[data-testid="form-sign-in-button"]').click();

    // Check that buttons for Favorites and Reviewed are present
    cy.contains('Favorites');
    cy.contains('Reviewed');

    // Check that testuser has no favorites yet
    cy.get('[data-testid="toggle-favorites-btn"]').click();
    cy.contains('No games found');
    cy.get('[data-testid="toggle-favorites-btn"]').click();

    // Add favorite and check that it appears in Favorites
    cy.get('[data-testid="favorite-btn"]').first().click();
    cy.get('[data-testid="toggle-favorites-btn"]').click();
    cy.contains('1 results');

    // Remove favorite and check that it no longer appears in Favorites
    cy.get('[data-testid="toggle-favorites-btn"]').click();
    cy.get('[data-testid="favorite-btn"]').first().click();
    cy.get('[data-testid="toggle-favorites-btn"]').click();
    cy.contains('No games found');

    // Log out
    cy.get('[data-testid="toggle-favorites-btn"]').click();
    cy.get('[data-testid="user-nav"]').click();
    cy.get('[data-testid="sign-out-button"]').click();
    cy.contains('Sign In');

    // Check that the buttons for Favorites and Reviewed are gone
    cy.contains('Favorites').should('not.exist');
    cy.contains('Reviewed').should('not.exist');
  });
});

describe('Add Review', () => {
  beforeEach(() => {
    // Remove all reviews and users from the database before each test
    // Cypress recommends doing this before each test instead of after
    cy.task('clearDB');
  });

  it('logs in, adds a review, logs out', () => {
    // Log in
    cy.visit('/');
    cy.get('[data-testid="modal-sign-in-button"]').click();
    cy.get('[data-testid="username-input"]').click().type('testuser');
    cy.get('[data-testid="form-sign-in-button"]').click();

    // Check that buttons for Favorites and Reviewed are present
    cy.contains('Favorites');
    cy.contains('Reviewed');

    // Check that testuser has no reviews yet
    cy.get('[data-testid="toggle-reviewed-btn"]').click();
    cy.contains('No games found');
    cy.get('[data-testid="toggle-reviewed-btn"]').click();

    // Add review
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.get('[data-testid="add-review-btn"]').click();
    cy.get('[data-testid="review-title-input"]').click().type('Test Review');
    cy.get('[data-testid="review-platform-select"]').click();
    cy.focused().click();
    cy.get('[data-testid="review-content-input"]').click().type('This is a test review.');
    cy.get('[data-testid="review-star"]').eq(5).click();
    cy.get('[data-testid="review-submit-btn"]').click();

    // Check that the reviewed game appears in Reviewed
    cy.get('[data-testid="logo-btn"]').click();
    cy.get('[data-testid="toggle-reviewed-btn"]').click();
    cy.contains('1 results');

    // Log out
    cy.get('[data-testid="toggle-favorites-btn"]').click();
    cy.get('[data-testid="user-nav"]').click();
    cy.get('[data-testid="sign-out-button"]').click();
    cy.contains('Sign In');

    // Check that the buttons for Favorites and Reviewed are gone
    cy.contains('Favorites').should('not.exist');
    cy.contains('Reviewed').should('not.exist');
  });
});
