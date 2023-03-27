
pnpm run yao:build-fix

rm -rf /data/projects/yao/demos-v1.0/yao-admin/studio/*
cp -rf dist_esm/app/studio/*.js /data/projects/yao/demos-v1.0/yao-admin/studio/