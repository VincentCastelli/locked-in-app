set shell := ["zsh", "-cu"]

@default:
    just --list

install:
    npm install

app:
    npm start

android:
    npm run android

ios:
    npm run ios

# Convex helpers

convex-dev:
    npx convex dev

convex-deploy:
    npx convex deploy

convex-dashboard:
    npx convex dashboard
