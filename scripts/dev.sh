#!/bin/bash
# UniSpace development startup script

echo "Starting UniSpace in development mode..."

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Start admin backend in background
echo -e "${GREEN}Starting admin backend...${NC}"
cd admin/backend
npm run dev &
ADMIN_BACKEND_PID=$!

# Start local backend in background
echo -e "${GREEN}Starting local backend...${NC}"
cd ../../local/backend
npm run dev &
LOCAL_BACKEND_PID=$!

# Start admin frontend in background
echo -e "${GREEN}Starting admin frontend (port 3001)...${NC}"
cd ../../admin/frontend
PORT=3001 npm start &
ADMIN_FRONTEND_PID=$!

# Start local frontend in background
echo -e "${GREEN}Starting local frontend (port 3000)...${NC}"
cd ../../local/frontend
npm start &
LOCAL_FRONTEND_PID=$!

echo -e "${GREEN}All services started!${NC}"
echo "Admin Backend: PID $ADMIN_BACKEND_PID"
echo "Local Backend: PID $LOCAL_BACKEND_PID"
echo "Admin Frontend: PID $ADMIN_FRONTEND_PID (port 3001)"
echo "Local Frontend: PID $LOCAL_FRONTEND_PID (port 3000)"
