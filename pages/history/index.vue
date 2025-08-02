<template>
    <div class="history-container">
        <!-- 头部标题 -->
        <div class="header">
            <h1 class="title">网站搭建历史</h1>
            <p class="subtitle">记录项目从构思到上线的每一个重要时刻</p>
        </div>

        <!-- 时间轴容器 -->
        <div class="timeline-container">
            <div class="timeline">
                <div
                    v-for="(event, index) in timelineEvents"
                    :key="event.id"
                    class="timeline-item"
                    :class="{ active: event.isActive }"
                >
                    <!-- 时间轴连接线 -->
                    <div
                        class="timeline-line"
                        v-if="index < timelineEvents.length - 1"
                    ></div>

                    <!-- 时间节点 -->
                    <div class="timeline-node">
                        <div class="node-icon">
                            <i :class="event.icon"></i>
                        </div>
                    </div>

                    <!-- 事件内容 -->
                    <div class="timeline-content">
                        <div class="event-header">
                            <h3 class="event-title">{{ event.title }}</h3>
                            <div class="event-tag" :class="event.type">
                                {{ event.typeText }}
                            </div>
                        </div>

                        <div class="event-description">
                            {{ event.description }}
                        </div>

                        <!-- 技术栈标签 -->
                        <div
                            class="tech-stack"
                            v-if="
                                event.technologies && event.technologies.length
                            "
                        >
                            <div class="tech-label">技术栈:</div>
                            <div class="tech-tags">
                                <span
                                    v-for="tech in event.technologies"
                                    :key="tech"
                                    class="tech-tag"
                                >
                                    {{ tech }}
                                </span>
                            </div>
                        </div>

                        <!-- 成就指标 -->
                        <div
                            class="achievements"
                            v-if="
                                event.achievements && event.achievements.length
                            "
                        >
                            <div
                                class="achievement-item"
                                v-for="achievement in event.achievements"
                                :key="achievement"
                            >
                                <i class="achievement-icon">✓</i>
                                <span>{{ achievement }}</span>
                            </div>
                        </div>

                        <!-- 图片展示 -->
                        <div
                            class="event-images"
                            v-if="event.images && event.images.length"
                        >
                            <div class="image-grid">
                                <div
                                    v-for="(image, imgIndex) in event.images"
                                    :key="imgIndex"
                                    class="image-item"
                                    @click="showImage(image)"
                                >
                                    <img
                                        :src="image.thumbnail"
                                        :alt="image.alt"
                                    />
                                    <div class="image-overlay">
                                        <i class="zoom-icon">🔍</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 图片预览弹窗 -->
        <div v-if="selectedImage" class="image-modal" @click="closeImage">
            <div class="modal-content">
                <button class="close-modal" @click="closeImage">×</button>
                <img :src="selectedImage.full" :alt="selectedImage.alt" />
                <div class="image-caption">{{ selectedImage.caption }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "history",
    layout: "target",
});

// 类型定义
interface TimelineEvent {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    type: "milestone" | "feature" | "bugfix" | "optimization";
    typeText: string;
    icon: string;
    isActive: boolean;
    technologies?: string[];
    achievements?: string[];
    images?: {
        thumbnail: string;
        full: string;
        alt: string;
        caption: string;
    }[];
}

// 响应式数据
const selectedImage = ref<{
    thumbnail: string;
    full: string;
    alt: string;
    caption: string;
} | null>(null);

// 时间轴数据
const timelineEvents = ref<TimelineEvent[]>([
    {
        id: 1,
        title: "项目构思与规划",
        description:
            "开始构思个人网站项目，确定技术栈和功能需求。计划使用Vue 3 + Nuxt 3构建现代化的个人展示网站。",
        date: "2024-01-15",
        time: "09:30",
        type: "milestone",
        typeText: "里程碑",
        icon: "🎯",
        isActive: true,
        technologies: ["Vue 3", "Nuxt 3", "TypeScript"],
        achievements: ["确定技术栈", "完成项目规划", "设计系统架构"],
    },
    {
        id: 2,
        title: "基础框架搭建",
        description:
            "创建项目基础结构，配置开发环境，设置路由系统和基础布局组件。建立了项目的核心架构。",
        date: "2024-01-20",
        time: "14:20",
        type: "feature",
        typeText: "功能开发",
        icon: "🏗️",
        isActive: true,
        technologies: ["Vue Router", "SCSS", "ESLint"],
        achievements: ["项目初始化", "路由配置", "基础布局"],
    },
    {
        id: 3,
        title: "首页设计与实现",
        description:
            "设计并实现网站首页，包含个人介绍、技能展示和项目展示区域。采用现代化的卡片式布局设计。",
        date: "2024-01-25",
        time: "16:45",
        type: "feature",
        typeText: "功能开发",
        icon: "🎨",
        isActive: true,
        technologies: ["CSS Grid", "Flexbox", "响应式设计"],
        achievements: ["首页布局完成", "响应式适配", "动画效果"],
    },
    {
        id: 4,
        title: "目标管理功能",
        description:
            "开发目标管理模块，用户可以创建、编辑和跟踪个人目标。包含目标列表、任务管理和进度追踪功能。",
        date: "2024-02-01",
        time: "11:15",
        type: "feature",
        typeText: "功能开发",
        icon: "🎯",
        isActive: true,
        technologies: ["Vuex", "LocalStorage", "组件化"],
        achievements: ["目标CRUD", "任务管理", "进度追踪"],
    },
    {
        id: 5,
        title: "任务系统开发",
        description:
            "实现完整的任务管理系统，支持任务创建、编辑、删除和状态管理。添加了任务分类和优先级功能。",
        date: "2024-02-10",
        time: "13:30",
        type: "feature",
        typeText: "功能开发",
        icon: "📋",
        isActive: true,
        technologies: ["状态管理", "表单验证", "数据持久化"],
        achievements: ["任务管理", "状态切换", "数据同步"],
    },
    {
        id: 6,
        title: "日历热力图功能",
        description:
            "开发任务日历热力图功能，类似GitHub的贡献图表。用户可以查看每日任务完成情况，支持年份切换。",
        date: "2024-02-15",
        time: "15:20",
        type: "feature",
        typeText: "功能开发",
        icon: "📅",
        isActive: true,
        technologies: ["CSS Grid", "热力图算法", "响应式布局"],
        achievements: ["热力图展示", "年份切换", "移动端适配"],
    },
    {
        id: 7,
        title: "性能优化",
        description:
            "对网站进行性能优化，包括代码分割、懒加载、图片优化等。提升了网站的加载速度和用户体验。",
        date: "2024-02-20",
        time: "10:45",
        type: "optimization",
        typeText: "性能优化",
        icon: "⚡",
        isActive: true,
        technologies: ["代码分割", "懒加载", "图片优化"],
        achievements: ["加载速度提升", "用户体验优化", "SEO优化"],
    },
    {
        id: 8,
        title: "移动端适配",
        description:
            "全面优化移动端体验，确保在各种移动设备上都有良好的显示效果和交互体验。",
        date: "2024-02-25",
        time: "14:10",
        type: "optimization",
        typeText: "性能优化",
        icon: "📱",
        isActive: true,
        technologies: ["移动端适配", "触摸优化", "PWA"],
        achievements: ["移动端完美适配", "触摸交互优化", "离线支持"],
    },
    {
        id: 9,
        title: "Bug修复与测试",
        description:
            "修复发现的各种bug，进行全面的功能测试和兼容性测试。确保网站的稳定性和可靠性。",
        date: "2024-03-01",
        time: "16:30",
        type: "bugfix",
        typeText: "Bug修复",
        icon: "🐛",
        isActive: true,
        technologies: ["单元测试", "集成测试", "兼容性测试"],
        achievements: ["Bug修复", "功能测试", "兼容性验证"],
    },
    {
        id: 10,
        title: "网站上线",
        description:
            "完成所有功能开发和测试，网站正式上线。部署到生产环境，开始为用户提供服务。",
        date: "2024-03-05",
        time: "12:00",
        type: "milestone",
        typeText: "里程碑",
        icon: "🚀",
        isActive: true,
        technologies: ["部署", "域名配置", "SSL证书"],
        achievements: ["网站上线", "域名配置", "SSL证书配置"],
    },
]);

// 方法
const showImage = (image: {
    thumbnail: string;
    full: string;
    alt: string;
    caption: string;
}) => {
    selectedImage.value = image;
};

const closeImage = () => {
    selectedImage.value = null;
};
</script>

<style scoped lang="scss">
.history-container {
    padding: 16px;
    background-color: #eef1fb;
    min-height: 100vh;
}

.header {
    text-align: center;
    margin-bottom: 40px;

    .title {
        font-size: 28px;
        font-weight: 700;
        color: #333;
        margin-bottom: 8px;
    }

    .subtitle {
        font-size: 16px;
        color: #666;
        margin: 0;
    }
}

.timeline-container {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
}

.timeline {
    position: relative;

    .timeline-item {
        position: relative;
        margin-bottom: 40px;
        display: flex;
        align-items: flex-start;

        &:last-child {
            margin-bottom: 0;
        }

        .timeline-line {
            position: absolute;
            left: 11px;
            top: 20px;
            width: 2px;
            height: calc(100% + 20px);
            background: #407fff;
            z-index: 1;
            border-radius: 1px;
        }

        .timeline-node {
            position: relative;
            z-index: 10;
            margin-right: 24px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;

            .node-icon {
                width: 25px;
                height: 25px;
                background: #407fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                color: white;
                box-shadow: 0 4px 16px rgba(64, 127, 255, 0.4);
                transition: all 0.3s ease;
                border: 3px solid rgba(255, 255, 255, 0.2);

                &:hover {
                    transform: scale(1.1);
                    box-shadow: 0 8px 24px rgba(64, 127, 255, 0.6);
                    border-color: rgba(255, 255, 255, 0.4);
                }
            }

            .node-date {
                margin-top: 12px;
                text-align: center;
                min-width: 60px;

                .date {
                    font-size: 12px;
                    color: #666;
                    font-weight: 500;
                    line-height: 1.2;
                }

                .time {
                    font-size: 11px;
                    color: #999;
                    line-height: 1.2;
                }
            }
        }

        .timeline-content {
            flex: 1;
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }

            .event-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 12px;

                .event-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #333;
                    margin: 0;
                    flex: 1;
                }

                .event-tag {
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                    text-transform: uppercase;

                    &.milestone {
                        background: linear-gradient(135deg, #ff6b6b, #ff8e53);
                        color: white;
                    }

                    &.feature {
                        background: linear-gradient(135deg, #4ecdc4, #44a08d);
                        color: white;
                    }

                    &.bugfix {
                        background: linear-gradient(135deg, #ffa726, #ff7043);
                        color: white;
                    }

                    &.optimization {
                        background: linear-gradient(135deg, #9c27b0, #673ab7);
                        color: white;
                    }
                }
            }

            .event-description {
                font-size: 14px;
                color: #666;
                line-height: 1.6;
                margin-bottom: 16px;
            }

            .tech-stack {
                margin-bottom: 16px;

                .tech-label {
                    font-size: 12px;
                    color: #999;
                    margin-bottom: 8px;
                    font-weight: 500;
                }

                .tech-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;

                    .tech-tag {
                        background: #f0f0f0;
                        color: #666;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 11px;
                        font-weight: 500;
                    }
                }
            }

            .achievements {
                margin-bottom: 16px;

                .achievement-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 6px;
                    font-size: 13px;
                    color: #666;

                    .achievement-icon {
                        color: #407fff;
                        margin-right: 8px;
                        font-weight: bold;
                    }
                }
            }

            .event-images {
                .image-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
                    gap: 8px;

                    .image-item {
                        position: relative;
                        border-radius: 8px;
                        overflow: hidden;
                        cursor: pointer;
                        aspect-ratio: 1;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }

                        .image-overlay {
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0, 0, 0, 0.5);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            opacity: 0;
                            transition: opacity 0.3s ease;

                            .zoom-icon {
                                color: white;
                                font-size: 16px;
                            }
                        }

                        &:hover .image-overlay {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
}

.image-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .modal-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;

        .close-modal {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 8px;

            &:hover {
                opacity: 0.8;
            }
        }

        img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 8px;
        }

        .image-caption {
            color: white;
            text-align: center;
            margin-top: 12px;
            font-size: 14px;
        }
    }
}

// 移动端适配
@media (max-width: 768px) {
    .history-container {
        padding: 12px;
    }

    .header {
        margin-bottom: 30px;

        .title {
            font-size: 24px;
        }

        .subtitle {
            font-size: 14px;
        }
    }

    .timeline {
        .timeline-item {
            margin-bottom: 30px;

            .timeline-node {
                margin-right: 15px;

                .node-icon {
                    width: 25px;
                    height: 25px;
                    font-size: 16px;
                }

                .node-date {
                    .date {
                        font-size: 11px;
                    }

                    .time {
                        font-size: 10px;
                    }
                }
            }

            .timeline-content {
                padding: 16px;

                .event-header {
                    flex-direction: column;
                    gap: 8px;

                    .event-title {
                        font-size: 16px;
                    }

                    .event-tag {
                        align-self: flex-start;
                    }
                }

                .event-description {
                    font-size: 13px;
                }

                .tech-stack {
                    .tech-tags {
                        .tech-tag {
                            font-size: 10px;
                        }
                    }
                }

                .achievements {
                    .achievement-item {
                        font-size: 12px;
                    }
                }
            }
        }
    }
}

// 平板适配
@media (min-width: 769px) and (max-width: 1024px) {
    .timeline-container {
        max-width: 700px;
    }
}
</style>
