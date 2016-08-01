#!/usr/bin/env bash

if uname="Darwin" ; then
  METEOR_DEBUG_SPRINGBOARD=true ~/.meteor/packages/meteor-tool/1.4.0-1-rc.1/mt-os.osx.x86_64/meteor run -p 3333 --settings settings.json
else
  meteor run -p 3333 --settings settings.json
fi
