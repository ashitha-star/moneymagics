FROM node:22-bookworm
WORKDIR /usr/src/app

RUN npm install -g pnpm@10.27.0
RUN apt-get update && apt-get install -y --no-install-recommends build-essential g++ make libc6 python3 python3-dev && rm -rf /var/lib/apt/lists/*

# install custom packages here like below
# RUN apk add g++ make python3

ARG A_DOCKERFILE_HASH
ENV A_DOCKERFILE_HASH=${A_DOCKERFILE_HASH}

ARG A_PACKAGE_JSON_HASH
ENV A_PACKAGE_JSON_HASH=${A_PACKAGE_JSON_HASH}
COPY ./package.json ./
RUN pnpm install --dangerously-allow-all-builds
RUN npx -y playwright@1.58.0 install --with-deps

ARG A_CODE_HASH
ENV A_CODE_HASH=${A_CODE_HASH}

ARG NODE_OPTIONS
ENV NODE_OPTIONS=${NODE_OPTIONS}

COPY . .

# So, if we add new package, we won't have to build above base things.
ARG A_NEW_PACKAGES_INSTALL_CMD
ENV A_NEW_PACKAGES_INSTALL_CMD=${A_NEW_PACKAGES_INSTALL_CMD}
RUN $A_NEW_PACKAGES_INSTALL_CMD

EXPOSE 4631
EXPOSE 4632
EXPOSE 9229
CMD [ "npm", "run", "start" ]
 