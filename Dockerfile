FROM iojs:onbuild
COPY .env /usr/src/app/.env
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]