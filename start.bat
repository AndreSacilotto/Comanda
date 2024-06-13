@echo off

start cmd.exe /K "cd server && npm run build && npm run start"

start cmd.exe /K "cd web_client && npm run dev"