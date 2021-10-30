# Inhaltsverzeichnis

0. [Offene Vorbereitungen](#Offene-Vorbereitungen)
0. [Quick Start](#Quick-Start)
1. [Einrichtung der Datenbank](#Einrichtung-der-Datenbank)
2. [Projekt installieren](#Projekt-Installieren)
3. [Anwendungsserver](#Anwendungsserver)
4. [FTP Server](#FTP-Server)
5. [FTP Slient](#FTP-Client)
6. [Cron Job](#Cron-Job)

# Offene Vorbereitungen

<span style="color:red">&cross; offen</span>
<span style="color:green">&check; offen</span>

<span style="color:red">&cross; Cron-Timer in env verschieben</span>

<span style="color:red">&cross; Cron Job verproben</span>

<span style="color:red">&cross; Erreichbarkeit des FTP-Servers verproben</span>

<span style="color:red">&cross; Wo stehen die Adressen (extra config file erstellen)</span>

# Quick Start

1. Terminal: ```npminstall```
2. Ordner erstellen für die Kameras (FTP-Server)
3. Starte alle Anwendungen

```
concurrently --kill-others "npm run start-application" "npm run start-ftp-server" "npm run start-cron-job"
```

# Einrichtung der Datenbank
Genutzt wird PouchDb, ein Ableger von CouchDB ([Dokumentation](https://docs.couchdb.org/en/stable/))

1. Download from http://couchdb.apache.org/#download
2. [Installationsanweisungen für Windows](https://docs.couchdb.org/en/stable/install/windows.html)
3. User und Passwort festlegen
4. Datenbank ist einsehbar unter http://127.0.0.1:5984/_utils#setup
5. Aktiviere Cors **(Configurations/Enable Cors/All domains)**

# Projekt installieren
1. Installieren NodeJS [nodejs](https://nodejs.org/en/)
2. Lege dieses Projekt ab
3. Wechsel in das Hauptverzeichnis des Projektes (Dort, wo die package.json liegt)
4. Öffne die Powershell
5. ```npm install```installiert alle NPM Pakete die die Anwendung nutzt

# Anwendungsserver
Liefert die Anwendung und nutzt dafür HTML, CSS, Javscript, EJS und ExpressJS.
<details>
  <summary>NPM Pakete</summary>

- **express** (Client-Server Kommunikation)
- **express-fileupload** (Upload vom Client zum Server)
- **ejs** (Auslieferung von html mit eingebettetem Javascript)
- **dotenv** (Setzen und Nutzung von Umgebungsvariablen)
- **dotenv-expand** (Umgebungsvariablen zusammensetzen)
- **date-fns** (Datumsformatierungen und Berechnungen)
- **pouchdb**(Verbindung mit der Datenbank aufbauen)**
- **pouchdb-find**(Mittels **find** gezielt in der DB suchen)**
- **xlsx**(für dem Import und Export von Esxcel-Dateien)**
</details>

<br>

Start des Anwendungsservers:
```
node server/express.js
```
# FTP-Server
Bietet die CSV-Dateien für die Kamera-Systeme an.

<details>
  <summary>NPM Paket</summary>

- **ftp-srv** (Ein FTP Server)

</details>

<br>

Starte FTP server:
``` node
node server/ftp-server/ftp-server.js
```

<br>

# FTP Client
To test, if the started FTP-Server for the CSV files works:
- On Mac you can use [Quick FTP](https://apps.apple.com/de/app/quickftp-server/id1451646819?mt=12)
- ℹ️ to fake camera system ftp server

<br>

# Cron Job
Generiert in festen zeitlichen Abständen CSV-Dateien für die verschiedenen Kamera-Systeme und legt sie für den FTP Server ab

<details>
  <summary>NPM Paket</summary>

- **cron** (Starte zeitlich getriggerten Job)

</details>

<br>

<span style="color:red">**Der Job geht davon aus, dass es für jede Kamera einen Unterordner im outgoing Ordner des FTP-Servers gibt.**</span>

Starte Cron-Job:
```
node server/ftp-server/cron.js
```

<br>

# Test der Anwendung

## Vorbereitung

- Via Fauxton
    - Lösche die Datenbank
    - Erstelle eine neue Datenbank
- Starte alle Server

## Daten einspielen

- Öffne Admin-Bereich
- Importieren eine Excel-Datei mit 10.000 Einträgen
- Prüfen in Fauxton, ob alles geschrieben wurde
- Prüfe in der Anwendung, ob die Daten angezeigt werden
## Teste manuellen Teil der Anwendung
### Teste CRUD
#### Create
- Erstelle eine neue Parkerlaubnis
    - Alle Felder befüllen
    - Allen Parkplätze aktivieren
- Suche nach Eintrag und prüfe
#### Read
- Done
#### Update
- Wähle einen anderen Eintrag und klicke auf den Stift
- Editiere jedes Feld (für 2 hinten an) und peichere
- Suche nach Eintrag und prüfe die Existenz
#### Delete
- Wähle einen Eintrag und klicke auf die Mülltonne
- Suche nach Eintrag und prüfe das Fehlen
### Teste CSV Export
- Öffne Admin Bereich
- Wähle einen Export aus und klicke
- Bestätige den Download
- Prüfe den Inhalt der CSV mit Format
    - Kennzeichen;Land;Nachname, Vorname
    - Keine erste Kopfzeile
## Teste den automatischen Teil der Anwendung
### CSV-Export
- Prüfe den Zielordner für die CSV's
- Prüfe die Zeitstempel
- Prüfen den Inhalt der CSV mit Format
    - Kennzeichen;Land;Nachname, Vorname
    - Keine erste Kopfzeile
### Excel Export
- Öffne Admin Bereich
- Wähle den Excel Export aus und klicke
- Bestätige den Download
- Prüfe:
    - Dateinamen
    - Inhalte

<br>