@echo off

start cmd.exe /K "cd server && npm run dev"

start cmd.exe /K "cd web_client && npm run dev"