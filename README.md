# Prosjekt 2 – Team 48 – GameRater

## Welcome to GameRater

GameRater is an app that helps you explore new and interesting games to play. Search through our database of thousands of games, filter on both platforms and genres, and sort by either name, release date, Metascore or user rating to make it easier to find the games you want. Not sure if a particular game is what you are looking for? Have a look at how a game has been rated and reviewed by other gamers, and make sure to check out the Metascore to see what the critics think. We also highly recommend leaving reviews of the games you have played to help others.

## How to run project

We have set up scripts in the root folder to run both server and client concurrently. It is also possible to run these individually, but for client to fetch data, the server needs to be run first.

### Install dependencies from root

```
npm install
```

### Run client and server from root

```
npm start
```

### Run only server

```
cd server
npm start
```

### Run only client

```
cd client
npm run dev
```

## Prettier and ESLint

We use Prettier and ESLint for consistent code formatting and code quality.

To format all files in the project (both client and server) run the following from the root folder:

```
npm run prettier
```

To check if all files are formatted, run this command instead from the root folder:

```
npm run prettier:check
```

To run ESLint, run the following from the root folder:

```
npm run lint
```
## Testing

### Component testing

For component testing, we use Vitest. These tests use mocked data. To run the tests, run the following from the client folder:

```
npm test
```

For test coverage, run the following from the client folder:

```
npm run coverage
```

### End-to-end testing

End-to-end testing is done with Cypress. For testing, we use a test database, so the server must be started in "test" mode and client must run in dev mode. 

To start the app in "test" mode, run the following in root folder (this will start testserver and client in dev mode):

```
npm start:test
```

Then in another terminal, run the following in client folder (to run test in terminal):

```
npm run cypress:run 
```

Or to run the tests in the Cypress GUI, run the following from client folder:

```
npm run cypress:open
```

This will open the Cypress GUI. From here, click "E2E Testing", then start E2E testing in preferred browser. 

### API testing

Testing the backend API is done with vitest and supertest. These tests run on the test database. To run the tests, run the following from the server folder:

```
npm test
```

For test coverage, run the following from the server folder:

```
npm run coverage
```

### Manual testing

Manual testing was done by all group members throughout the project. For cases not covered by the tests, we have manually tested the app to make sure it works as intended.

## Technology and choices

### Data

We got our game data from IGDB.com, a gaming website with information about thousands of video games. To make sure the dataset was not overly large we scraped their RestAPI for only a subset of the data consisting of around 10,000 games based on release date and popularity.

### Database

We use a MongoDB Community Edition database that is hosted on our virtual machine. MongoDB is a flexible and scalable NoSQL database that multiple group members had worked with in the past, and so it seemed like a good choice for our project.

### Server

We use an Apollo server with GraphQL as our query language. Apollo Server is compatible with our choice of Apollo Client on the client side and

### User Interface

In this project we use the following technologies for our UI:

- Tailwind CSS: Several group members have experience using this framework and we wanted high control over styling. Tailwind allows for fast and flexible development, while also providing consistency.
- shadcn: Shadcn is a new "component" library based on Radix UI that comes with default styling and accessibility while also allowing for a high level of customization. Because of its high level of customization, we only have to import the components that we actually use in our app and therefore reduce bundle size.

### Client

The client is built on React, programmed in TypeScript, and set up with Vite. We use Apollo Client for managing GraphQL data as this streamlines data fetching, caching and state management. For global state management we use Recoil for its ease of use and flexibility.

## GraphQL

### GraphQL Code Generator
To avoid having to manually write types while working with GraphQL in TypeScript, we utilized the GraphQL Code Generator library to generate types for our resolvers and queries. This library automates the process of generating TypeScript types from our GraphQL schema and documents. These types need to be generated whenever the project is run to be updated which is why we have set up our scripts to also run graphql-codegen.

## Functionality

### Search
We have implemented two types of search for games. 

One is a search suggestion that shows up when the user types in the search bar. This search only searches for games by name. Clicking on a suggestion will take the user to the detailed game page for that game.

The other is a search that is triggered when the user presses enter or clicks the search button. This searches for games that also match the selected filters (searches all games if no filters selected). The search will also limit the filters to only show the platforms and genres that are available for the search results.

### Sort and filtering
Sorting and filtering is implemented on the backend to handle whole dataset before being loaded to the frontend. This works with search and pagination.
We decided to use OR filtering for the platforms and genres, meaning that if the user selects multiple platforms or genres, the games will be filtered to include any of the selected platforms or genres. 

We also decided to allow user to choose filters first, then search even though this might result in no results (another solution would be to just reset the filters upon searching). This is because we want to give the user the freedom to choose what they want to search for, and not limit them to only search for games that are available on the platforms they have selected. The selected filters can then be unselected to see if any games match the search and filter combination. 

### List of Games
The games are showed as a list of game cards and we have implemented pagination to handle the large dataset.

### Detailed Game Page
Each game has a detailed game page, where the user can also submit a review and read other user's reviews.

### User "sign in"
For the current state of the project, we decided to let users select a username without needing a password to allow for easier testing. Choosing a unique username will create a new user in our database. If the username is already taken, the app will simply log you into that user.

### Reviews and favorites
Users can add games to favorites and review them. A user is only allowed to add one review per game. This functionality requires the user to be signed in with a user name. When a game is either favorited or reviewed, the user can filter for these on the game list page.

### Light/Dark Mode
A toggle between light and dark mode is implemented.

## Accesibility
The app is tested with screen reader on Mac and tools like Google lighthouse and axe browser extention to test for accesibility issues. We have made sure our app is keyboard navigable and that all elements are accessible. We use semantic HTML, aria-labels when necessary and alt-text for images. We have also used colors with high contrast to make sure the app is readable for people with color blindness.

## Sustainability  
Dark mode is implemented and used as default to reduce energy consumption. 
We have made sure to fetch only the data that is needed and focused on performance and efficiency in our app. Although our bundle size could be reduced further, we have chosen to prioritize the use of these frameworks for ease of development and consistency. We have also made sure to only import the components that we actually use in our app to reduce bundle size. We focus on keeping our code clean and readable to make it easier for future development and maintenance. 


