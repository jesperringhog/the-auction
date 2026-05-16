# The Auction

A real-time auction application built as a team project together with two other developers using Node.js, Express, MongoDB, TypeScript, and WebSockets.

Users can create auctions, join live bidding sessions, and place bids with instant updates across connected clients — because auctions without real-time feedback are basically just very stressful online shopping.

## Features

- User registration and login system
- Create and manage auctions
- Real-time bidding with WebSockets
- Live updates for:
    - Incoming bids
    - Leading bidder
    - Auction status
- Bid history with timestamps
- Prevent users from bidding on their own auctions
- Display auction owner and current highest bid
- Dynamic frontend rendering using TypeScript

## Tech Stack

Backend
- Node.js
- Express
- Mongo DB

Frontend
- TypeScript (Vanilla)
- SCSS
- HTML

Deployment:
Backend
- Render
Frontend
- Vercel

## My Contributions

The workload was shared fairly evenly across the team, but my main responsibilities included:

- Implementing the create-auction flow
- Connecting authenticated users to created auctions through middleware
- Building and rendering auction-related UI components in TypeScript
- Completing and refining the bid placement functionality
- Handling frontend/backend communication for live bidding updates
- Deploying the frontend to Vercel and the backend to Render
- Debugging and fixing issues across both frontend and backend

## Installation

Clone the repository:
```bash
git clone https://github.com/jesperringhog/the-auction.git
cd the-auction
```
Install dependencies:
```bash
npm install
```
Start the development environment:
```bash
npm run dev
```

## Project Structure

- /api
-   /controllers   – Route/controller logic   
-   /middleware    – Authentication and middleware  
-   /models        – MongoDB models  
-   /routes        – Express routes  
-   /sockets       – WebSocket handling  

- /frontend  
-   /models        – Frontend types/interfaces  
-   /pages         – Application pages  
-   /services      – API communication  
-   /sockets       – Frontend socket handling  
-   /utils         – Helper functions  


## What I Learned

- Working collaboratively in a full-stack team environment
- Structuring communication between frontend and backend
- Using WebSockets for real-time functionality
- Managing shared state and live updates across clients
- Debugging asynchronous features and event-driven flows
- Building scalable Express route structures
- Deploying and configuring full-stack applications across separate hosting platforms
- Handling environment variables, CORS configuration, and WebSocket connections in production environments

## Future Improvements

- Refactor parts of the codebase for improved readability
- Improve authorization and security handling
- Add stronger validation for bids and auction creation
- Improve UX with clearer feedback and error handling
- Add responsive/mobile-first improvements
- Implement automated testing

## Repository

https://github.com/jesperringhog/the-auction.git