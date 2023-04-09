# 使用 ts 开发 Yao-admin

适用于 `Yao 0.10.3`的 Yao-admin,使用 TS 开发

环境配置参考：https://github.com/wwsheng009/yao-app-ts-template

安装

```sh
git clone https://github.com/wwsheng009/yao-admin-ts
cd yao-admin-ts
pnpm i
```

构建

```sh
pnpm run yao:build-fix
```

调试

```sh
pnpm run debug
```

布署

```sh
./deploy.sh
```

命令

```sh
git clone https://github.com/wwsheng009/yao-admin my-admin --depth 1

# 配置数据库连接
yao start

# 创建所有的ddic数据表
yao migrate

```

```sh

# 先从数据库中创建模型
yao studio run model.cmd.CreateModelsFromDB

# 进行模型调整

# 根据模型生成界面定义
yao studio run model.model.CreateFromFile


# 加载模型数据
yao studio run ddic.loader.LoadModelFromFile

# 创建关联关系的list定义
yao studio run model.model.CreateList ddic.model.relation

yao start
```
