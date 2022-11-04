# Earthquake_mapmaker

## tl;dr
地震の震度分布図を描画するやつ

## どういうやつ？
↓こういうやつ↓
![例のSVG](https://github.com/akikaki-bot/Earthquake_mapmaker/blob/main/svg/japan.svg)

### しくみ
```
p2pquake JSONAPI v2 => あーだこーだ => 描画
```

## 使用モジュール等
```
d3.js - メイン描画モジュール
JSDOM - DOM仮想環境構築
request - JSON読み込み
fs - svg書き込み
path - path指定
```

## How To Use
Cloneして、おわりっ！

※かなりのスパゲッティーコードなので使用時はすこしだけ改良してみるといいです

## Licence
MITだよ。みんな使ってみてね。
