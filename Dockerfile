ARG PARENT_VERSION=2.2.2-node20.11.1
ARG PORT=3007
ARG PORT_DEBUG=9229

# Development
FROM defradigital/node-development:${PARENT_VERSION} AS development
ARG PARENT_VERSION
LABEL uk.gov.defra.adp.parent-image=defradigital/node-development:${PARENT_VERSION}
ARG PORT
ENV PORT ${PORT}
ARG PORT_DEBUG
EXPOSE ${PORT} ${PORT_DEBUG}
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build
CMD [ "npm", "run", "start:watch" ]

# Production
FROM defradigital/node:${PARENT_VERSION} AS production
ARG PARENT_VERSION
ARG REGISTRY
LABEL uk.gov.defra.adp.parent-image=defradigital/node:${PARENT_VERSION}
ARG PORT
ENV PORT ${PORT}
EXPOSE ${PORT}
COPY --from=development /home/node/app/ ./app/
COPY --from=development /home/node/package*.json ./
RUN npm ci
CMD [ "node", "app" ]
