# 背景

当文書はHTML / CSS / JavaScriptのフォーマッティングとスタイルに関するルールを定義する。ルールはHTMLおよびCSS（scss/ sass）・JavaScriptで記述された直接実行可能なファイルに適用されるものである。ツールの使用については、別途開発環境ルールを遵守するものとする。


# 全般

## プロトコル

埋込みリソースに対してはHTTPSを使用する。

```html
<!-- 非推奨 -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

<!-- 非推奨 -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

<!-- 推奨 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
```


## 全般的なフォーマッティング・ルール

### 字下げ

字下げは1回で2個の空白とする。  
タブ及びタブと空白の併用は禁止とする。

```html
<ul>
  <li>Fantastic
  <li>Great
</ul>
```

```css
.example {
  color: blue;
}
```

```JavaScript
function example() {
  return true;
}
```

※ .editorconfigにて指定あり


### 大文字表記

小文字のみを使用すること。
全てのコードは小文字で記述すること。当ルールは、HTML要素名、属性、属性値(text/CDATAを除く)、CSSセレクター、プロパティー、プロパティー値(文字列を除く)に適用される。  
CSSセレクター、ID名称については命名規則が適用される。


### エンコーディング

UTF-8を使用

```html
<meta charset = "utf-8">
```
※ .editorconfigにて指定あり

# HTML

## DOCTYPE

HTML5を使用
XHTML構文は不使用


## metaルール

header内のmetaについての定義。

### title

"ページ内容を表す20文字程度" ＋"｜Alfa Romeo（アルファ ロメオ）"

```HTML
<title>心を奪う魔力がある Alfa Romeo GIULIA（ジュリア）｜Alfa Romeo（アルファ ロメオ）</title>
```

ejsでは、titleの変数で設定する。


### description

ページ内容を表す120文字程度とする。  
ejsでは、descriptionの変数で設定する。

### OGP（SNS）

OGP画像サイズは 1200px（横） x 630px（縦） 、
画像フォーマットはPNGとする。  
画像はページ内容にあわせたものとする。  
該当する画像がない場合はサイト全体で決定した画像とする。

|  名称  |  ejs変数  |  設定内容  |  備考  |
|  ------  |  ------  |  ------  |  ------  |
|  og:title  |  ogtitle  |  ページのタイトル  | titleと同じ  |
|  og:type  |  ogtype  |  ページの種類  |   固定  |
|  og:url  |  ogurl  |  ページのURL  |
|  og:image  |  ogimage  |  画像のURL  | 指定がない場合はサイト共通  |
|  og:site_name  |  n/a  |  Alfa Romeo（アルファ ロメオ）  |  固定  |
|  og:description  |  ogdescription  |  ページディスクリプション  | 指定がない場合はdescriptionと同じ |
|  fb:app_id  |  n/a  |  facebookのappID  |   固定  |


### twitter設定

twitterカード設定として以下を定義する。  
基本的に変更しない。

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@ユーザー名">
```


### viewport

下記固定とする。

```HTML
<meta name="viewport" content="width=device-width,initial-scale=1">
```

### robots

デフォルトで許可のため、設定しない。


### IE対応

互換表示についてはIE11で非推奨のため設定しない。


---

## linkルール

### ページ個別のcss読み込み
ejs変数 css（配列）で指定する。配列順に記載する。  
<head>内に記載される。


## ページ個別のJavaScriptの読み込み
ejs変数 js（配列）で指定する。配列順に記載する。  
</body>前に記載される。


### icon

サイト全体共通で以下の設定とする。  
詳細についてはデザインガイドラインにて定義。

**favicon**
```HTML
<link rel="icon" href="/common/icon/favicon.ico">
```

**ios**
```html
<link rel="apple-touch-icon" sizes="180x180" href="/common/icon/apple-touch-icon.png">
```


**windows タイル**
```HTML
<meta name="application-name" content="{サイト名}">
<meta name="msapplication-square70x70logo" content="/common/icon/small.jpg">
<meta name="msapplication-square150x150logo" content="/common/icon/medium.jpg">
<meta name="msapplication-wide310x150logo" content="/common/icon/wide.jpg">
<meta name="msapplication-square310x310logo" content="/common/icon/large.jpg">
<meta name="msapplication-TileColor" content="#FAA500">
```



### URL正規化

同一内容ページが存在する場合のみ、canonicalにて設定する。  
記載の場合は絶対パスで記述する。

```html
<link rel=”canonical” href=”http://www.example.com/a/”>
```



### 分割ページタグ prev,next

複数ページに渡るコンテンツの場合、rel=”prev” rel=”next”の使用を推奨する。  
※ Googleサポート終了のため設定推奨とする

```html
<link rel="prev" href="https://example.com/blog/page/1/">
<link rel="next" href="https://example.com/blog/page/3/">
```

### type属性

スタイルシートとスクリプトのtype属性を省略する。

```html
<link rel="stylesheet" href="https://www.google.com/css/maia.css">
<script src="https://www.google.com/js/gweb/analytics/autotrack.js"></script>
```
---

## HTMLの妥当性

W3CHTMLバリデータなどのツールを使用すること。


### 代替コンテンツ

画像・canvasに対するalt属性の使用を必須とする。  
装飾などの言語的意味のない画像は``alt=””``とする。

```html
<img src="spreadsheet.png" alt="Spreadsheet screenshot.">
```

---

## HTMLフォーマット規則

以下フォーマットはソースコードについての記述である。
可読性を上げるための共通規則とする。


### 一般的なフォーマット

すべてのブロック、リスト、またはテーブル要素に新しい行を使用し、すべての子要素をインデントすること。


### HTMLの引用符

属性値を引用符で囲むときは、ダブル・クォートを使用すること。
シングル・クォートは使用禁止。

```html
<a class="maia-button maia-button-secondary">Sign in</a>
```


### Class・IDの命名規則

CSSスタイルガイドに記載。


### 文字参照の禁止

HTMLで特別な意味を持つ文字以外の文字参照は禁止する。
``&mdash; &rdquo; &#x263a;`` など
例外：``< & > “``

エンコーディングUTF-8のルール下では参照の必要がない。

## 画像

画像の圧縮は自動化するため、設定値以上の書き出しを推奨する。
画像のフォーマットは以下の適したフォーマットを使用する。

**JPEGフォーマット**  
商品写真・風景写真・人物写真など、色数の多いもの。グラデーションなども。

**PNGフォーマット**  
画像文字の入った写真、色数の少ないもの。透過の必要があるもの。

**SVGフォーマット**  
ロゴ・アイコンなど。

### 横長いっぱいなど大きな画像の場合や、SP/PCでの画像出し分け
デスクトップ用にブラウザ横幅いっぱいに表示するような、大きな画像や、SP/PCで出し分ける画像を読み込む場合は、srcsetを使用して読み込み画像の最適化を行う。

``` html
<img srcset=”image/sample-1020w.jpg 1020w,
                      image/sample-1800w.jpg 1800w”
         size=”(max-width: 1020px) 1000px,
                   1800px”
         src=”image/sample.jpg” alt=”横長の大きい画像”>
```
ウインドウサイズ変更時には対応していないため、``<div></div>``とCSSのメディアクエリでの背景画像の手法と適宜使い分けること。  
メンテナンス性を考えると、HTMLで完結した方が良い。

トリミングが大きく異るなど別の画像の場合は、``<picture>``タグを使用する。

``` html
<picture>
  <source media="(max-width: 475px)" srcset="elva-375w-close-portrait.jpg">
  <source media="(min-width: 800px)" srcset="elva-800w.jpg">
  <img src="elva-800w.jpg" alt="beautifull picture">
</picture>
```
IE11非対応のため、picturefillプラグインを使用する。 https://github.com/scottjehl/picturefill



### 遅延読み込みの設定
ページ読み込み高速化のため、ファーストビュー以外の画像を遅延読み込みする。  
以下の記述をする。


``` html
<img src="unicorn.jpg" loading="lazy" alt="unicorn">
<img src="cats.jpg" loading="lazy" alt="cats">
<img src="dogs.jpg" loading="lazy" alt="dogs">
```
※ loading未対応ブラウザへの対応はしない。


### ejs 変数一覧
変数名一覧 以下、すべてpageinit内

| 名前 | 内容 | 必須 |
| --- | --- | --- |
| title | ページタイトル、og:titleで使用 | 必須 |
| description | meta descriptionで使用 og:descriptionに指定がない場合はこれを使用 | |
| ogurl | og:urlで使用 ページのURLを記載のこと | 必須 |
| ogimage | og:imageで使用 画像のURLを記載のこと 未設定でサイト共通の画像を使用 | |
| ogdescription | og:descriptionで使用 未設定でdescriptionを使用 | |
| path | サイトトップページへのパスを記載 例： '../../' | 必須 |
| category | サイト上ディレクトリの名称 classとして記載 | 必須 |
| pagename | ファイル名 index など | 必須 |
| css | ページ個別で読み込むcssを配列で指定 ページから相対パスで記載 | |
| js | ページ個別で読み込むjavascriptを配列で指定 ページから相対パスで記載 または http://〜 で記載 ||
| headerDark | ヘッダーが黒の場合に true設定、項目を設定したら必須 | 必須 |


# CSS

## CSSの妥当性

W3C CSSバリデーターなどのツールを使用すること。

- ショートハンドでの記述をすること。
- 必要な場合以外は、0の値の後に単位を使用しないこと。
- 値の先頭の「0」を省略すること。
- 可能な限り3文字の16進表記を使用すること。
- ルール間は2つの改行を入れる。
- プロパティと値の間にスペースをひとつ入れる。（正） prop: value; / （誤）prop:value;
- プロパティはアルファベット順で並べる。（推奨）
- インデントはスペース2つ。
- 適切に短い書き方をする。 （正）padding: 15px 0; / （誤）padding: 15px 0px 15px 0px;
- hexやrgb(a)といった書き方よりもhslの書き方が好ましい。明るくするときや暗くするときに実感できる。


``` css
/*サンプル*/
.global-header-nav-item {
  background: hsl(0, 0%, 90%);
  border-radius: 3px;
  display: block;
  float: left;
  padding: 8px 12px;
  transition: background 100ms;
}

```

## ID、Classの命名規則

- アンダースコア ``under_score’’ 禁止
- キャメルケース ‘’camelCase’’ 禁止
- 小文字を使用
- プリフィックス
- - サイト全体で使用できるユーティリティークラス ``.u-``
- - サイト共通のパーツ ヘッダー・フッターなど ``.site-``
- - 階層の名称 ``.directoryname-`` 例：``.about-``（バッティングを極力避けるため）
- - 状態の定義 ``.is-``  例：``.is-open``
- - JavaScriptでのイベントで使用する場合 ``.js-`` （CSSでの記述はしない）
- - mixinの定義 ``.m-``
- 読み取りやすい名称にすること ``/*NG*/ .atr {} .ttl{}`` ``/*OK*/ .author {} .title{}``


### コンポーネント
入れ子ではなくコンポーネント化すること。

``` css
/*入れ子のサンプル*/
.global-header {
  background: hsl(202, 70%, 90%);
  color: hsl(202, 0%, 100%);
  height: 40px;
  padding: 10px;
}

.global-header .logo {
  float: left;
}

.global-header .logo img {
  height: 40px;
  width: 200px;
}
```

``` css
/*コンポーネント化*/
.global-header {
  background: hsl(202, 70%, 90%);
  color: hsl(202, 0%, 100%);
  height: 40px;
  padding: 10px;
}

.global-header-logo {
  float: left;
 }

.global-header-logo-image {
   background: url("logo.png");
   height: 40px;
   width: 200px;
 }

```

``` scss
/*scssでの記述*/
.global {

  &-header {
    background: hsl(202, 70%, 90%);
    color: hsl(202, 0%, 100%);
    height: 40px;
    padding: 10px;

  &-logo {
      float: left;

      &-image {
         background: url("logo.png");
         height: 40px;
         width: 200px;
       }

     }

  }

}

```

## セレクター

要素名をIDやClassと一緒に使用しない。

``` css
/* Not recommended */
ul#example {}
div.error {}

/* Recommended */
#example {}
.error {}
```

### 複数セレクタ
複数セレクタは改行する。
``` css
/* Not recommended */
.a:focus, .a:active {
  position: relative; top: 1px;
}

/* Recommended */
.a,
.b,
.c {
  font-weight: normal;
  line-height: 1.2;
}
```

## 引用符
属性セレクタとプロパティ値には、二重引用符（""）ではなく一重引用符（''）を使用すること。
URI値（url()）に引用符を使用しないこと。  
例外：@charsetルールを使用する必要がある場合は、二重引用符を使用すること。一重引用符は禁止。
``` css
/* Not recommended */
@import url("https://www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}

/* Recommended */
@import url(https://www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}
```

## mixin, 変数
commonで定義したmixin、変数の使用。  
※TODO 定義はコーディング時に。  
commonファイルを参照。

## コメント
可能であれば、コメントでセクションをまとめる。

``` css
/* Header */

.adw-header {}

/* Footer */

.adw-footer {}

/* Gallery */

.adw-gallery {}
```

## ベンダープリフィックス

postcss autoprefixer使用により、ソースコードでの記載は不要。  
対象ブラウザはデフォルト。


## ファイル構造
ページで読み込むcssファイルは、共通のcssファイル1つ、ディレクトリ（カテゴリ）で共通のcssファイル1つとする。  
ページ内のスタイルは、ディレクトリ共通のcssに記述する。  
※ファイルをマージして、読み込みのスピードを上げることよりも、メンテナンス性を重視する。


# JavaScript

セミスタンダードのスタイルを基準とすること。  
https://github.com/standard/semistandard  
エディターでのプラグインや自動整形の使用を推奨。

JavaScriptのバージョンはES5とする。

## ライブラリ
全体として共通で使用するライブラリは以下とする。下記以外のライブラリが必要な場合はディレクトリ内で完結すること。CDNは将来的にブラウザが無効とする可能性が高いためサーバ内にファイルを取得すること。

|  名称  |  URL  |  備考  | ライセンス |
|  ------  |  ------  |  ------  | ------ |
|  jQuery 3.4.1  |  https://jquery.com/  |  v3.4.1を使用  | MIT |
| Modaal 0.4.4 | http://humaan.com/modaal/ | モーダル表示に使用する 使用ルールは別途記載  | MIT |
|  slick | https://kenwheeler.github.io/slick/ | カルーセルに使用する 使用ルールは別途記載  | MIT |
| ScrollHint | https://appleple.github.io/scroll-hint/ | テーブルのスクロール（主にスマートフォン）で使用する 使用ルールは別途記載  | MIT |
| picturefill-master 3.0.2 | https://github.com/scottjehl/picturefill | IE11で<picture>を使用するため | MIT |
|  masonry  | https://masonry.desandro.com/ | ギャラリーで使用 | MIT |


### 使用限定ライブラリ
|  名称  |  URL  |  備考  | ライセンス |
|  ------  |  ------  |  ------  | ------ |
|  GoogleMaps API v3  |  https://developers.google.com/maps/documentation/javascript/tutorial?hl=ja  |  ディーラー検索で使用  | 有償 |


# 検証環境
Win IE11, Chrome, Firefox  
Mac Safari, Chrome, Firefox  
iOS 12以上  Safari  
Android 8以上 Chrome  
バージョンのないブラウザは最新版とする。



# 例外処理 旧WEBサイトからの移行
リニューアル予定だが、暫定的な処置として旧サイトのHTMLをそのまま使用するページで、単独で切り離せるものについては、以下の手法とする。
切り離せない（ベースのcssを使用してる）ものについては、CSS/JSを新規に作成する。

- 旧common系のjs/cssは、ローカルに移動してディレクトリ配下で使用すること
- 必要に応じてjQueryMigrateを使用すること https://github.com/jquery/jquery-migrate CDNでも可
- ディレクトリ配下のディレクトリはそのまま移動する
- 使用しないファイルは削除すること
- ヘッダー・フッターに影響するCSSを削除すること
- js/phpのスクリプトはそのまま移行すること（責任分界点を明確にする）
- 移行前の段階でバグ・エラーがある場合はレビュー時にその旨・内容を共有すること


---

作成日：2020年2月21日
作成者：太田吉毅
変更日：2020年4月4日
変更者：太田吉毅
