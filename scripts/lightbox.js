// 图片灯箱功能 - 支持左右翻页、触摸滑动、鼠标滚轮缩放和图片拖拽
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxWrapper = lightbox.querySelector('.lightbox-image-wrapper');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const overlay = lightbox.querySelector('.lightbox-overlay');

    // 收集所有可点击的作品图片
    const showcaseImages = document.querySelectorAll('.showcase-image img');
    console.log('找到图片数量:', showcaseImages.length);
    if (showcaseImages.length === 0) {
        console.warn('未找到作品图片');
        return;
    }

    let currentIndex = 0;
    let currentScale = 1;
    let panX = 0, panY = 0;
    let isDragging = false;
    let startX = 0, startY = 0;

    const minScale = 0.5;
    const maxScale = 3;
    const scaleStep = 0.1;

    function resetPanAndScale() {
        currentScale = 1;
        panX = 0;
        panY = 0;
        updateTransform();
    }

    function updateLightboxImage() {
        const imgSrc = showcaseImages[currentIndex].src;
        lightboxImg.src = imgSrc;
        resetPanAndScale();
        lightboxCounter.textContent = `${currentIndex + 1} / ${showcaseImages.length}`;
    }

    function updateTransform() {
        lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${currentScale})`;
        lightboxImg.style.transition = isDragging ? 'none' : 'transform 0.1s ease-out';
        lightboxImg.style.cursor = currentScale > 1 || isDragging ? 'grabbing' : 'grab';
    }

    function zoomIn() {
        if (currentScale < maxScale) {
            currentScale = Math.min(currentScale + scaleStep, maxScale);
            updateTransform();
        }
    }

    function zoomOut() {
        if (currentScale > minScale) {
            currentScale = Math.max(currentScale - scaleStep, minScale);
            updateTransform();
        }
    }

    function openLightbox(index) {
        console.log('打开灯箱，索引:', index);
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + showcaseImages.length) % showcaseImages.length;
        updateLightboxImage();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % showcaseImages.length;
        updateLightboxImage();
    }

    // 给每个作品图片添加点击事件
    showcaseImages.forEach((img, index) => {
        console.log('为图片', index, '添加点击事件');
        img.parentElement.style.cursor = 'pointer';
        img.parentElement.onclick = function(e) {
            e.stopPropagation();
            openLightbox(index);
        };
    });

    // 关闭按钮
    lightboxClose.addEventListener('click', closeLightbox);

    // 上一页
    lightboxPrev.addEventListener('click', prevImage);

    // 下一页
    lightboxNext.addEventListener('click', nextImage);

    // 点击遮罩关闭
    overlay.addEventListener('click', closeLightbox);

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // 图片拖拽功能
    let dragStartX = 0;
    let dragMoveDistance = 0;

    lightboxImg.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragMoveDistance = 0;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
        lightboxImg.style.cursor = 'grabbing';
        e.stopPropagation(); // 只阻止事件冒泡，不阻止默认行为
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        dragMoveDistance = Math.abs(e.clientX - dragStartX);
        updateTransform();
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            // 先更新位置，再设置过渡效果
            panX = 0;
            panY = 0;
            lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${currentScale})`;
            lightboxImg.style.transition = 'transform 0.3s ease-out';
            lightboxImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
            // 过渡结束后清除过渡效果
            setTimeout(() => {
                lightboxImg.style.transition = '';
            }, 350);
        }
    });

    // 鼠标滚轮缩放
    lightboxImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            zoomOut();
        } else {
            zoomIn();
        }
    }, { passive: false });

    // 触摸滑动支持（用于左右翻页）
    let touchStartX = 0;
    let touchStartTime = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        const duration = Date.now() - touchStartTime;

        // 如果是快速滑动，则切换图片
        if (Math.abs(diff) > 50 && duration < 300) {
            if (diff > 0) prevImage();
            else nextImage();
        }
    }, { passive: true });

    console.log('灯箱脚本初始化完成');
});
