# Smart Task Manager with AI Suggestions

## Overview
This is a simple full-stack application that allows users to manage tasks and receive AI-based suggestions based on task type.

## Tech Stack
- Backend: Flask
- Frontend: React
- Database: In-memory (for simplicity)

## Features
- Add and delete tasks
- AI-based suggestions based on task category
- Clean and responsive UI

## Architecture
- REST API using Flask
- React frontend consuming API
- Modular design with clear separation of concerns

## Design Decisions
- Chose Flask for simplicity and speed of development
- Used in-memory storage to reduce setup complexity
- Implemented rule-based AI for predictable and safe outputs

## AI Usage
- AI suggestions are generated using rule-based logic
- Ensures consistent, safe, and context-aware outputs
- Avoids unpredictable responses

## Tradeoffs
- No database persistence
- No authentication
- Limited scalability

## How to Run

### Backend
cd backend  
python app.py  

### Frontend
cd frontend  
npm start  

## Future Improvements
- Add database (SQLite/PostgreSQL)
- Add authentication
- Use real AI APIs (OpenAI)
- Improve UI/UX