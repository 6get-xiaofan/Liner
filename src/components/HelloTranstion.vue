<template>
    <div ref="container" class="relative overflow-hidden w-400 h-200 bg-gray-100 rounded-lg shadow-lg">
        <!-- 文字会通过JS动态添加到这里 -->
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const container = ref(null)
let animations = []

// 按语言流行程度排序的"你好"翻译
const translations = [
    { text: "你好，欢迎", lang: "简体中文" },
    { text: "你好，歡迎", lang: "繁体中文" },
    { text: "Hello, Welcome", lang: "英语" },
    { text: "Hola bienvenido", lang: "西班牙语" },
    { text: "Привет, добро пожаловать", lang: "俄语" },
    { text: "こんにちは、ようこそ", lang: "日语" },
    { text: "안녕하세요, 환영합니다", lang: "韩语" },
    { text: "Salve, benvenuto", lang: "意大利语" },
    { text: "Bonjour et bienvenue", lang: "法语" },
    { text: "Hallo, willkommen", lang: "德语" },
    { text: "Olá, bem-vindo", lang: "葡萄牙语" },
    { text: "Merhaba. Hoş geldiniz.", lang: "土耳其语" },
    { text: "สวัสดี ยินดีต้อนรับ", lang: "泰语" },
    { text: "Γεια σας. Καλώς ήρθατε.", lang: "希腊语" },
    { text: "سلام. خوش آمديد.", lang: "波斯语" },
    { text: "Xin chào, chào mừng", lang: "越南语" },
    { text: "ສະບາຍດີ, ຍິນດີຕ້ອນຮັບ", lang: "老挝语" },
    { text: "សួស្វាគមន៍", lang: "高棉语" },
    { text: "مرحبا ، مرحبا", lang: "阿拉伯语" },
    { text: "Ahoj, vítejte.", lang: "捷克语" },
    { text: "Zdravo. Dobrodošli.", lang: "克罗地亚语" },
    { text: "Bună. Bine ai venit.", lang: "罗马尼亚语" },
    { text: "Velkommen.", lang: "挪威语" },
    { text: "Tervetuloa.", lang: "芬兰语" },
    { text: "Saluton, bonvenon", lang: "世界语" }
]

// 随机数生成函数
const random = (min, max) => Math.random() * (max - min) + min

// 检查两个矩形是否重叠
const isOverlapping = (rect1, rect2) => {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
}

onMounted(() => {
    if (!container.value) return

    const containerWidth = container.value.offsetWidth
    const containerHeight = container.value.offsetHeight
    const occupiedSpaces = [] // 记录已占用的空间
    const totalTexts = translations.length  // 每种语言2个实例

    // 创建文字元素
    for (let i = 0; i < totalTexts; i++) {
        const translation = translations[i % translations.length]
        const textEl = document.createElement('div')

        // 随机大小 (16px 到 64px 之间)
        const fontSize = Math.floor(random(24, 54))
        textEl.textContent = translation.text
        textEl.className = `font-bold absolute whitespace-nowrap opacity-15 transition-opacity duration-300`
        textEl.style.fontSize = `${fontSize}px`
        textEl.setAttribute('data-lang', translation.lang)
        container.value.appendChild(textEl)

        // 计算文字尺寸
        const textWidth = textEl.offsetWidth
        const textHeight = textEl.offsetHeight
        const padding = 20 // 文字之间的间距

        // 尝试找到不重叠的位置
        let x, y
        let maxAttempts = 100
        let placed = false

        while (maxAttempts > 0 && !placed) {
            const isLeftToRight = i % 2 === 0
            const startY = random(20, containerHeight - textHeight - 20)

            // 根据方向设置x坐标
            if (isLeftToRight) {
                x = -textWidth
            } else {
                x = containerWidth
            }

            // 检查是否与已存在的元素重叠
            const newRect = {
                x: isLeftToRight ? x : x - textWidth,
                y: startY,
                width: textWidth,
                height: textHeight
            }

            let overlap = false
            for (const rect of occupiedSpaces) {
                if (isOverlapping(newRect, rect)) {
                    overlap = true
                    break
                }
            }

            if (!overlap) {
                y = startY
                occupiedSpaces.push({
                    x: newRect.x,
                    y: newRect.y,
                    width: newRect.width + padding, // 添加间距
                    height: newRect.height + padding
                })
                placed = true
            }

            maxAttempts--
        }

        // 如果找不到位置，使用默认位置
        if (!placed) {
            const isLeftToRight = i % 2 === 0
            x = isLeftToRight ? -textWidth : containerWidth
            y = random(20, containerHeight - textHeight - 20)
        }

        const isLeftToRight = i % 2 === 0
        const endX = isLeftToRight ? containerWidth : -textWidth

        // 随机动画持续时间 (8-20秒)
        const duration = random(8, 20)

        // 创建动画
        const animation = gsap.to(textEl, {
            x: endX,
            duration,
            ease: 'linear',
            repeat: -1, // 无限循环
            onComplete: () => {
                // 重置位置重新开始
                gsap.set(textEl, { x: isLeftToRight ? -textWidth : containerWidth, y })
            }
        })

        // 设置初始位置
        gsap.set(textEl, { x, y })

        // 添加延迟，使动画错开
        animation.delay(random(0, 5))
        animation.play()

        // 存储动画引用以便清理
        animations.push(animation)

        // 悬停效果
        textEl.addEventListener('mouseenter', () => {
            gsap.to(textEl, { opacity: 0.8, scale: 1.1, duration: 0.3 })
        })

        textEl.addEventListener('mouseleave', () => {
            gsap.to(textEl, { opacity: 0.15, scale: 1, duration: 0.3 })
        })
    }
})

onUnmounted(() => {
    // 清理所有动画
    animations.forEach(animation => animation.kill())
    animations = []
})
</script>

<style scoped>
.container {
    position: relative;
    overflow: hidden;
}
</style>