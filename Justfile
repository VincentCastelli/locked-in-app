set shell := ["zsh", "-cu"]

@default:
    just --list

install:
    npm install

app:
    npm start

app-tunnel:
    npx expo start --tunnel

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
