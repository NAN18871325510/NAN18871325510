// 项目数据 - 在这里修改每个项目的详情
const projectsData = {
    1: {
        title: "电商平台 redesign",
        category: "网页设计",
        description: "这是一个大型电商平台的全界面重新设计项目。我们重新梳理了用户购物流程，优化了商品展示方式，使转化率提升了 35%。设计采用了现代化的视觉语言，同时保持了品牌的识别度。",
        tags: ["UI 设计", "用户体验", "电商", "响应式"]
    },
    2: {
        title: "健身追踪 App",
        category: "App 设计",
        description: "一款专注于个人健康管理的移动应用。用户可以记录运动数据、制定健身计划、追踪饮食摄入。界面采用大胆的渐变色和流畅的动效，让健康管理变得有趣。",
        tags: ["移动应用", "健康", "iOS", "Android"]
    },
    3: {
        title: "科技公司品牌视觉",
        category: "品牌设计",
        description: "为一家新兴 AI 科技公司打造的完整品牌视觉系统，包括 Logo、VI 手册、网站、宣传物料等。设计语言体现科技感与亲和力的平衡。",
        tags: ["品牌识别", "Logo 设计", "VI 系统"]
    },
    4: {
        title: "SaaS 仪表板设计",
        category: "网页设计",
        description: "企业级数据分析平台的仪表板设计。将复杂的数据以直观的可视化方式呈现，帮助管理者快速做出决策。支持深色/浅色主题切换。",
        tags: ["B 端设计", "数据可视化", "SaaS"]
    },
    5: {
        title: "美食外卖应用",
        category: "App 设计",
        description: "连接用户与本地餐厅的外卖平台。特色功能包括 AR 预览菜品、智能推荐系统、实时配送追踪。色彩鲜艳活泼，激发用户食欲。",
        tags: ["外卖", "美食", "LBS", "社交"]
    },
    6: {
        title: "咖啡馆品牌识别",
        category: "品牌设计",
        description: "为一家精品咖啡连锁店设计的品牌识别系统。从 Logo 到包装，从店面装潢到员工制服，打造统一的品牌体验。风格温暖而现代。",
        tags: ["餐饮", "包装", "空间"]
    }
};

// 页面加载时根据 URL 参数填充内容
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (projectId && projectsData[projectId]) {
        const project = projectsData[projectId];

        document.title = `${project.title} | 我的作品集`;
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-category').textContent = project.category;
        document.getElementById('project-description').textContent = project.description;

        // 更新标签
        const tagsContainer = document.getElementById('project-tags');
        tagsContainer.innerHTML = project.tags.map(tag =>
            `<span class="tag">${tag}</span>`
        ).join('');
    } else {
        // 如果没有指定项目或项目不存在，显示默认内容
        document.getElementById('project-title').textContent = "项目详情";
        document.getElementById('project-category').textContent = "未指定项目";
        document.getElementById('project-description').textContent = "请从作品集页面选择要查看的项目。";
    }

    // 移动端导航切换
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ===== 图片灯箱功能 =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    // 收集所有可点击的作品图片
    const showcaseImages = document.querySelectorAll('.showcase-image');
    let currentIndex = 0;

    // 获取图片源 - 优先用 img 标签，否则用 placeholder 生成一张图
    function getImageSrc(element) {
        const img = element.querySelector('img');
        if (img) return img.src;

        // 如果是 placeholder，获取渐变背景色并生成一张 SVG 占位图
        const placeholder = element.querySelector('.placeholder-showcase-img');
        if (placeholder) {
            const caption = element.closest('.showcase-item')?.querySelector('.showcase-caption')?.textContent || '';
            return generatePlaceholderSVG(placeholder, caption);
        }
        return '';
    }

    // 生成占位 SVG（用于 placeholder 的大图预览）
    function generatePlaceholderSVG(placeholder, caption) {
        const style = getComputedStyle(placeholder);
        const bg = style.background || style.backgroundImage || 'linear-gradient(135deg, #6366f1, #8b5cf6)';

        // 简化：返回一个 data URI SVG
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
            <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6366f1"/>
                <stop offset="50%" stop-color="#8b5cf6"/>
                <stop offset="100%" stop-color="#ec4899"/>
            </linearGradient></defs>
            <rect width="100%" height="100%" fill="url(#g)"/>
            <text x="50%" y="50%" fill="white" font-size="24" font-family="Inter,sans-serif" text-anchor="middle" dominant-baseline="middle">${caption}</text>
        </svg>`;
        return 'data:image/svg+xml,' + encodeURIComponent(svgContent);
    }

    // 打开灯箱
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 关闭灯箱
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 切换上一张
    function prevImage() {
        currentIndex = (currentIndex - 1 + showcaseImages.length) % showcaseImages.length;
        updateLightboxImage();
    }

    // 切换下一张
    function nextImage() {
        currentIndex = (currentIndex + 1) % showcaseImages.length;
        updateLightboxImage();
    }

    // 更新灯箱中的图片
    function updateLightboxImage() {
        const imgSrc = getImageSrc(showcaseImages[currentIndex]);
        lightboxImg.src = imgSrc;
        lightboxCounter.textContent = `${currentIndex + 1} / ${showcaseImages.length}`;
    }

    // 给每个作品图片添加点击事件
    showcaseImages.forEach((image, index) => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // 关闭、上一页、下一页按钮
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    // 点击遮罩关闭
    lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // 触摸滑动支持（移动端）
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    lightbox.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) prevImage();
            else nextImage();
        }
    });
});
