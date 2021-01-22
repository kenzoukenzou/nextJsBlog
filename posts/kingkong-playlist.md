---
title: 「キングコングプレイリスト」というサービスを作りました。
date: "2020-12-11"
---

半年前から、**[キングコングプレイリスト](https://playlist-2bf49.web.app/)** というサービスを作り始めました。
ここでは開発した背景や、使用技術などについてまとめます。

## 背景
僕は「[毎週キングコング](https://www.youtube.com/user/mainichikingkong)」という雑談チャンネルを観るのが好きで、おじさん芸人2人が喋るのをみることが週末の娯楽だったりします。  
ただこのチャンネルは「ただ雑談するだけ」という性質上、話があっちこっち行きます。他のYoutuberさんみたく、1動画に1つのテーマというわけではないんですね。  
つまり **「あの話面白かったからまた観たいけれど、どの動画だったっけな...」と探すのが難しい** わけです。

「**動画の中で面白かったくだりをタイムスタンプで保存して、それを後でまとめて見返せるサービスがあれば良いな**」と思ったので、キングコングプレイリストを作りました。

## 何ができるか
個人の娯楽&開発学習のため作成したサービスなので、現時点では一般ユーザーの新規登録導線はありません。僕だけがタイムスタンプ・プレイリストを登録できます。

まず動画に対して、タイムスタンプを保存することができます。タイムスタンプは押すと、その秒数から動画がスタートします。
![スクリーンショット 2020-12-11 14 40 50](https://user-images.githubusercontent.com/33926355/101867659-0abec980-3bbf-11eb-89ea-b6ce4236f639.png)

各タイムスタンプはプレイリストに保存されるので、あとでプレイリストを見返すこともできます。例えば、「[梶原のボケシリーズ](https://playlist-2bf49.web.app/playlists/2)」では動画内で梶原さんがボケた箇所だけまとまっていて、タイムスタンプを押すとその動画のその秒数から動画が再生されます。
![スクリーンショット 2020-12-11 14 43 52](https://user-images.githubusercontent.com/33926355/101867817-68ebac80-3bbf-11eb-93b0-52edfc5f049e.png)

- [サービスURL](https://playlist-2bf49.web.app)
- [ソースコード](https://github.com/kenzoukenzou/kingkong_playlist)

## 使用した技術

普段使い慣れているRailsを使いつつ、フロントエンドはVue.jsを採用しました。
以下が使用技術の詳細です。

- バックエンド：
  - Ruby on Rails(APIモード)
  - Postgresql
  - Heroku
  - Youtube Data API
- フロントエンド：
  - Vue.js
  - Vuetify
  - Firebase

初期データとしての動画50件は、[Youtube Data API](https://developers.google.com/youtube/v3)をバッチ処理で叩いて、DBに動画のIDを格納しました。後述するライブラリのプロパティに動画のIDを渡すことで、詳細ページの動画埋め込みを表示しています。  
また、毎週キングコングは「毎週日曜日の夜22時に動画がアップロードされる」という規則性があるため、APIを定時に叩いて最新の動画1件を取得してくるようにしています。

バッチ処理は、`app/oneshot`下に入れています。  
[app/oneshot](https://github.com/kenzoukenzou/kingkong_playlist/tree/master/backend/app/oneshot)

動画の再生周りは、[vue-youtube](https://github.com/anteriovieira/vue-youtube)というライブラリを使用しています。  
このライブラリを使うと、動画の一時停止/再生などの制御を行いやすかったため採用しました。

フロントエンドのスタイリングには、[Vuetify](https://vuetifyjs.com/)を採用しました。  
リッチな見た目を実現しつつ、画像の遅延ロード・検索のサジェスト・スケルトンなども提供されていて、非常に便利で助かっています。

Railsは業務で使い慣れてはいるものの、普段はモノリシックなアプリケーション開発がメインで、APIモードでゴリゴリ書くのは初めてで色々分からないところも出てきました。APIの設計については、本などを読んで詳しく勉強したいと考えています。

このサービスは個人で使用することが目的だったので、開発速度・表示速度をトッププライオリティとしてSPAにしました。
ただ後述しますが、SEO対策ももう少しやれば良かったと後悔しています。

## 既知の課題

以下の点については、今後対応していく予定です。

**SEO対策ができていない**  
SEO対策はゼロで、ソーシャルでも宣伝していないのですが、さすがにサイト名「キングコングプレイリスト」で検索したときにヒットしないのはまずいと思い始めました。
SPAにおけるSEO対策は全く知見がないため、キャッチアップしながらできる手を打っていこうかなと。

**一般ユーザーにも機能を開放するため、新規登録機能を作る**  
毎週キングコングは30万人以上登録者がいて、時々「急上昇」にもあがったりするので、このサービスを求めている人はもしかしたら僕以外にもいるかもしれません。  
ただ、現時点では僕以外のユーザーがプレイリストやタイムスタンプを登録できないようにしているので、そこを整備していきたいと考えています。