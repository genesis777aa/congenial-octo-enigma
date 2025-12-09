#!/bin/bash

# Self-governing Pascal compiler
while true; do
  echo "Compiling Pascal..."
  fpc @config.cfg
  sleep 60  # Auto-recompile every 60s
done
