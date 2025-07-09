#!/bin/bash
set -e

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Setting permissions..."
chmod +x node_modules/.bin/react-scripts

echo "Building the application..."
npx react-scripts build

echo "Build completed successfully!" 