<template>
    <div class="flex flex-col w-full h-full">
        <div class="flex w-full h-full overflow-hidden relative">
            <!-- 编辑器 -->
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
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import MarkdownIt from 'markdown-it';

const editorRef = ref<HTMLTextAreaElement | null>(null);
const previewContainerRef = ref<HTMLDivElement | null>(null);
const previewContentRef = ref<HTMLDivElement | null>(null);
const markdownContent = ref('');
const isScrolling = ref(false);

// 初始化Markdown解析器
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true // 启用直接换行
});

// 计算属性：实时渲染Markdown内容
const renderedContent = computed(() => {
    return md.render(markdownContent.value);
});

// 初始内容
onMounted(() => {
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
watch(markdownContent, () => {
    nextTick(() => {
        // 内容变化后保持相对滚动位置
        if (!isScrolling.value && editorRef.value && previewContainerRef.value && previewContentRef.value) {
            const editorHeight = editorRef.value.scrollHeight - editorRef.value.clientHeight;
            const previewHeight = previewContentRef.value.scrollHeight - previewContainerRef.value.clientHeight;
            const ratio = editorRef.value.scrollTop / (editorHeight || 1);

            previewContainerRef.value.scrollTop = ratio * previewHeight;
        }
    });
});

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

<style scoped>
/* 引入Tailwind工具类 */
@reference "tailwindcss";

/* 为渲染的Markdown添加样式 */
.markdown-preview ::v-deep h1 {
    @apply text-2xl font-bold mb-4 mt-6;
    color: var(--color-foreground);
}

.markdown-preview ::v-deep h2 {
    @apply text-xl font-bold mb-3 mt-5;
    color: var(--color-foreground);
}

.markdown-preview ::v-deep h3 {
    @apply text-lg font-bold mb-2 mt-4;
    color: var(--color-foreground);
}

.markdown-preview ::v-deep h4 {
    @apply text-base font-bold mb-2 mt-4;
    color: var(--color-foreground);
}

.markdown-preview ::v-deep h5 {
    @apply text-sm font-bold mb-2 mt-4;
    color: var(--color-foreground);
}

.markdown-preview ::v-deep h6 {
    @apply text-sm font-bold mb-2 mt-4;
    color: var(--color-foreground);
}


.markdown-preview ::v-deep p {
    @apply mb-4;
    color: var(--color-foreground);
}

.markdown-preview ::v-deep ul,
.markdown-preview ::v-deep ol {
    @apply mb-4 ml-6;
}

.markdown-preview ::v-deep ul {
    @apply list-disc;
}

.markdown-preview ::v-deep ol {
    @apply list-decimal;
}

.markdown-preview ::v-deep li {
    @apply mb-2;
    color: var(--color-foreground);
}

.markdown-preview ::v-deep a {
    @apply hover:underline transition-colors duration-200;
    color: var(--color-primary);
}

.markdown-preview ::v-deep code {
    @apply bg-[var(--color-muted)] px-1 py-0.5 rounded text-sm font-mono;
}

.markdown-preview ::v-deep pre {
    @apply bg-[var(--color-muted)] p-4 rounded mb-4 overflow-x-auto text-sm;
}

.markdown-preview ::v-deep blockquote {
    @apply border-l-4 pl-4 italic;
    border-color: var(--color-border);
    color: var(--color-muted-foreground);
}

.markdown-preview ::v-deep img {
    @apply max-w-full h-auto rounded my-4 shadow-md;
}
</style>