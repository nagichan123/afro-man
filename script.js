$(document).ready(function() {
    // Arctext.jsを適用
    $('.arched-title').lettering();
    $('.arched-title').arctext({ radius: 400 }); // アーチの半径を設定

    // 既存の他のスクリプト
    const penalties = [];
    const penaltyOptions = document.querySelectorAll('.penalty-option');
    const startGameBtn = document.getElementById('startGameBtn');
    const gameImage = document.getElementById('gameImage');
    const message = document.getElementById('message');
    const retryBtn = document.getElementById('retryBtn');
    const backBtn = document.getElementById('backBtn');

    // ペナルティを選択
    penaltyOptions.forEach(option => {
        option.addEventListener('click', function() {
            if (option.classList.contains('selected')) {
                option.classList.remove('selected');
                const index = penalties.indexOf(option.textContent);
                if (index > -1) {
                    penalties.splice(index, 1);
                }
            } else {
                option.classList.add('selected');
                penalties.push(option.textContent);
            }
        });
    });

    // ゲーム開始
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function() {
            if (penalties.length === 0) {
                alert('少なくとも1つの罰ゲームを選んでください。');
                return;
            }
            sessionStorage.setItem('penalties', JSON.stringify(penalties));
            window.location.href = 'game.html';
        });
    }

    // ゲームロジック
    if (gameImage) {
        const images = [
            'image1.png',
            'image2.png',
            'image3.png',
            'image4.png',
            'image5.png',
            'image6.png',
            'image7.png',
            'lose.png' // 負け画像
        ];

        gameImage.addEventListener('click', function() {
            const randomIndex = Math.floor(Math.random() * images.length);
            const selectedImage = images[randomIndex];
            gameImage.src = selectedImage;

            if (selectedImage === 'lose.png') {
                const penalties = JSON.parse(sessionStorage.getItem('penalties')) || ['ウイスキー'];
                const randomPenaltyIndex = Math.floor(Math.random() * penalties.length);
                message.innerHTML = '<span class="out">OUT!!!</span><br>' + penalties[randomPenaltyIndex];
                message.classList.remove('safe');
                void message.offsetWidth; // リフローを強制してアニメーションをリセット
                message.classList.add('out');
                gameImage.style.pointerEvents = 'none';
                retryBtn.style.display = 'inline-block';
                backBtn.style.display = 'inline-block';
            } else {
                message.innerHTML = 'SAFE';
                message.classList.remove('out');
                void message.offsetWidth; // リフローを強制してアニメーションをリセット
                message.classList.add('safe');
            }

            // 一定時間後にメッセージをフェードアウトさせる
            setTimeout(() => {
                message.style.opacity = '0';
            }, 1500);
        });
    }

    // リトライ
    if (retryBtn) {
        retryBtn.addEventListener('click', function() {
            location.reload();
        });
    }

    // 罰ゲーム選択画面に戻る
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});
