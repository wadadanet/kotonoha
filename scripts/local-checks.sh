#!/bin/sh
# Required local validation. No automatic dependency installation.
run_check 'node --check app.js'
run_check 'node --check books.js'
