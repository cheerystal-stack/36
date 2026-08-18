36 | LENORMAND — PWA追加パック

GitHubの36リポジトリ直下に追加:
- manifest.json
- sw.js
- icon-180.png
- icon-192.png
- icon-512.png

その後、index-additions.txt の内容を index.html に追加します。

1) <head> 内に:
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="36">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="manifest" href="manifest.json">

2) </body> の直前に:
<script>
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}
</script>

GitHub Pages反映後、Safariで36を開いて「ホーム画面に追加」。
古い「3」アイコンが残る場合はいったん古いホーム画面アイコンを削除して追加し直してください。
