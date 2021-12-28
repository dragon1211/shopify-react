# intro

### development environment

- esbuild でバンドルしたスクリプトを liquid テンプレートから呼び出して使いたい。
- ローカルで開発する場合、以下のようなアーキテクチャでローカルのソースを確認できる。
  - ローカル DNS 経由で mamakyu-liquid-front-dev-hosting-bucket.s3.ap-northeast-1.amazonaws.com を localhost で解決する。
  - リモートの shopify ストアを表示する。
  - liquid 内に記述された`<script src="https://mamakyu-liquid-front-dev-hosting-bucket.s3.ap-northeast-1.amazonaws.com/...">` がローカル DNS で`<script src="https://localhost/...">`に読み替えられる。
  - docker で立ち上げておいた nginx 経由で、ビルド済みの js ファイルが localhost:443 から配信される。
  - 結果、ローカルのソースがリモートの shopify ストアの liquid 上で確認できる。

#### 手順

- `docker-compose up -d` で nginx を起動
- `hosts`に以下を追加（`hosts`の編集方法は各自の OS に依存するので自分でググってください。）

```diff
+ 127.0.0.1 mamakyu-liquid-front-dev-hosting-bucket.s3.ap-northeast-1.amazonaws.com
```

- `yarn watch`で esbuild を watch モードで実行
- （一度だけ） https://mamakyu-liquid-front-dev-hosting-bucket.s3.ap-northeast-1.amazonaws.com/pages/top/index.js にアクセスし、ブラウザの https のエラーを解除しておく
- 普通に shopify のショップにアクセス

### survey feature

the spreadsheets
https://docs.google.com/spreadsheets/d/1pIhKWez1GWfUr0e_k3EexPW06BVEaYaBHbQLyO_SUmY/edit#gid=0
