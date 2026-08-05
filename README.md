# 星野小花主站

`xingyexiaohua.xyz` 的入口站，使用 Hugo 构建。

## 本地预览

```powershell
hugo server --disableFastRender
```

## 新增分站

在 `data/sites.toml` 新增一个 `[[sites]]` 条目。设置 `disabled = true` 的条目会展示为筹备中，且不可点击。

## Cloudflare Pages

- Framework preset: Hugo
- Build command: `hugo --minify`
- Build output directory: `public`
- Root directory: `main-site`
- Production domains: `xingyexiaohua.xyz` 与 `www.xingyexiaohua.xyz`

在 Cloudflare DNS 中，将 `www.xingyexiaohua.xyz` 配置为跳转至 `https://xingyexiaohua.xyz`。博客保留在 `blog.xingyexiaohua.xyz`。
