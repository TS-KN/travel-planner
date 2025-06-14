# AI旅行プランナー

AIを活用した旅行計画アシスタント。目的地、日程、予算などを入力するだけで、最適な旅行プランを自動生成します。

## 機能

- 🎯 カスタマイズ可能な旅行プラン生成
- 📅 日別の詳細なスケジュール
- 🍽️ おすすめの観光スポットとグルメ情報
- 💰 予算の内訳と合計金額

## 技術スタック

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- OpenAI API (GPT-4)

## 始め方

1. リポジトリをクローン
```bash
git clone https://github.com/yourusername/travel-planner.git
cd travel-planner
```

2. 依存関係のインストール
```bash
npm install
```

3. 環境変数の設定
`.env.local`ファイルを作成し、以下の内容を追加：
```
OPENAI_API_KEY=your-api-key-here
```

4. 開発サーバーの起動
```bash
npm run dev
```

5. ブラウザで http://localhost:3000 にアクセス

## 使い方

1. トップページで以下の情報を入力：
   - 目的地
   - 出発日
   - 帰着日
   - 人数
   - 交通手段
   - 予算
   - 希望・好み（任意）

2. 「プランを作成」ボタンをクリック

3. 生成された旅行プランを確認

## ライセンス

MIT
