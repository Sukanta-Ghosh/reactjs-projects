## Run Projects

rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps || npm install
