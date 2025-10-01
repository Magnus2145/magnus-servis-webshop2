.PHONY: install dev web api cms seed lint typecheck build clean

install:
npm install --workspaces

web:
npm run dev --workspace @magnus/web

api:
npm run dev --workspace @magnus/api

cms:
npm run develop --workspace @magnus/cms

seed:
npm run seed --workspace @magnus/api

lint:
npm run lint --workspaces

typecheck:
npm run typecheck --workspace @magnus/web && npm run typecheck --workspace @magnus/api

build:
npm run build --workspace @magnus/web && npm run build --workspace @magnus/api && npm run build --workspace @magnus/cms

clean:
rm -rf node_modules apps/*/node_modules packages/*/node_modules dist .turbo
