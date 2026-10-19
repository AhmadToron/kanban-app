# Kanban – React-applikation

En enkel Kanban-tavla där man kan skapa uppgifter, flytta dem mellan kolumnerna
**Att göra**, **Pågående** och **Klart**, samt ta bort dem.

- **Frontend:** React + TypeScript (Vite)
- **Backend:** Node.js + Express
- **Tester:** Jest + React Testing Library

## Mappstruktur

```
client/                 # React-appen
└── src/
    ├── components/     # UI-komponenter (Board, Column, TaskCard, TaskForm, Header)
    ├── hooks/          # Egna hooks (useTasks)
    ├── services/       # API-anrop mot backend (api.ts)
    ├── types/          # TypeScript-interfaces (Task, NewTask, BoardColumn)
    ├── utils/          # Hjälpfunktioner (formatDate, status)
    ├── App.tsx
    └── main.tsx
server/                 # Express-servern
├── data/tasks.json     # Uppgifterna sparas här
├── taskStore.js        # Läser/skriver JSON-filen
└── index.js            # API-endpoints
```

## Kom igång lokalt

Starta backend:

```bash
cd server
npm install
npm start
```

Servern körs på `http://localhost:3001`.

Starta frontend (i en ny terminal):

```bash
cd client
npm install
npm run dev
```

Appen öppnas på `http://localhost:5173`.

## Köra tester

```bash
cd client
npm test
```

## API

| Metod  | Endpoint         | Beskrivning                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/tasks`     | Hämtar alla uppgifter        |
| POST   | `/api/tasks`     | Skapar en ny uppgift         |
| PATCH  | `/api/tasks/:id` | Ändrar status på en uppgift  |
| DELETE | `/api/tasks/:id` | Tar bort en uppgift          |

## Driftsättning

**Backend (Render):**

1. Skapa en ny *Web Service* på [render.com](https://render.com) kopplad till repot.
2. Root directory: `server`
3. Build command: `npm install`
4. Start command: `npm start`

**Frontend (Vercel):**

1. Importera repot på [vercel.com](https://vercel.com).
2. Root directory: `client` (Vercel känner av att det är ett Vite-projekt).
3. Lägg till miljövariabeln `VITE_API_URL` med adressen till backend, t.ex. `https://min-kanban-server.onrender.com`.

## Tekniska val

- **Egen hook (`useTasks`)** samlar all logik för att hämta och ändra uppgifter, så att komponenterna bara behöver visa data.
- **`services/api.ts`** innehåller alla fetch-anrop, vilket gör att komponenterna inte behöver veta något om servern.
- Appen hanterar tre tillstånd: **laddar**, **framgång** och **fel**.
- Kort flyttas med knappar istället för drag-and-drop, så att allt fungerar med tangentbordet.
- Semantisk HTML (`header`, `main`, `section`, `article`, `form`, `label`) och synliga fokusmarkeringar.

## Kända begränsningar

- Datan sparas i en JSON-fil. På Render:s gratisnivå nollställs filsystemet när servern startas om, så nya uppgifter kan försvinna efter en omstart. En riktig databas skulle lösa det.
