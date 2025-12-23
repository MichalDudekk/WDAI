# 22 lepiej
FROM node:18-alpine

WORKDIR /usr/src/app

# kopiuje tylko zależności najpierw (szybsze buildy dzięki cache)
COPY package*.json ./

# instalacja zależności (fallback do npm install gdy brak lockfile)
RUN npm ci --only=production || npm install --production

# kopiuje resztę aplikacji
COPY . .

# uruchamianie jako nie-root (proces nie działa z uprawnieniami administratora (root))
RUN chown -R node:node /usr/src/app
USER node

EXPOSE 3000

CMD ["node", "app.js"]