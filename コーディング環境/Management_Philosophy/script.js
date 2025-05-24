// DOMContentLoaded イベントが発生した後にスクリプトを実行
document.addEventListener('DOMContentLoaded', () => {
    // ハンバーガーメニューボタンとナビゲーションメニュー要素を取得
    // HTML側でこれらの要素に適切なIDやクラスを付与する必要があります
    const menuButton = document.getElementById('mobile-menu-button'); // 例: ボタンに 'mobile-menu-button' というIDを付与
    const navMenu = document.getElementById('mobile-nav-menu'); // 例: ナビゲーションメニュー要素に 'mobile-nav-menu' というIDを付与

    // 要素が存在するか確認
    if (menuButton && navMenu) {
        // ボタンにクリックイベントリスナーを追加
        menuButton.addEventListener('click', () => {
            // ナビゲーションメニューの表示/非表示を切り替える
            // Tailwind CSSの 'hidden' クラスをトグルすることで実現
            navMenu.classList.toggle('hidden');
        });
    } else {
        console.error('モバイルメニューボタンまたはナビゲーションメニュー要素が見つかりません。HTMLを確認してください。');
    }
});