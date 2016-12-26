@echo off
title Command Box Log
echo Running...
pushd "%~dp0"
"node_modules/.bin/electron.cmd" ./shell | tee -a shell.log
popd
