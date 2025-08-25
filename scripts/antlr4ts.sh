#!/bin/bash
JAVA_HOME="$(pwd)/.tools/java/jdk-21.0.1.jdk/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"
npx antlr4ts "$@"