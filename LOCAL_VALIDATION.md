# ローカル検証とデプロイ

各cloneで `sh scripts/install-hooks.sh` を明示的に実行します（Git Bash / POSIX shell とGit）。
最終コミット後、ignored成果物以外の変更がない状態で `sh scripts/validate-local.sh` を実行するか、通常どおりpushしてください。
push hookはpush対象SHAとHEADの一致、追跡変更・未追跡sourceの有無を確認し、毎回すべての検査を実行します。
検査中にsourceやHEADが変わった場合も失敗します。branch/tagの削除だけは検査対象外です。
旧receiptを使って検査を省略しません。

## 必須コマンド

- `git show --format= --check HEAD`
- `node --check app.js`
- `node --check books.js`

GitHub Pages公開履歴とhomepageがあります。既存の自動機能テストはありません。Node.jsで既存JavaScriptの構文を検査します。

依存・SDK・端末・エミュレーター・ブラウザー等の導入や起動は明示的な準備操作です。hookは勝手に導入しません。
不足・失敗は検査成功にせず、PRに未実行範囲と理由を残してください。

## PRの証跡

完全SHA、実行したコマンドと結果、OS/runtime/SDK、手動確認、未実行・対象外の理由をPRへ記載します。
成功receiptはGit管理領域の `local-validation/<SHA>.md` にあり、その内容をPRへ転記できます。
GitHub Actionsはデプロイと配布成果物の生成・配備条件確認に限定し、テスト/lint/型/静的解析を再実行しません。
既存の検査がある場合は下表とlocal-checks.shで引き継ぎます。

今回hookを有効化するのは隔離作業cloneのみです。元のcheckoutには未反映です。
PRによる変更はmerge後、各cloneでinstallerを実行してください。
