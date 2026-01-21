#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Webpack MF Monorepo - All Apps Launcher${NC}"
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

# Function to run a package with webpack
run_webpack_package() {
    local package_name=$1
    local package_path=$2
    local port=$3
    
    echo -e "${BLUE}Starting $package_name on port $port...${NC}"
    cd "$package_path"
    npm run dev > "/tmp/${package_name}.log" 2>&1 &
    local pid=$!
    echo -e "${GREEN}$package_name started (PID: $pid) - Port: $port${NC}"
    sleep 1
}

# Start all packages
echo -e "${YELLOW}Starting all applications with Webpack Module Federation...${NC}\n"

run_webpack_package "Shell Container" "$ROOT_DIR/packages/shell" "5173"
sleep 2

run_webpack_package "App 1" "$ROOT_DIR/packages/app1" "5174"
sleep 1

run_webpack_package "App 2" "$ROOT_DIR/packages/app2" "5175"
sleep 1

run_webpack_package "App 3" "$ROOT_DIR/packages/app3" "5176"

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}All applications started!${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "${BLUE}Access URLs:${NC}"
echo -e "${YELLOW}  Shell Container: ${GREEN}http://localhost:5173${NC}"
echo -e "${YELLOW}  App 1:          ${GREEN}http://localhost:5174${NC}"
echo -e "${YELLOW}  App 2:          ${GREEN}http://localhost:5175${NC}"
echo -e "${YELLOW}  App 3:          ${GREEN}http://localhost:5176${NC}\n"

echo -e "${BLUE}Application Details:${NC}"
echo -e "${YELLOW}  - Dashboard displays cards from all 3 remote apps${NC}"
echo -e "${YELLOW}  - Click cards to open apps in tabs${NC}"
echo -e "${YELLOW}  - Each app runs independently on its own port${NC}"
echo -e "${YELLOW}  - Module Federation shares dependencies at runtime${NC}\n"

echo -e "${BLUE}View Logs:${NC}"
echo -e "${YELLOW}  tail -f /tmp/Shell\ Container.log${NC}"
echo -e "${YELLOW}  tail -f /tmp/App\ 1.log${NC}"
echo -e "${YELLOW}  tail -f /tmp/App\ 2.log${NC}"
echo -e "${YELLOW}  tail -f /tmp/App\ 3.log${NC}\n"

echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"

# Wait for all background jobs
wait
