#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoehub-120781-c36278e4/tic_tac_toe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

