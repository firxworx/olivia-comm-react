#!/bin/bash

# deploy to http://bitcurveprojects.com/olivia-react

REMOTE_USER=bcprojects
REMOTE_HOST=server29.hostwhitelabel.com
REMOTE_PORT=24816

# add -vv to command to debug...
SSH_COMMAND="ssh -p$REMOTE_PORT"

LOCAL_PATH="/Users/kfirko/Documents/dev/playground/olivia-communicate/build"
REMOTE_PATH="/home/bcprojects/public_html/olivia-react"

# don't forget to run `yarn build` first; see package.json for `deploy` script
# also see the `homepage` property in package.json

rsync -rcz --checksum --exclude 'tmp' --exclude '.DS_Store' --exclude 'node_modules' --force --delete --progress -e "$SSH_COMMAND" $LOCAL_PATH/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/
