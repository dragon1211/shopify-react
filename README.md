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

## theme development

- テーマファイルを編集し、作成した React アプリを読み込むようにする必要がある。
- `theme`ディレクトリでテーマファイルを管理する。

### theme.css を読み込みたくない場合

- `theme.css`を読み込んでしまうとレイアウトが崩れる画面の場合、`theme.liquid`の冒頭で`delta`変数が true になるように指定する。

### script タグを埋め込む

- 環境によって読み込む script を切り替えたいので、`theme.name`を src に埋め込むようにする。

```liquid
<div id="app"></div>
<script src="{%- include 'app-script-base-url' -%}/pages/top/index.js"></script>
```

- `snippets/app-script-base-url.liquid` で、theme 名と読み込む先の URL を切り替えている。
- theme 名が「dev」「stg」「prod」のいずれかなら S3 のバケットを、それ以外なら http://localhost:8003 を読み込むようにしている。

### ローカルでの確認

```bash
cd theme
shopify theme serve
```

### テーマのデプロイ

- Shopify CLI のインストールおよびストアへのログインを完了する必要がある。
- なお、CI 機から Shopify CLI でログインする方法は現状無い。

```bash
shopify login
shopify login --store xn-u9jtma9302afe1f.myshopify.com
```

- デプロイ自体は`app/`から行える。

```bash
yarn deploy:stg # Reactアプリのデプロイ
yarn deploy:theme:stg # テーマのデプロイ
```
