<template>
    <div class="flex flex-col w-full h-full">
        <div class="flex w-full h-full overflow-hidden relative">
            <!-- 编辑区 -->
            <div class="w-1/2 border-r border-[var(--color-border)] overflow-hidden h-full relative">
                <textarea ref="editorRef" v-model="markdownContent"
                    class="w-full h-full p-4 bg-[var(--color-card)] text-[var(--color-foreground)] focus:outline-none resize-none"
                    placeholder="Type your markdown here..." @scroll="syncScroll"
                    style="font-family: 'MapleMonoNL', 'Noto Sans CJK', 'Source Han Sans', 'Microsoft YaHei', 'PingFang SC', monospace;"></textarea>
            </div>
            <!-- 预览区 -->
            <div class="w-1/2 overflow-hidden h-full relative">
                <div ref="previewContainerRef" class="w-full h-full overflow-auto" @scroll="syncEditorScroll">
                    <div ref="previewContentRef" class="p-6 bg-[var(--color-card)] markdown-preview"
                        v-html="renderedContent"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import MarkdownItAsync from 'markdown-it-async';

const editorRef = ref<HTMLTextAreaElement | null>(null);
const previewContainerRef = ref<HTMLDivElement | null>(null);
const previewContentRef = ref<HTMLDivElement | null>(null);
const markdownContent = ref('');
const renderedContent = ref('');
const isScrolling = ref(false);

// 初始化Markdown解析器
const md = MarkdownItAsync({
    warnOnSyncRender: true,
    html: true,
    linkify: true,
    typographer: true,
    async highlight(code, lang) {
        const { codeToHtml } = await import('shiki')
        const { transformerMetaHighlight } = await import('@shikijs/transformers')

        const linesCount = code.split('\n').length
        const rawMeta = linesCount > 0 ? `1-${linesCount}` : ''

        return await codeToHtml(code, {
            lang,
            theme: 'vitesse-light',
            meta: {
                __raw: rawMeta
            },
            transformers: [
                transformerMetaHighlight({
                    className: 'line-number'
                })
            ]
        })
    }
})

// 初始内容
onMounted(async () => {
    markdownContent.value = `# Welcome to Markdown Editor
  
This is a **live preview** markdown editor with scroll synchronization.
  
## Features
  
- Real-time rendering
- Markdown syntax support
- HTML embedded support
- Scroll synchronization between editor and preview
  
## How to use
  
1. Type markdown content in the left editor
2. See the real-time preview on the right
3. Scroll either editor or preview to see synchronization in action
  
## Headings and Content Structure
  
### H3 Heading
This is a paragraph under H3 heading.
  
#### H4 Heading
Lists:
- Item 1
- Item 2
- Item 3
  
1. First ordered list item
2. Another item
3. And another item
  
> Blockquote: This is a quote from somewhere.
  
Inline code: \`const greeting = "Hello World"; \`
  
Code block:
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`
  
Images:
![Example Image](https://picsum.photos/800/400?random=1)
  
Tables:
  
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
  
Horizontal Rule:
  
---
  
More content at the bottom...`;

    // 初始同步
    nextTick(() => {
        syncScroll();
    });
});

// 监听内容变化，保持滚动位置
watch(markdownContent, async (newContent) => {
    nextTick(() => {
        // 内容变化后保持相对滚动位置
        if (!isScrolling.value && editorRef.value && previewContainerRef.value && previewContentRef.value) {
            const editorHeight = editorRef.value.scrollHeight - editorRef.value.clientHeight;
            const previewHeight = previewContentRef.value.scrollHeight - previewContainerRef.value.clientHeight;
            const ratio = editorRef.value.scrollTop / (editorHeight || 1);

            previewContainerRef.value.scrollTop = ratio * previewHeight;
        }
    });

    try {
        const html = await md.renderAsync(newContent);
        renderedContent.value = html; // 赋值渲染后的HTML
    } catch (err) {
        console.error(err);
    }
}, { immediate: true }); // 初始化时立即执行一次

// 编辑区滚动时同步预览区
const syncScroll = () => {
    if (!editorRef.value || !previewContainerRef.value || !previewContentRef.value) return;

    isScrolling.value = true;

    // 获取编辑区信息
    const editor = editorRef.value;
    const editorHeight = editor.scrollHeight - editor.clientHeight;
    const editorScrollTop = editor.scrollTop;
    const scrollRatio = editorScrollTop / (editorHeight || 1);

    // 计算预览区应滚动的位置
    const previewContainer = previewContainerRef.value;
    const previewContent = previewContentRef.value;
    const previewHeight = previewContent.scrollHeight - previewContainer.clientHeight;
    const targetScrollTop = scrollRatio * previewHeight;

    // 应用到预览区
    previewContainer.scrollTop = targetScrollTop;

    // 重置标志
    setTimeout(() => {
        isScrolling.value = false;
    }, 50);
};

// 预览区滚动时同步编辑区
const syncEditorScroll = () => {
    if (!editorRef.value || !previewContainerRef.value || !previewContentRef.value) return;

    isScrolling.value = true;

    // 获取预览区信息
    const previewContainer = previewContainerRef.value;
    const previewContent = previewContentRef.value;
    const previewHeight = previewContent.scrollHeight - previewContainer.clientHeight;
    const previewScrollTop = previewContainer.scrollTop;
    const scrollRatio = previewScrollTop / (previewHeight || 1);

    // 计算编辑区应滚动的位置
    const editor = editorRef.value;
    const editorHeight = editor.scrollHeight - editor.clientHeight;
    const targetScrollTop = scrollRatio * editorHeight;

    // 应用到编辑区
    editor.scrollTop = targetScrollTop;

    // 重置标志
    setTimeout(() => {
        isScrolling.value = false;
    }, 50);
};
</script>

<style scoped type="text/tailwindcss">
/* 引入Tailwind工具类 */
@reference "tailwindcss";

/* 为渲染的Markdown添加样式 */
.markdown-preview :deep(h1) {
    @apply text-4xl font-bold mb-4 mt-6 border-b border-[var(--color-border)];
    color: var(--color-foreground);
}

.markdown-preview :deep(h2) {
    @apply text-3xl font-bold mb-3 mt-5 border-b border-[var(--color-border)];
    color: var(--color-foreground);
}

.markdown-preview :deep(h3) {
    @apply text-2xl font-bold mb-2 mt-4;
    color: var(--color-foreground);
}

.markdown-preview :deep(h4) {
    @apply text-xl font-bold mb-2 mt-4;
    color: var(--color-foreground);
}

.markdown-preview :deep(h5) {
    @apply text-lg font-bold mb-2 mt-4;
    color: var(--color-foreground);
}

.markdown-preview :deep(h6) {
    @apply text-base font-bold mb-2 mt-4;
    color: var(--color-foreground);
}

.markdown-preview :deep(p) {
    @apply mb-4;
    color: var(--color-foreground);
}

.markdown-preview :deep(ul, ol) {
    @apply mb-4 ml-6;
}

.markdown-preview :deep(ul) {
    @apply list-disc;
}

.markdown-preview :deep(ol) {
    @apply list-decimal ml-6;
}

.markdown-preview :deep(li) {
    @apply mb-2;
    color: var(--color-foreground);
}

.markdown-preview :deep(a) {
    @apply hover:underline transition-colors duration-200;
    color: var(--color-primary);
}

/* 代码块容器 */
.markdown-preview :deep(pre) {
    @apply bg-[var(--color-muted)] rounded-lg mb-6 overflow-hidden border border-[var(--color-border)] p-2;
    position: relative;
    /* 为行号容器提供定位参考 */
}

.markdown-preview :deep(code) {
    counter-reset: step;
    counter-increment: step 0;
}

/* 高亮行（包含行号） */
.markdown-preview :deep(.line) {
    @apply pl-1;
    /* 留出左侧空间显示行号 */
}

/* 行号样式 */
.markdown-preview :deep(.line::before) {
    content: counter(step);
    counter-increment: step;
    /* 使用data-line属性作为行号内容 */
    @apply w-8 text-right pr-2 py-0.5 text-[var(--color-muted-foreground)] select-none;
    /* 行号与代码间的分隔线 */
}

/* 代码内容区域 */
.markdown-preview :deep(pre code) {
    @apply block w-full font-[MapleMonoNL] text-sm;
}

/* 单行代码样式（与代码块区分） */
.markdown-preview :deep(code:not(pre code)) {
    @apply bg-[var(--color-muted)] px-1.5 py-0.5 rounded text-sm font-[MapleMonoNL];
}

.markdown-preview :deep(blockquote) {
    @apply border-l-4 pl-4 italic border-[var(--color-border)] text-[var(--color-muted-foreground)];
}

.markdown-preview :deep(img) {
    @apply max-w-full h-auto rounded my-4 shadow-md;
}

.markdown-preview :deep(table) {
    @apply w-full border border-[var(--color-border)] rounded border-separate;
}

.markdown-preview :deep(tr) {
    @apply border-b transition-colors;
}

.markdown-preview :deep(th) {
    @apply text-left text-sm px-4 py-2 border-b bg-[var(--color-muted)];
}

.markdown-preview :deep(td) {
    @apply px-4 py-2 text-sm border-b;
}

.markdown-preview :deep(tr:last-child td) {
    @apply border-b-0;
}
</style>