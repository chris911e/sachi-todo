# Sachi CI Pipeline
Dieses Dokument beschreibt die Schritte und Prozesse der CI-Pipeline für die Anwendung TodoApp. Die Pipeline umfasst das Einrichten der Umgebung, das Testen, das Linten und den Build-Prozess, um sicherzustellen, dass der Code fehlerfrei und bereit für die Veröffentlichung ist.

## Workflow-Trigger
Die Pipeline wird durch folgende Ereignisse ausgelöst:
	•	Push: Auf jedem Branch.
	•	Pull Request: Bei Pull Requests auf den main Branch.
	•	Manuell: Per Workflow Dispatch (manuelle Ausführung).

## **Job 1: setup-environment**

### **Beschreibung**
Dieser Job richtet die Entwicklungsumgebung ein. Dazu gehört das Klonen des Repositories, Caching von Abhängigkeiten und Installation notwendiger Pakete.

### **Schritte**

1. **Checkout Code**  
   Lädt den aktuellen Code aus dem Repository.  
   ```yaml
   uses: actions/checkout@v2
   ```

2. **Cache Node.js Modules**  
   Cacht die `node_modules`, um bei wiederholten Builds Zeit zu sparen. Der Cache wird anhand des Hashes der `package-lock.json` Datei erstellt.  
   ```yaml
   uses: actions/cache@v3
   with:
     path: node_modules
     key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}
     restore-keys: |
       ${{ runner.os }}-node-modules-
   ```

3. **Set up Node.js**  
   Installiert die Node.js-Version 18.  
   ```yaml
   uses: actions/setup-node@v2
   with:
     node-version: '18'
   ```

4. **Install Dependencies**  
   Installiert die Projektabhängigkeiten mittels `npm install`.  
   ```yaml
   run: npm install
   ```

5. **List Directory (Debugging)**  
   Zeigt die Verzeichnisstruktur an, um sicherzustellen, dass alle Dateien vorhanden sind.  
   ```yaml
   run: ls
   ```

---

## **Job 2: run-test**

### **Beschreibung**
Führt die Tests der Anwendung aus, erstellt Berichte und überprüft die Funktionalität des Codes.

### **Schritte**

1. **Checkout Code**  
   Lädt den aktuellen Code aus dem Repository.  
   ```yaml
   uses: actions/checkout@v2
   ```

2. **Cache Node.js Modules**  
   Stellt den Cache der Abhängigkeiten wieder her, falls verfügbar.  
   ```yaml
   uses: actions/cache@v3
   with:
     path: node_modules
     key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}
     restore-keys: |
       ${{ runner.os }}-node-modules-
   ```

3. **Run Jest Tests**  
   Führt die Tests mittels `npm run test` aus.  
   ```yaml
   run: npm run test
   ```
4. **Run Cypress Tests**
   Führt alle Cypress tests durch, indem das Projekt neu gebuilded und gestartet wird.
   ```yaml
	uses: cypress-io/github-action@v6
   	with:
   	   build: npm run build
     	   start: npm run dev
   ```
   

6. **Test Report**  
   Generiert einen Testbericht im XML-Format und veröffentlicht ihn.  
   ```yaml
   uses: dorny/test-reporter@v1
   with:
     name: Sachi ToDo JEST Tests
     path: reports/junit.xml
     reporter: jest-junit
   ```

---

## **Job 3: lint**

### **Beschreibung**
Prüft den Code auf potenzielle Probleme und Coding Style-Verstösse.

### **Schritte**

1. **Checkout Code**  
   Lädt den aktuellen Code aus dem Repository.  
   ```yaml
   uses: actions/checkout@v2
   ```

2. **Cache Node.js Modules**  
   Stellt den Cache der Abhängigkeiten wieder her, falls verfügbar.  
   ```yaml
   uses: actions/cache@v3
   with:
     path: node_modules
     key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}
     restore-keys: |
       ${{ runner.os }}-node-modules-
   ```

3. **Lint Application**  
   Führt Linting mittels `npm run lint` aus.  
   ```yaml
   run: npm run lint
   ```

---

## **Job 4: build-app**

### **Beschreibung**
Baut die Anwendung und speichert sie als Artefakt für die Veröffentlichung.

### **Voraussetzungen**
Dieser Job benötigt die erfolgreichen Ergebnisse der vorherigen Jobs `run-test` und `lint`.

### **Schritte**

1. **Checkout Code**  
   Lädt den aktuellen Code aus dem Repository.  
   ```yaml
   uses: actions/checkout@v2
   ```

2. **Cache Node.js Modules**  
   Stellt den Cache der Abhängigkeiten wieder her, falls verfügbar.  
   ```yaml
   uses: actions/cache@v3
   with:
     path: node_modules
     key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}
     restore-keys: |
       ${{ runner.os }}-node-modules-
   ```

3. **Build Application**  
   Baut die Anwendung mittels `npm run build`.  
   ```yaml
   run: npm run build
   ```

4. **List Directory (Debugging)**  
   Zeigt die Verzeichnisstruktur an, um sicherzustellen, dass der Build erfolgreich war.  
   ```yaml
   run: ls -la
   ```

5. **Upload Artifact**  
   Speichert den Build (`.next`-Ordner) als Artefakt mit einer Aufbewahrungsdauer von 15 Tagen.  
   ```yaml
   uses: actions/upload-artifact@v4
   with:
     name: TodoApp
     path: .next
     include-hidden-files: true
     if-no-files-found: error
     retention-days: 15
   ```

---
## **Zusammenfassung**

Die Pipeline stellt sicher, dass:
1. **Code Qualität:** Durch Tests und Linting überprüft wird.
2. **Effizienz:** Durch Caching von Abhängigkeiten Zeit gespart wird.
3. **Verlässlichkeit:** Der Build wird als Artefakt gespeichert und kann für die Veröffentlichung verwendet werden.
