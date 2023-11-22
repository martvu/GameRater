describe('The Home Page', () => {
  it('successfully loads', () => {
    // Checks that the home page loads successfully and that there are 10000 games
    cy.visit('/');
    cy.contains('GameRater');
    cy.contains('10000 results');
  });
});

describe('Navigation', () => {
  it('navigates to a game details page', () => {
    // Checks that the game details page loads successfully for a given game
    cy.visit('/');
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.url().should('include', '/game/');
    cy.contains('Release Date');
  });
});

describe('Sort Games', () => {
  beforeEach(() => {
    // Remove all reviews and users from the database before each test
    // Cypress recommends doing this before each test instead of after
    cy.task('clearDB');
    cy.visit('/');
  });

  it('sorts games by release date ascending', () => {
    // Sort by release date ascending
    cy.get('[data-testid="sort-by-select"]').click();
    cy.contains('Release Date Asc').click();
    // Check that the first game is The Devil Inside
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.contains('The Devil Inside');
  });

  it('sorts games by release date descending', () => {
    // Sort by release date descending
    cy.get('[data-testid="sort-by-select"]').click();
    cy.contains('Release Date Desc').click();
    // Check that the first game is Vampire: The Masquerade - Bloodlines 2
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.contains('Vampire: The Masquerade - Bloodlines 2');
  });

  it('sorts games by name A-Z', () => {
    // Sort by name A-Z
    cy.get('[data-testid="sort-by-select"]').click();
    cy.contains('Name A-Z').click();
    // Check that the first game is .Detuned
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.contains('.Detuned');
  });

  it('sorts games by name Z-A', () => {
    // Sort by name Z-A
    cy.get('[data-testid="sort-by-select"]').click();
    cy.contains('Name Z-A').click();
    // Check that the first game is Zwei: The Ilvard Insurrection
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.contains('Zwei: The Ilvard Insurrection');
  });

  it('sorts games by Metascore', () => {
    // Sort by Metascore
    cy.get('[data-testid="sort-by-select"]').click();
    cy.contains('Metascore').click();
    // Check that the first game has a Metascore of 100
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.contains('Metascore: 100');
  });

  it('sorts games by User Rating', () => {
    // Log in
    cy.visit('/');
    cy.get('[data-testid="modal-sign-in-button"]').click();
    cy.get('[data-testid="username-input"]').click().type('testuser');
    cy.get('[data-testid="form-sign-in-button"]').click();

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
    cy.get('[data-testid="review-star"]').eq(9).click();
    cy.get('[data-testid="review-submit-btn"]').click();

    // Check that the reviewed game appears in Reviewed
    cy.get('[data-testid="logo-btn"]').click();
    cy.get('[data-testid="toggle-reviewed-btn"]').click();
    cy.contains('1 results');

    // Sort by User Rating
    cy.get('[data-testid="sort-by-select"]').click();
    cy.contains('User Rating').click();
    // Check that the first game is the one reviewed by testuser
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.contains('5/5');
  });
});

describe('Filter Games', () => {
  it('filters games on Nintendo Switch and searches for Mario', () => {
    cy.visit('/');
    // Check that there are 10000 results initially
    cy.contains('10000 results');
    // Filter by Nintendo Switch
    cy.get('[data-testid="filter-item-Nintendo Switch"]').click();
    cy.contains('2180 results');
    // Search for Mario
    cy.get('[data-testid="search-input"]').click().type('mario{enter}');
    cy.contains('22 results');
    // Remove filter
    cy.get('[data-testid="filter-item-Nintendo Switch"]').click();
    cy.contains('106 results');
    // Remove search
    cy.get('[data-testid="empty-search-input"]').click();
    cy.contains('10000 results');
  });

  it('filters games on Music and searches for sing', () => {
    cy.visit('/');
    // Check that there are 10000 results initially
    cy.contains('10000 results');
    // Filter by Music
    cy.get('[data-testid="filter-item-Music"]').click();
    cy.contains('251 results');
    // Search for sing
    cy.get('[data-testid="search-input"]').click().type('sing{enter}');
    cy.contains('6 results');
    // Filter by PlayStation 4
    cy.get('[data-testid="filter-item-PlayStation 4"]').click();
    cy.contains('2 results');
    // Remove filters
    cy.get('[data-testid="filter-item-Music"]').click();
    cy.get('[data-testid="filter-item-PlayStation 4"]').click();
    cy.contains('72 results');
    // Remove search
    cy.get('[data-testid="empty-search-input"]').click();
    cy.contains('10000 results');
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

    // Log in
    cy.visit('/');
    cy.get('[data-testid="modal-sign-in-button"]').click();
    cy.get('[data-testid="username-input"]').click().type('testuser');
    cy.get('[data-testid="form-sign-in-button"]').click();
  });

  afterEach(() => {
    // Log out
    cy.get('[data-testid="toggle-favorites-btn"]').click();
    cy.get('[data-testid="user-nav"]').click();
    cy.get('[data-testid="sign-out-button"]').click();
  });

  it('adds a review', () => {
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
  });

  it('tries to add a review with missing input', () => {
    // Check that testuser has no reviews yet
    cy.get('[data-testid="toggle-reviewed-btn"]').click();
    cy.contains('No games found');
    cy.get('[data-testid="toggle-reviewed-btn"]').click();

    // Open review form
    cy.get('[data-testid="game-card-link"]').first().click();
    cy.get('[data-testid="add-review-btn"]').click();

    // Try to submit with no title
    cy.get('[data-testid="review-submit-btn"]').click();
    cy.contains('Title must be at least 2 characters.');

    // Try to submit with too short title
    cy.get('[data-testid="review-title-input"]').click().type('T');
    cy.get('[data-testid="review-submit-btn"]').click();
    cy.contains('Title must be at least 2 characters.');

    // Try to submit with no platform
    cy.get('[data-testid="review-title-input"]').click().type('est Review');
    cy.get('[data-testid="review-submit-btn"]').click();
    cy.contains('Please select a platform.');

    // Try to submit with no content
    cy.get('[data-testid="review-platform-select"]').click();
    cy.focused().click();
    cy.get('[data-testid="review-submit-btn"]').click();
    cy.contains('String must contain at least 4 character(s)');

    // Try to submit whit too short content
    cy.get('[data-testid="review-content-input"]').click().type('Thi');
    cy.get('[data-testid="review-submit-btn"]').click();
    cy.contains('String must contain at least 4 character(s)');

    // Try to submit with no rating
    cy.get('[data-testid="review-content-input"]').click().type('s is a test review.');
    cy.get('[data-testid="review-submit-btn"]').click();
    cy.contains('Please select a rating.');

    // Finally, submit the review
    cy.get('[data-testid="review-star"]').eq(5).click();
    cy.get('[data-testid="review-submit-btn"]').click();

    // Check that the reviewed game appears in Reviewed
    cy.get('[data-testid="logo-btn"]').click();
    cy.get('[data-testid="toggle-reviewed-btn"]').click();
    cy.contains('1 results');
  });
});
