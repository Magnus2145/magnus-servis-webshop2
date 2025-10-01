FROM node:20-bullseye
WORKDIR /app
COPY package.json ./
COPY apps/web/package.json apps/web/
COPY apps/api/package.json apps/api/
COPY apps/cms/package.json apps/cms/
COPY packages/ui/package.json packages/ui/
COPY packages/config/package.json packages/config/
RUN npm install --workspaces
COPY . .
WORKDIR /app/apps/cms
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]
