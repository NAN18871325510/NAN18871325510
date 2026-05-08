// ===== 作品过滤功能 =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 移除所有激活状态
        filterBtns.forEach(b => b.classList.remove('active'));
        // 激活当前按钮
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portfolioItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else if (item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});

// ===== 模态框功能 =====
const modal = document.getElementById('project-modal');
const viewBtns = document.querySelectorAll('.view-btn');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.querySelector('.modal-nav-prev');
const modalNext = document.querySelector('.modal-nav-next');
const modalCounter = document.querySelector('.modal-counter');

// 项目数据 - 在这里修改每个项目的详情
const projectsData = {
    1: {
        title: "数据可视化大屏设计",
        category: "UI 设计",
        description: "一个大型数据可视化大屏设计项目，采用了现代化的数据展示方式，帮助用户更直观地理解复杂数据",
        tags: ["UI 设计", "数据可视化", "大屏设计"],
        color: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        image: "image/project 1/缩略图.jpg"
    },
    2: {
        title: "飞猪旅行App优化",
        category: "UI 设计",
        description: "对飞猪旅行App的用户体验进行优化设计，重点改进了用户预订流程和界面交互",
        tags: ["App 设计", "旅行", "用户体验"],
        color: "linear-gradient(135deg, #ec4899, #f59e0b)",
        image: "image/project 2/缩略图2.jpg"
    },
    3: {
        title: "苏州地铁单兵移动端设计",
        category: "UI设计",
        description: "苏州地铁单兵移动端界面设计，专为地铁工作人员定制的移动端操作界面",
        tags: ["移动端", "交通", "B端设计"],
        color: "linear-gradient(135deg, #06b6d4, #6366f1)",
        image: "image/project 3/缩略图3.jpg"
    },
    4: {
        title: "人工智能绘画体验设计",
        category: "UI 设计",
        description: "人工智能绘画体验的用户界面设计，提供直观的AI绘画工具和参数调整",
        tags: ["UI 设计", "AIGC", "创意工具"],
        color: "linear-gradient(135deg, #6366f1, #ec4899)",
        image: "image/project 4/缩略图4.jpg"
    },
    5: {
        title: "低碳出行之公益助农",
        category: "UI 设计",
        description: "低碳出行主题的公益助农项目界面设计，结合出行与助农功能",
        tags: ["公益", "出行", "UI 设计"],
        color: "linear-gradient(135deg, #f59e0b, #ec4899)",
        image: "image/project 5/缩略图5.jpg"
    },
    6: {
        title: "家宅六神",
        category: "AIGC",
        description: "家宅六神主题的AIGC创作项目，探索传统文化与现代AI的结合",
        tags: ["AIGC", "传统文化", "创意设计"],
        color: "linear-gradient(135deg, #8b5cf6, #ec4899)",
        image: "image/project 6/缩略图6.jpg"
    },
    7: {
        title: "ROG IP设计",
        category: "AIGC",
        description: "ROG IP主题的创意设计项目，探索游戏硬件品牌IP形象设计",
        tags: ["IP设计", "AIGC", "品牌设计"],
        color: "linear-gradient(135deg, #8b5cf6, #ec4899)",
        image: "image/project 7/缩略图7.jpg"
    }
};

// 获取项目ID数组（保持顺序）
const projectIds = Object.keys(projectsData).map(Number);
let currentProjectIndex = 0;

// 更新模态框内容
function updateModal(index) {
    currentProjectIndex = index;
    const projectId = projectIds[index];
    const project = projectsData[projectId];

    if (project) {
        const modalImg = document.querySelector('.modal-main-img');
        modalImg.src = project.image;

        document.querySelector('.modal-title').textContent = project.title;
        document.querySelector('.modal-category').textContent = project.category;
        document.querySelector('.modal-description').textContent = project.description;

        // 更新标签
        const tagsContainer = document.querySelector('.modal-tags');
        tagsContainer.innerHTML = project.tags.map(tag =>
            `<span class="tag">${tag}</span>`
        ).join('');

        // 更新图片背景
        document.querySelector('.modal-main-img').style.background = project.color;

        // 更新计数器
        modalCounter.textContent = `${index + 1} / ${projectIds.length}`;
    }
}

// 打开模态框
viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = parseInt(btn.dataset.project);
        const index = projectIds.indexOf(projectId);
        updateModal(index >= 0 ? index : 0);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// 关闭模态框
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// 上一个项目
modalPrev.addEventListener('click', () => {
    const newIndex = (currentProjectIndex - 1 + projectIds.length) % projectIds.length;
    updateModal(newIndex);
});

// 下一个项目
modalNext.addEventListener('click', () => {
    const newIndex = (currentProjectIndex + 1) % projectIds.length;
    updateModal(newIndex);
});

// 点击模态框外部关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ESC 键关闭模态框，左右箭头切换
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    // 左右箭头切换
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            const newIndex = (currentProjectIndex - 1 + projectIds.length) % projectIds.length;
            updateModal(newIndex);
        } else if (e.key === 'ArrowRight') {
            const newIndex = (currentProjectIndex + 1) % projectIds.length;
            updateModal(newIndex);
        }
    }
});

// ===== 移动端导航切换 =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 点击导航链接后关闭移动菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== 滚动时导航栏效果 =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.padding = '1rem 5%';
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.padding = '1.5rem 5%';
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
    }

    lastScroll = currentScroll;
});

// ===== 滚动动画 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为所有需要动画的元素添加初始样式和观察
document.querySelectorAll('.portfolio-item, .about-container, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== 平滑滚动（兼容旧浏览器） =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
