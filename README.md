# IT Learning Dashboard

転職・資格学習向けのITスキル進捗ダッシュボードです。ログインやサーバーは使わず、進捗・理解度・メモをブラウザの `localStorage` に保存します。

## ローカル起動

```bash
npm install
npm run dev
```

## 無料デプロイ候補

一番手軽なのは Netlify Drop です。アカウント作成後、以下で生成される `dist` フォルダをブラウザにドラッグ&ドロップすると無料枠で公開できます。

```bash
npm run build
```

継続運用するなら GitHub にリポジトリを置き、GitHub Pages / Netlify / Vercel / Cloudflare Pages の無料枠で連携するのがおすすめです。

- Build command: `npm run build`
- Publish / Output directory: `dist`
- Framework preset: `Vite`

このリポジトリには GitHub Pages 用の `.github/workflows/deploy.yml`、Netlify 用の `netlify.toml`、Vercel 用の `vercel.json` を含めています。

## GitHub Pagesで公開する場合

1. GitHubで空のリポジトリを作る
2. このプロジェクトを `main` ブランチへpushする
3. GitHubのリポジトリ設定で Pages の Source を `GitHub Actions` にする
4. Actions の `Deploy to GitHub Pages` が完了すると公開URLが発行される
