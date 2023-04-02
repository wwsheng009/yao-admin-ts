
pnpm run yao:build-fix

rm -rf /data/projects/yao/demos-v1.0/yao-admin/studio/*
cp -rf dist_esm/app/studio/* /data/projects/yao/demos-v1.0/yao-admin/studio/

if [ -d "dist_esm/app/scripts/ddic" ]; then
 cp -rf dist_esm/app/scripts/ddic /data/projects/yao/demos-v1.0/yao-admin/scripts/
fi