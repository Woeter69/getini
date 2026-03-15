#!/bin/bash
set -e

# ini — Installer Script
# https://ini.woeter.online

RESET="\033[0m"
BOLD="\033[1m"
GREEN="\033[32m"
CYAN="\033[36m"
YELLOW="\033[33m"
RED="\033[31m"

echo -e "${CYAN}${BOLD}⚡ ini installer${RESET}"
echo -e "----------------"

# Check for Go
if ! command -v go &> /dev/null; then
    echo -e "${RED}Error: Go is not installed.${RESET}"
    echo -e "Please install Go 1.21+ first: https://go.dev/dl/"
    exit 1
fi

echo -e "${CYAN}Installing ini from github.com/Woeter69/ini@latest...${RESET}"

# Install via go install
if go install github.com/Woeter69/ini@latest; then
    GOPATH=$(go env GOPATH)
    INSTALL_PATH="${GOPATH}/bin/ini"
    
    echo -e "\n${GREEN}${BOLD}✓ Successfully installed ini!${RESET}"
    echo -e "Location: ${INSTALL_PATH}"
    
    # Check if in PATH
    if [[ ":$PATH:" != *":${GOPATH}/bin:"* ]]; then
        echo -e "\n${YELLOW}${BOLD}⚠ Note: Your Go bin directory is not in your PATH.${RESET}"
        echo -e "Add this to your shell profile (~/.bashrc, ~/.zshrc, etc.):"
        echo -e "${BOLD}  export PATH=\"\$PATH:\$(go env GOPATH)/bin\"${RESET}"
    fi
    
    echo -e "\nTry it out by running: ${BOLD}ini${RESET}"
else
    echo -e "\n${RED}Installation failed.${RESET}"
    exit 1
fi
