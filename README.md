# 📝 Notion × Next.js Blog Template

これは、Notion を CMS として活用し、Next.js で構築されたシンプルで高速なブログテンプレートです。  
ノーコードで記事を管理しつつ、静的サイトとして高速に配信できます。

![screenshot](./screenshot.png)

---

## 🚀 特長

- 🧠 **Notion を使った記事管理**：わかりやすく、直感的に投稿できる
- ⚡️ **超高速な Next.js 構成**：Vercel にもそのままデプロイ OK
- 📱 **レスポンシブ対応**：スマホ・タブレット・PC すべてで最適表示
- 📝 **Markdown 対応**：コードブロックやリストも整形表示
- 🏷️ **タグ機能**：記事の絞り込み・分類が可能

---

## 📂 セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/iwai-kentaro/notion-blog-template.git
cd notion-blog-template

npm install
# または
yarn

touch .env.local

NOTION_API_KEY=your_notion_secret_key
NOTION_DATABASE_ID=your_database_id
```
