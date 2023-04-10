#!/bin/bash

pnpm run yao:build-fix

source .env

target=/data/projects/yao/demos-v1.0/yao-admin

target="${YAO_APP_ROOT}"

echo "目标目录：${target}"

rm -rf ${target}/studio/*
cp -rf dist_esm/app/studio/* ${target}/studio/

if [ -d "dist_esm/app/scripts/ddic" ]; then
  mkdir -p ${target}/ddic
  mkdir -p ${target}/file
 cp -rf dist_esm/app/scripts/ddic/* ${target}/scripts/ddic/
 cp -rf dist_esm/app/scripts/file/* ${target}/scripts/file/
fi