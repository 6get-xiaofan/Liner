<template>
    <div class="flex flex-row justify-end">
        <Button variant="outline" size="icon"
            class="bg-transparent border-0 rounded-none shadow-none hover:bg-[#e0e0e0] dark:text-white dark:hover:bg-[#8b8b8b44]">
            <Minus class="size-[19px]" />
        </Button>
        <Button variant="outline" size="icon"
            class="bg-transparent border-0 rounded-none shadow-none hover:bg-[#e0e0e0] dark:text-white dark:hover:bg-[#8b8b8b44]">
            <Square class="size-[14px]" />
        </Button>
        <Button variant="outline" size="icon"
            class="bg-transparent border-0 rounded-none shadow-none hover:bg-[#f53131] hover:text-white dark:text-white ">
            <X class="size-[18px]" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Minus, Square, X } from "lucide-vue-next"
</script>