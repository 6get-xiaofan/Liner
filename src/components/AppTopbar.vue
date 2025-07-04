<template>
    <div class="fixed flex flex-row h-8 w-full">
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
        <div data-tauri-drag-region className="flex-1"></div>
        <Button variant="outline" size="icon"
            class="bg-transparent border-0 rounded-none hover:bg-[#818181] hover:text-white dark:text-white dark:hover:bg-[#8b8b8b44]">
            <Minus :size="19" />
        </Button>
        <Button variant="outline" size="icon"
            class="bg-transparent border-0 rounded-none hover:bg-[#818181] hover:text-white dark:text-white dark:hover:bg-[#8b8b8b44]">
            <Square :size="13" />
        </Button>
        <Button variant="outline" size="icon"
            class="bg-transparent border-0 rounded-none hover:bg-[#f53131] hover:text-white dark:text-white ">
            <X :size="18" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from '@/components/ui/menubar'
import { Button } from '@/components/ui/button'
import { Minus, Square, X } from "lucide-vue-next"
</script>