FROM node:23-alpine AS base

ENV DIR=/app
WORKDIR $DIR


FROM base AS builder

RUN apk update && npm install -g pnpm@10.8.0

COPY package.json pnpm-lock.yaml $DIR/

RUN pnpm install --frozen-lockfile

COPY tsconfig*.json $DIR
COPY nest-cli.json $DIR
COPY src $DIR/src

RUN pnpm run build && pnpm prune --production



FROM base AS production

ENV NODE_ENV=production
ENV USER=node
ENV PORT=4000

COPY --from=builder $DIR/package.json $DIR/
COPY --from=builder $DIR/node_modules $DIR/node_modules
COPY --from=builder $DIR/dist $DIR/dist

RUN chown -R $USER:$USER $DIR

USER $USER
EXPOSE $PORT

CMD ["node", "dist/main.js"]
