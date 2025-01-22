start:
    pnpm install
    pnpm build
    pm2 restart rsshub-service || pm2 start "pnpm start" --name "rsshub-service"

update:
    git pull
    pnpm install
    pnpm build
    pm2 restart rsshub-service

log:
    pm2 log rsshub-service