# Testkonzept für SachiToDo

## 1. Einleitung
**Zweck des Dokuments:** Dieses Testkonzept beschreibt die Strategie, Methoden, und Werkzeuge für das Testen der Software SachiToDo. Es dient dazu, sicherzustellen, dass die Software die Anforderungen erfüllt und fehlerfrei funktioniert.

## 1. Teststrategie
**Zielsetzung:**
- Sicherstellen, dass alle funktionalen und nicht-funktionalen Anforderungen, bzw. User-Stories erfüllt sind.  
- Reduzierung von Risiken in Prod. 
- Sicherstellung der Benutzerfreundlichkeit und Stabilität der Applikation.

**Abgedeckte Funktionalitäten:**

*ToDo*
- Valides Input beim Hinzufügen eines ToDos
- Fehlermeldung beim leerem Input eines ToDos
- Anzeige von ToDo-Komponenten
- Edit-Modus für ToDo
- ToDo hinzufügen
- ToDo läschen
- ToDo als erledigt markieren
- ToDo editieren
- ToDo anzeigen

*Kategorien*
- Korrekte Anzeige von Kategorie eines ToDos
- Aktiver Kategoriefilter in ToDo-Liste
- Kategoriefilter setzen
- Kategorie hinzufügen
- Kategorie löschen

*Fälligkeitsdatum*
- Korrekte Farbe von Fälligkeitsdatum gemäss Datum
- Sortieren der ToDos nach Fälligkeitsdatum
- Fälligkeitsdatum editieren
- Datum-Funktion für Konvertierung

*Priorität*
- Korrekte Anzeige von Priorität eines ToDos
- Aktiver Prioritätsfilter in ToDo-Liste
- Prioritätsfilter setzen

## 2. Rollen und Verantwortlichkeiten

| Rolle               | Verantwortlichkeit       | Name              |
|---------------------|-------------------------|-------------------|
| Entwickler/Tester         | Erstellung und Ausführung von Tests | Christopher Scheel  |
| Entwickler/Tester          | Erstellung und Ausführung von Tests  | Shansai Muraleetharan  |

## 3. Infrastruktur
**Testumgebungen:**
- **Entwicklungsumgebung:** Lokale Umgebung des jeweiligen Entwicklers

**Testdaten:**
- **Stammdaten:** Beispieldaten via JavaScript-JSON-Objekte innerhalb Test-Scope

**Werkzeuge:**
- Jest-Test-Framework

## 4. Testmethoden
**Verfahren:**
- Agile Entwicklung mit Sprints.
- Integration von Tests in den CI/CD-Workflow.

**Automatisiertes Testing:**
- Einzelne Module (Unit-Tests).
- Zusammenarbeit von Modulen (Integrationstests).
- Validierung der Einzelkomponenten (Componenttests)

<img width="647" alt="image" src="https://github.com/user-attachments/assets/895792ab-9b1c-44b0-bcd3-c7187204d582" />
<br />
Die verwendeten Testarten ordnen sich in den unteren 3 Ebenen der Testpyramide ein.

### Unit testing
Bei Unit testing, werden einzelne, isolierte Komponenten in einer Anwendung getestet. Das sind meist Funktionen, Methoden oder Klassen. Das Ziel bei dieser Art ist es, die Software in ihren Einzelteilen zu testen, dabei ist wichtig zu beachten, dass die zu testende Komponente keine Abhängigkeiten zu anderne System oder Komponenten hat, sondern nur isoliert getestet wird. Dabei setzt man den Fokus auf die Funktionalität und nicht das ganze System. Dadurch kann jede Funktionalität präzise getestet werden.


## 5. Testfallerstellung
**Vorgehen:**
- Ableitung der Testfälle aus den Anforderungen und Akzeptanzkriterien.
- Priorisierung von Testfällen basierend auf Risiko und Nutzungshäufigkeit.

**Beispiele:**

## 6. Testfälle

**Testfälle für allgemeine Funktionen**
| Testfall-ID | Beschreibung                                | Erwartetes Ergebnis                 |
|-------------|--------------------------------------------|-------------------------------------|
| TC001       | Valides Input beim Hinzufügen eines ToDos  | ToDo wird erfolgreich hinzugefügt  |
| TC002       | Fehlermeldung beim leerem Input eines ToDos | Fehlermeldung wird angezeigt       |
| TC003       | Anzeige von ToDo-Komponenten               | ToDo-Liste wird korrekt angezeigt  |
| TC004       | Edit-Modus für ToDo                       | ToDo kann bearbeitet werden        |
| TC005       | ToDo hinzufügen                           | Neues ToDo wird zur Liste hinzugefügt |
| TC006       | ToDo löschen                              | ToDo wird aus der Liste entfernt   |
| TC007       | ToDo als erledigt markieren                | ToDo wird als "vollständig" angezeigt |
| TC008       | ToDo editieren                             | ToDo wird aktualisiert             |
| TC009       | ToDo anzeigen                              | Details des ToDos werden korrekt angezeigt |

---

**Testfälle für Kategorien**
| Testfall-ID | Beschreibung                                | Erwartetes Ergebnis                 |
|-------------|--------------------------------------------|-------------------------------------|
| TC010       | Korrekte Anzeige von Kategorie eines ToDos | Kategorie wird korrekt dargestellt |
| TC011       | Aktiver Kategoriefilter in ToDo-Liste      | ToDos der aktiven Kategorie werden angezeigt |
| TC012       | Kategoriefilter setzen                     | Filter wird erfolgreich angewendet |
| TC013       | Kategorie hinzufügen                      | Neue Kategorie wird erstellt       |
| TC014       | Kategorie löschen                         | Kategorie wird entfernt            |

---

**Testfälle für Fälligkeitsdatum**
| Testfall-ID | Beschreibung                                | Erwartetes Ergebnis                 |
|-------------|--------------------------------------------|-------------------------------------|
| TC015       | Korrekte Farbe von Fälligkeitsdatum gemäss Datum | Farbe ändert sich basierend auf Fälligkeit |
| TC016       | Sortieren der ToDos nach Fälligkeitsdatum   | ToDos sind korrekt sortiert        |
| TC017       | Fälligkeitsdatum editieren                 | Datum wird erfolgreich aktualisiert |
| TC018       | Datum-Funktion für Konvertierung          | Datum wird korrekt konvertiert     |

---

**Testfälle für Priorität**
| Testfall-ID | Beschreibung                                | Erwartetes Ergebnis                 |
|-------------|--------------------------------------------|-------------------------------------|
| TC019       | Korrekte Anzeige von Priorität eines ToDos | Priorität wird korrekt dargestellt |
| TC020       | Aktiver Prioritätsfilter in ToDo-Liste     | ToDos der aktiven Priorität werden angezeigt |
| TC021       | Prioritätsfilter setzen                    | Filter wird erfolgreich angewendet |

## 7. Fehlerbehandlung
**Prozess:**
1. Fehler wird verbal innerhalb des Teams erläutert.
2. Fehler wird priorisiert und dem zuständigen Entwickler zugewiesen.
2. Fehler wird vom jeweiligen Entwickler möglichst selbständig gelöst.
4. Nach Behebung wird der Fehler erneut getestet. 

**Status:**
- Offen: Fehler ist noch nicht behoben.  
- In Bearbeitung: Fehler wird untersucht/behandelt.  
- Geschlossen: Fehler wurde erfolgreich behoben und getestet.  
