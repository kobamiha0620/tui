#nodeバージョン
12.13.1

#gulp設定方法
https://www.asobou.co.jp/blog/web/sass-gulp

#gulpタスクコマンド（gulpfile.js,src,htdocsなどと同階層へcd移動し実行）
gulp
-ランニング
ブラウザシンクが自動で起動し、ファイル監視をスタートします。
ejs,scss,js,imagesの変更を拾い、htdocsへ自動出力。

gulp destAll
-全静的ファイル書き出し

#最終編集履歴
2022年3月31日にいただいたchatworkコメント
各商品ページに一文追加します。
＜定期2回分の合計金額を掲載する＞
CSSは触りません。ご連絡まで。
こちらを手元で同期した状態。

#init変数について
src直下の.ejsファイル群は主要ページhtmlと対応しています。
主要ページ冒頭には
<%
// 以下の設定値を記入のこと
var pageinit = {
  title : '' ,
〜〜〜
};
%>
のように、変数設定項目があります。以下各変数の説明となります。
~
title	本件では未使用
keywords	本件では未使用
description	本件では未使用
ogurl	本件では未使用
ogimage	本件では未使用
path	本件では未使用
shopify	"ローカル確認時は空白にする。
shopify : 'true',
で本番用にファイルパスが切り替わったhtmlを出力。
htdocs配下に出力されたhtmlはそのままshopifyの対応liquidへペースト可"
category	"記述例（配列）
category : ['home'] ,
wrapperに固有クラスを付与"
pagename	本件では未使用
css	"外部CDNcssなどの読み込みに使用。配列で記述。
本件では現在未使用。"
js	"外部CDNjsなどの読み込みに使用。配列で記述。
本件では現在未使用。"
jsfunc	"master.js内のファンクション呼び出しに使用。
配列で記述。
記述例
jsfunc:['setPhotoChanger ();','setBuyBtn();','setVideo();']"

#画像タグの記述方法
本件ではshopify本番環境とローカルでディレクトリ構造に大きな違いがあるため、ejsの条件分岐でパス切り替えを行なっています。

<% var imgInfo = {path:'kv_img_01',type:'jpg',alt:'tui'};%>
<% if(pageinit.shopify!=='true'){%>
  <%- include(pageinit.path + 'assets/module/_img-temp_09.ejs', {imgInfo:imgInfo});%>
<% } else {%>
  <%- include(pageinit.path + 'assets/module/_img-temp_15.ejs', {imgInfo:imgInfo});%>
<% }%>

前述のinit変数、「shopify」が「true」じゃないとき（ちょっと色々あって分岐言い回しが変になったまま進みました。すみません。。）
_img-temp_09.ejsを呼び出して指定した引数で画像名、altなどを指定
それ以外（shopifyがtrue、本番環境に上げるときは）
_img-temp_15.ejsを呼び出す

<% if(pageinit.shopify!=='true'){%>
shopify変数によるローカル、本番での要素切り替え分岐は画像以外でも利用しているのでご査収くださいませ。

#css
scssを利用。
編集検出でhtdocs/assets/css/main.cssを出力

#js
jQuery 3.3.1ベース
assets/js配下
関数記述はmain.js
編集が検出されると配下全ファイルが結合されてmaster.jsとしてhtdocsへ自動書き出し
