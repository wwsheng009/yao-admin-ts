
pnpm run yao:build-fix

target=/data/projects/yao/demos-v1.0/yao-admin
target=/tmp/yao-admin


rm -rf ${target}/studio/*
cp -rf dist_esm/app/studio/* ${target}/studio/

if [ -d "dist_esm/app/scripts/ddic" ]; then
 cp -rf dist_esm/app/scripts/ddic/* ${target}/scripts/ddic/
fi