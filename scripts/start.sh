#!/bin/bash
# UniSpace startup script

echo "Starting UniSpace application..."

# Start MongoDB
echo "Starting MongoDB..."
mongod &

# Start admin backend
echo "Starting admin backend..."
cd admin/backend
npm run dev &

# Start local backend
echo "Starting local backend..."
cd ../../local/backend
npm run dev &

# Start admin frontend
echo "Starting admin frontend..."
cd ../../admin/frontend
npm start &

# Start local frontend
echo "Starting local frontend..."
cd ../../local/frontend
npm start &

echo "All services started!"
