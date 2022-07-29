# goblin-collectors

Goblins collecting items (full-stack app).

## Dependencies

1. `npm init -y`
1. `npm install eslint --save-dev`
1. `npx eslint --init`

### API Dependencies

1. `npm install express --save`
1. `npx dotenv-vault new`
1. `npx dotenv-vault@latest login`
1. `npx dotenv-vault@latest open`
1. `npm install dotenv --save`

### Create Database

1. `heroku login`
1. `heroku addons:create heroku-postgresql:hobby-dev --app goblin-collectors-server`
1. `heroku config` to get DATABASE_URL
1. Add DATABASE_URL to .env file

### Testing

1. `npm install jest --save-dev`
1. Update test script in package.json to use jest
1. `npm install supertest --save-dev`
1. Add `"module": true` to eslintrc file

## Notes

1. Linter
   1. Eslint can now be installed and configured with the command: `npm init @eslint/config`
