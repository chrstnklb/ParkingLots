# Genutzte Bibliotheken #
- [NodeJS http-server](https://www.npmjs.com/package/http-server)
  - Installation `npm install http-server -g`
  - tasks.json: `http-server server/public -p 8081`
  - -p und 8081 für die gewünschte Portnummer
  - Tutorial: [Einfacher File Server mit Node.js](https://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http)
- [NodeJS pouchdb](https://www.npmjs.com/package/pouchdb)
- [NodeJS pouchdb-server](https://www.npmjs.com/package/pouchdb-server)
  - task.json: `pouchdb-server --port 3000 --dir output/database`
  - [Install pouchdb for node and typescript](https://pouchdb.com/guides/setup-pouchdb.html):
    - `npm install pouchdb @types/pouchdb`
  - [Install pouch db server for node](https://github.com/pouchdb/pouchdb-server#readme):
    - `npm install -g pouchdb-server`
There is a [pouchdb admin ui](http://127.0.0.1:3000/_utils) for your browser. 

# Lokale Software installieren

## Lade und installiere Node.js LTS auf Ziel-Server
Hier: [nodejs](https://nodejs.org/en/)


## Install typescript
`npm install typescript --save-dev`



## Install cron for node
`npm install cron`

---

# Weitere Informationen und Dokumentation

## Test functions
- There are no automated tests, so: [TESTME.md](docs/testme.md)
- [Architecture (access limited)](https://app.diagrams.net/?mode=google&gfw=1#G1zcpaoR8Q1Q6SUMr0r46VOpz86Vvv0IQ7)
- Outdated informations
    * [README](app-to-cams/README.md) for 'Setup and run ftp client in node'
    * [README](docs/README_LOCALPWA.md) for 'Running application at local machine'

Ungenutzte node dependencies finden
    npx depcheck 

    node pakete deinstallieren

    npm uninstall <paketname>
