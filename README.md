# ことのは

日本語から、少しずつ英語へ。青空文庫の短編をレベル0〜10で読む、静的な読書アプリです。

サイト制作：[wada](https://coffee-break-designs.com/)

## できること

- レベル0：日本語の原文のみ
- レベル1〜5：単語や短い表現を英語に置き換え
- レベル6〜9：英文のまとまりを段階的に追加
- レベル10：全文英語
- 英語を選ぶと原文を表示。対応ブラウザでは英語の読み上げも利用可能
- 原文との比較、文字サイズ変更、ページ送り
- 読書位置と設定をブラウザのlocalStorageに保存（端末間同期はありません）

## 収録作品・出典

青空文庫の名作短編13作品の全文を収録しています。

- [飴だま](https://www.aozora.gr.jp/cards/000121/files/4723_13209.html)（新美 南吉）
- [去年の木](https://www.aozora.gr.jp/cards/000121/files/4719_13221.html)（新美 南吉）
- [赤い蝋燭](https://www.aozora.gr.jp/cards/000121/files/627_13466.html)（新美 南吉）
- [手袋を買いに](https://www.aozora.gr.jp/cards/000121/files/637_13341.html)（新美 南吉）
- [でんでんむしのかなしみ](https://www.aozora.gr.jp/cards/000121/files/43403_16820.html)（新美 南吉）
- [やまなし](https://www.aozora.gr.jp/cards/000081/files/46605_31178.html)（宮沢 賢治）
- [ざしき童子のはなし](https://www.aozora.gr.jp/cards/000081/files/2656_30647.html)（宮沢 賢治）
- [蜘蛛の糸](https://www.aozora.gr.jp/cards/000879/files/92_14545.html)（芥川 龍之介）
- [蜜柑](https://www.aozora.gr.jp/cards/000879/files/24453_47037.html)（芥川 龍之介）
- [野ばら](https://www.aozora.gr.jp/cards/001475/files/51034_47932.html)（小川 未明）
- [月夜と眼鏡](https://www.aozora.gr.jp/cards/001475/files/51089_53359.html)（小川 未明）
- [きのこ会議](https://www.aozora.gr.jp/cards/000096/files/46694_27682.html)（夢野 久作）
- [待つ](https://www.aozora.gr.jp/cards/000035/files/2317_13904.html)（太宰 治）

日本で著作権の保護期間が満了した原作を、青空文庫の収録ファイルから利用しています。入力・校正・制作は青空文庫のボランティアの皆さんによるものです。底本・入力者・校正者等の情報は各作品の「出典・翻訳について」から確認できます。ルビを省略し、改行を整理しています。

英訳・日英ミックス文は本アプリ向けにAIで作成した学習用の翻訳・翻案です。専門家による翻訳校閲と学習効果の検証は未実施です。レベルは本棚独自の英語量の目安で、CEFRや資格試験の級とは対応しません。青空文庫の公式サービスではありません。

[青空文庫収録ファイルの取り扱い規準](https://www.aozora.gr.jp/guide/kijyunn.html)

## 開発・公開

HTML / CSS / JavaScriptのみで動作し、ビルドやAPIキーは不要です。ローカルの静的HTTPサーバーでこのフォルダーを配信してください。Google Fontsからフォントを読み込み、利用できない場合は端末のフォントに切り替わります。

- `index.html`：画面
- `styles.css`：スタイルとレスポンシブ表示
- `app.js`：読書状態、レベル切替、原文表示
- `books.js`：原作本文、英訳、単語の対応、出典
- `.nojekyll`：GitHub Pagesで静的ファイルを直接配信

GitHub Pagesの公開元は`main`ブランチのルートです。変更を`main`へpushすると自動的に反映されます。
