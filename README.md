# DigiDip-Challenge

## Install & run

1. npm install
2. node index.js

## Feedback

1. I've provided feedback as comments in `index.js`, using the statements `JW NOTE: <message>` and `JW NOTE: end.` as start and end of feedback, additionally I have written some code as an attempt to provide improvement ideas.
2. Removed `node_modules/`, it's not unnecassary to store third-party libraries in your project's reposity. 
3. With the `package-lock.json` file and executing `npm install` will generate an identical `node_modules/` upon request.
   1. Additionally, `yarn install` will also work, generating a `yarn.lock` file.
4. Added the file `.gitignore`, with a single line `node_modules/`. This will prevent `git` attempting to add `node_modules/` to the repository.
5. Inside the `main` branch, executed `git rebase master` to bring the code changes into the default branch.
6. created a more unique repository name, from `digidip` to `digidip-challenge`. 
