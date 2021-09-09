Funktionen testen
1.  Prüfe zu importierende Excel-Datei liegt im richtigen Format vor
2.  Im DEV-Mode des Browsers: Importiere die Excel zu DB, da der Import zig Sekunden benötigt
    1. Starte den import ohne Entwickler-Modus des Browsers
    2. Bestätige Alert
    3. Öffne Entwickler-Modus des Browsers
        1.  Prüfe, das noch immer Einträge gelesen / geschrieben werden
        2.  Prüfe / vergleiche die Anzahl der Einträge im excel und in der DB zu
        3.  Prüfe / vergleiche 2 Einträge auf Vollständigkeit excel zu db
3.  Prüfe die Export Funktion
    1. Exportiere mittels "Als CSV exportieren"
    2. Öffne Excel / Data und importiere die CSV mit Einstellung utf-8
    3. Prüfe Einträge
