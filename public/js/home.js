(function() {
    // 获取元素
    var listContainer = document.getElementById('compList');
    var bigImage = document.getElementById('compBigImage');
    var bigText = document.getElementById('compBigText');

    if (!listContainer) return;

    var items = listContainer.querySelectorAll('.comp-item');
    var total = items.length;
    if (total === 0) return;

    // 预先获取大图中的标题和摘要元素
    var bigTitle = bigText.querySelector('h3');
    var bigSummary = bigText.querySelector('p');

    var currentIndex = 0;
    var timer = null;

    // 更新右侧大图
    function updatePanel(index) {
        if (index < 0 || index >= total) return;
        var item = items[index];
        var img = item.querySelector('img');
        var titleEl = item.querySelector('.comp-title');
        var title = titleEl ? titleEl.textContent.trim() : '无标题';
        var summary = item.getAttribute('data-summary') || '';

        // 更新背景图
        if (img) {
            bigImage.style.backgroundImage = 'url(' + img.src + ')';
        } else {
            bigImage.style.backgroundImage = 'url(/images/default-competition.jpg)';
        }
        // 更新文字
        bigTitle.textContent = title;
        bigSummary.textContent = summary;

        // 更新高亮样式
        for (var i = 0; i < items.length; i++) {
            var el = items[i];
            var isActive = (i === index);
            el.classList.toggle('active', isActive);
            el.classList.toggle('bg-[#A31F34]/5', isActive);
            el.classList.toggle('border-[#A31F34]/30', isActive);
        }
        currentIndex = index;
    }

    // 自动轮播
    function startAutoPlay() {
        if (timer) clearInterval(timer);
        timer = setInterval(function() {
            var next = (currentIndex + 1) % total;
            updatePanel(next);
        }, 4000);
    }

    function stopAutoPlay() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    // 事件委托：监听鼠标进入列表项
    listContainer.addEventListener('mouseenter', function(e) {
        var target = e.target.closest('.comp-item');
        if (target) {
            var index = parseInt(target.getAttribute('data-index'), 10);
            if (!isNaN(index)) {
                stopAutoPlay();
                updatePanel(index);
            }
        }
    });

    // 鼠标离开整个列表容器时恢复轮播
    listContainer.addEventListener('mouseleave', function() {
        startAutoPlay();
    });

    // 初始化显示第一项并启动轮播
    if (total > 0) {
        updatePanel(0);
        startAutoPlay();
    }
})();