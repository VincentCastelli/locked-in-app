set shell := ["powershell.exe", "-NoLogo", "-NoProfile", "-Command"]

server_dir := "server"
prisma_schema := "prisma/schema.prisma"

@default:
    just --list

install:
    npm install
    npm --prefix {{server_dir}} install

app:
    npm start

android:
    npm run android

ios:
    npm run ios

server:
    npm --prefix {{server_dir}} run dev

server-build:
    npm --prefix {{server_dir}} run build

server-start:
    npm --prefix {{server_dir}} start

# Database helpers

db-generate:
    npm --prefix {{server_dir}} run prisma:generate

db-migrate:
    npm --prefix {{server_dir}} run prisma:migrate

db-studio:
    npm --prefix {{server_dir}} run prisma:studio

db-reset:
    Push-Location {{server_dir}}; npx.cmd prisma migrate reset --schema=../{{prisma_schema}}; Pop-Location

# Prisma Data Proxy tunnel

tunnel port=12345:
    npx.cmd @prisma/ppg-tunnel --port {{port}}
