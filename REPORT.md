# 📌 Rättningsrapport – fed25s-the-auction-retry-jesperfridaerika

## 🎯 Uppgiftens Krav:
# Gruppuppgift - Auktionsapplikation

Ni skall skapa en auktion-applikation med hjälp av websockets. En användare skall kunna registrera sig på sidan och sedan kunna skapa en (eller flera) auktion(er). En auktion är en sida som använder sig av websockets för att skicka bud och hålla reda på när auktionen går ut. 

En användare måste vara inloggad för att kunna använda någon del av systemet.

## Api:t

Ni skall bygga ett api med hjälp av node.js och express. Denna gång skall ni implementera websocket för att skapa en realtidskommunikation mellan servern och klienten. 

Api:t skall ta emot anrop för att skapa en auktion och kunna ta emot bud samt hålla reda på när auktionen är slut och vem som vann.  

En användare skall kunna logga in. Detta betyder att ni behöver lagra användare i databasen så att ni kan slå upp dessa och logga in vid behov. 

Ni behöver även kunna registrera användare. 

## Klienten

Det finns ett projekt för er frontend i denna mall. Ni behöver göra det minsta möjliga i detta projekt för att få er auktions-site att fungera. 

Klienten behöver även ha funktioner för att registrera användare och logga in användare. 

## Betyg G

- Ett api med node.js och express
- Websockets är implementerat
- Bra kodstruktur för websockets
- Hantering av rum för websockets
- En användare kan skapa en auktion
- En användare kan lägga bud på en auktion (inte sin egen dock)
- En användare kan se information om pågående auktion genom att gå in på auktions-sidan.
- Inloggning av användare med hjälp av cookies
- Registering av användare

Om ca 85% av kraven är uppfyllda anses uppgiften vara godkänd. 
Om ett bra försök har gjorts för att implementera inloggning räcker det. Denna klass är frontendutvecklare, inte backendutvecklare. 

## 🔍 ESLint-varningar:
- /app/repos/fed25s-the-auction-retry-jesperfridaerika/frontend/src/main.ts - no-console - Unexpected console statement.
- /app/repos/fed25s-the-auction-retry-jesperfridaerika/frontend/src/services/auctionService.ts - no-console - Unexpected console statement.,no-console - Unexpected console statement.
- /app/repos/fed25s-the-auction-retry-jesperfridaerika/frontend/src/services/loginService.ts - no-console - Unexpected console statement.
- /app/repos/fed25s-the-auction-retry-jesperfridaerika/frontend/src/services/logoutService.ts - no-console - Unexpected console statement.,no-console - Unexpected console statement.
- /app/repos/fed25s-the-auction-retry-jesperfridaerika/frontend/src/services/registerService.ts - no-console - Unexpected console statement.,no-unused-vars - 'error' is defined but never used.,@typescript-eslint/no-unused-vars - 'error' is defined but never used.
- /app/repos/fed25s-the-auction-retry-jesperfridaerika/frontend/src/sockets/endAuction.ts - no-console - Unexpected console statement.
- /app/repos/fed25s-the-auction-retry-jesperfridaerika/frontend/src/sockets/joinAuction.ts - no-console - Unexpected console statement.,no-console - Unexpected console statement.
- /app/repos/fed25s-the-auction-retry-jesperfridaerika/frontend/src/sockets/placeBid.ts - no-console - Unexpected console statement.,no-console - Unexpected console statement.
- /app/repos/fed25s-the-auction-retry-jesperfridaerika/frontend/src/utils/bidFormUtil.ts - no-console - Unexpected console statement.

## 🏆 **Betyg: G**
📌 **Motivering:** Backend i `api/src` uppfyller helheten av G-kraven: ni har ett API med Node.js + Express, använder MongoDB via Mongoose, och har WebSockets med Socket.IO där socket-logiken är uppdelad i separata moduler (t.ex. `sendAllAuctions`, `joinAuction`, `placeBid`, `endAuction`). Rum hanteras korrekt med `socket.join(auctionId)` och events skickas till rätt auktion via `io.to(auctionId).emit(...)`. En inloggad användare kan skapa auktion via skyddad route (`/auctions` med `auth`), auktioner sparas i databasen och broadcastas (t.ex. `auctionCreated`). Budflödet via socket-event `placeBid` innehåller viktiga affärsregler: man kan inte buda på sin egen auktion och bud måste överstiga nuvarande bud, annars skickas fel (t.ex. `bidError`). Auktioner avslutas genom att servern håller koll på sluttid (polling som sätter `isActive=false` och emitterar avslut-event), och användare kan se pågående auktion genom att gå in på auktions-sidan och ansluta till rummet (`joinAuction`) för att få auktion/bidhistorik och uppdateringar.

Det finns dock tydliga brister i autentiseringens säkerhet: JWT verifieras inte (endast `jwt.decode`) och hemligheten är hårdkodad. Det gör att kravet “en användare måste vara inloggad för att kunna använda någon del av systemet” i strikt säkerhetsbemärkelse kan kringgås. Med tanke på kursens formulering att “ett bra försök” för inloggning räcker (målgruppen är frontendutvecklare) bedöms implementationen ändå som tillräcklig för att nå ca 85% av kraven och därmed betyget G.

💡 **Förbättringsförslag:**  
1) Auth-säkerhet (viktigast): byt från `jwt.decode` till `jwt.verify(token, process.env.JWT_SECRET)` i både HTTP-middleware och socket-flöden. Flytta secret till `.env` och säkra cookies (t.ex. `httpOnly`, `sameSite`, och `secure: true` i produktion).
2) Socket-auth/identitet: verifiera token vid anslutning och sätt t.ex. `socket.data.user`, så att varje event (som `placeBid`) inte behöver lita på en overify:ad cookie. Emit:a tydliga fel till klienten när token saknas/är ogiltig.
3) Prestandabugg: `lookForEndedAuctions()` startas inne i `io.on("connection")`, vilket skapar en ny `setInterval` per anslutning. Flytta den så den startas exakt en gång vid serverstart för att undvika N polling-loopar och onödig DB-belastning.
4) Validering: undvik `if (!startPrice)` (0 blir felaktigt “saknas”). Validera med `startPrice === undefined` och kontrollera minvärden. Validera även att `endTime` är ett giltigt datum och ligger i framtiden.
5) Felhantering i sockets: lägg konsekvent `try/catch` runt DB-anrop i socket-moduler (`joinAuction`, `placeBid`, `sendAllAuctions`, `endAuction`) och skicka fel till klienten via ett standardiserat event.
6) Datakontrakt/DTO: separera inkommande payload-typer från Mongoose-typer (ta inte emot ett Mongoose-infererat `Bid`-objekt från klienten). Definiera tydliga DTO:er för vad klienten får skicka.
7) Filnamn/casing: standardisera filnamn och importvägar (case-sensitivitet kan annars krascha på Linux/CI).

Bra jobbat med realtidsdelen och rums-hanteringen—det är ofta den svåraste biten i den här typen av uppgift. Med några riktade förbättringar i auth och robusthet har ni en riktigt stabil grund att bygga vidare på.

## 👥 Gruppbidrag

| Deltagare | Antal commits | Commit % | Uppgiftskomplettering | Totalt bidrag |
| --------- | -------------- | -------- | ---------------------- | ------------- |
| Frida | 63 | 58.3% | 0.33 | 0.43 |
| Erika Hörling | 30 | 27.8% | 0.33 | 0.31 |
| jesperringhog | 15 | 13.9% | 0.33 | 0.26 |


### 📊 Förklaring
- **Antal commits**: Antalet commits som personen har gjort
- **Commit %**: Procentuell andel av totala commits
- **Uppgiftskomplettering**: Poäng baserad på mappning av README-krav mot kodbidrag 
- **Totalt bidrag**: Viktad bedömning av personens totala bidrag (40% commits, 60% uppgiftskomplettering)
