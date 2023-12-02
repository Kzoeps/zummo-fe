# Setup

To run this app you will need to first install node. Click this [link](https://nodejs.org/en/download) for node installation instructions.

Once you've installed node you can verify whether you have it or not by entering:
```
node -v
```
in your terminal.

Once you've installed node it is time to install `pnpm`. Here is the [link](https://pnpm.io/installation) for pnpm installation instructions.

After you're done installing pnpm, please got to the root of this project and run `pnpm install`, this should install all the packages required for the application.

To start the project, please go to the root of the project in your terminal and type in:
```
pnpm dev
```
# About SvelteKit and Project Structure.

`SvelteKit` is a frontend framework for building full stack applications. It is server side rendered meaning rendering happens on the server and then it passes the html as response (similar to all python applications). 

### Motivation for choosing sveltekit

We chose `SvelteKit` since svelte is syntactically the most similar to plain `HTML`, `CSS` and `JS`. Therefore the learning curve is not as steep as other frameworks. Although syntactically similar to plain web dev it still affords us the composability and reusability of modern frontend frameworks, making code reuse and managing codebase easier.

### Project Structure

```
|--src // contains the source code of the whole application
|   |--lib // contains reusable components and some logic
|   |   |--components // contains reusable components
|   |   |--utils //contains reusable javascript (mostly business logic)
|   |--routes // routes contain all the different pages, i.e. if you have a link eg: /about then the html for that page will be here
|   |   |--bikes
|   |   |--contacts // this directory contains the code to search for a contact and to also edit contacts
|   |   |   |--+page.js // this is the server functions needed to interact with Airtable
                        // if you need to edit the logic of how to interact with airtable this is where you edit
|   |   |   |--+page.svelte // this contains the "frontend" code. What you see and interact with on the browser.
                            // this also contains interactivity logic such as what happens when you open a modal
|   |   |--service
|   |   |   |--+page.js
|   |   |   |--+page.svelte
|   |   |   |--checklistSearch.svelte
|   |   |   |--createChecklist.svelte
|   |   |   |--dataStore.js
|   |   |   |--tuneUpChecklist.svelte
|   |   |--+layout.svelte // this contains the html for the navigation and the footer.
|   |   |--+page.js // svelte generated default (DO NOT TOUCH)
|   |   |--+page.svelte // this is the root page. So http://localhost:3000 displays this page.
|   |   |--Header.svelte // this contains the code for navigation. This component is used in layout
|   |   |--styles.css // styles for the root page
|   |--app.css // the styles here get applied throughout the application
|   |--app.html // Svelte Generated (DO NOT TOUCH)
|--.env // contains the tokens for airtable || Replace token with prod database (currently using test token)
|--all the others are config files for svelte, please do not touch.   

```