#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}React Vite Monorepo - All Apps Launcher${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Get the root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo -e "${YELLOW}Root Directory: $ROOT_DIR${NC}\n"

# Check if node_modules exists
if [ ! -d "$ROOT_DIR/node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    cd "$ROOT_DIR"
    npm install
    echo -e "${GREEN}Dependencies installed!${NC}\n"
fi

# Function to run a package
run_package() {
    local package_name=$1
    local package_path=$2
    local port=$3
    
    echo -e "${BLUE}Starting $package_name on port $port...${NC}"
    cd "$package_path"
    PORT=$port npm run dev &
    local pid=$!
    echo -e "${GREEN}$package_name started (PID: $pid)${NC}"
}

# Start all packages
echo -e "${YELLOW}Starting all applications...${NC}\n"

run_package "Shell Container" "$ROOT_DIR/packages/shell" "5173"
sleep 2

run_package "App 1" "$ROOT_DIR/packages/app1" "5174"
sleep 1

run_package "App 2" "$ROOT_DIR/packages/app2" "5175"
sleep 1

run_package "App 3" "$ROOT_DIR/packages/app3" "5176"

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}All applications started!${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "${BLUE}Access the applications:${NC}"
echo -e "  Shell Container: ${GREEN}http://localhost:5173${NC}"
echo -e "  App 1:          ${GREEN}http://localhost:5174${NC}"
echo -e "  App 2:          ${GREEN}http://localhost:5175${NC}"
echo -e "  App 3:          ${GREEN}http://localhost:5176${NC}\n"

echo -e "${YELLOW}Press Ctrl+C to stop all applications${NC}\n"

# Wait for all background processes
wait
