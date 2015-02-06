#!/bin/bash
# run-on-apache-felix.sh
PAX_CONSTRUCT_VERSION=1.4
PAX_PLUGIN=org.ops4j:maven-pax-plugin:$PAX_CONSTRUCT_VERSION
FRAMEWORK=felix

mvn $PAX_PLUGIN:provision -Dframework=$FRAMEWORK
