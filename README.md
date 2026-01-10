# biome-utils-config-monorepo

基于 rslib 配置的 Biome 工具配置 monorepo。

## 项目结构

这是一个 **pnpm monorepo**，包含以下包：

- `packages/biome-config-utils` - Biome 基础配置包
- `packages/utils` - React 工具函数和 hooks
- `projects/rspack_loader` - Rspack loader
- `projects/rspack_plugins` - Rspack plugins

## 安装

```bash
pnpm install
```

## 包说明

### packages/biome-config-utils

Biome 基础配置，提供共享的 Biome 配置。

```bash
pnpm --filter base-biome-config build
pnpm --filter base-biome-config dev
```

### packages/utils

React 工具函数和 hooks，支持 React 18。

```bash
pnpm --filter utils-and-hooks build
pnpm --filter utils-and-hooks dev
pnpm --filter utils-and-hooks test
pnpm --filter utils-and-hooks check
pnpm --filter utils-and-hooks lint
```

### projects/rspack_loader

Rspack loader 项目。

### projects/rspack_plugins

Rspack plugins 项目。

## 许可证

ISC
