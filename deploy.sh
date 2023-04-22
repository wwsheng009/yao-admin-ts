#!/bin/bash

pnpm run yao:build-fix

source .env

target="${YAO_APP_ROOT}"

echo "目标目录：${target}"

rm -rf ${target}/studio/*
cp -rf dist_esm/app/studio/* ${target}/studio/

mkdir -p ${target}/scripts/ddic
mkdir -p ${target}/scripts/file

if [ -d "dist_esm/app/scripts/ddic" ]; then
 cp -rf dist_esm/app/scripts/ddic/* ${target}/scripts/ddic/
 cp -rf dist_esm/app/scripts/file/* ${target}/scripts/file/
fi