rem echo Hello, "%1"!\

rem set "port=%~1"
rem if "!port!"=="" ( echo it is empty )
rem IF [%1] == [] GOTO MyLabel
vite serve ./src/vfg-repeatable-field --port 3001 --open