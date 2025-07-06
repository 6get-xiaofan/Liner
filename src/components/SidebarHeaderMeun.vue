<template>
    <Menubar class="border-0 bg-transparent">
        <MenubarMenu>
            <MenubarTrigger>{{$t('app.topbar.file.default')}}</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>
                    {{ $t('app.topbar.file.new') }}
                    <!-- <MenubarShortcut>⌘/Ctrl+N</MenubarShortcut> -->
                </MenubarItem>
                <MenubarItem>{{ $t('app.topbar.file.window') }}
                    <!-- <MenubarShortcut>⌘/Ctrl+Shift+N</MenubarShortcut> -->
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem @click="router.push('/editor')">{{ $t('app.topbar.file.open') }}</MenubarItem>
                <MenubarItem>{{ $t('app.topbar.file.folder') }}</MenubarItem>
                <MenubarItem>{{ $t('app.topbar.file.recent') }}</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>{{ $t('app.topbar.file.preference') }}</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>{{ $t('app.topbar.file.closeFolder') }}</MenubarItem>
                <MenubarItem>{{ $t('app.topbar.file.closeWindow') }}</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                    <MenubarSubTrigger>{{ $t('app.topbar.file.export.default') }}</MenubarSubTrigger>
                    <MenubarSubContent>
                        <MenubarItem>{{ $t('app.topbar.file.export.format1') }}</MenubarItem>
                        <MenubarItem>{{ $t('app.topbar.file.export.format2') }}</MenubarItem>
                        <MenubarItem>{{ $t('app.topbar.file.export.format3') }}</MenubarItem>
                        <MenubarItem>{{ $t('app.topbar.file.export.format4') }}</MenubarItem>
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>{{ $t('app.topbar.file.print') }}</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>{{ $t('app.topbar.file.exit') }}</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>{{ $t('app.topbar.edit.default') }}</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>{{ $t('app.topbar.edit.undo') }}</MenubarItem>
                <MenubarItem>{{ $t('app.topbar.edit.redo') }}</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>{{ $t('app.topbar.edit.cut') }}</MenubarItem>
                <MenubarItem>{{ $t('app.topbar.edit.copy') }}</MenubarItem>
                <MenubarItem>{{ $t('app.topbar.edit.paste') }}</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>{{ $t('app.topbar.edit.find') }}</MenubarItem>
                <MenubarItem>{{ $t('app.topbar.edit.replace') }}</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>{{ $t('app.topbar.view.default') }}</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>{{ $t('app.topbar.view.appearance') }}</MenubarItem>
                <MenubarItem>{{ $t('app.topbar.view.theme') }}</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>{{ $t('app.topbar.help.default') }}</MenubarTrigger>
            <MenubarContent>
                <MenubarItem>{{ $t('app.topbar.help.welcome') }}</MenubarItem>
                <MenubarItem>{{ $t('app.topbar.help.learn') }}</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>{{ $t('app.topbar.help.license') }}</MenubarItem>
                <MenubarItem>{{ $t('app.topbar.help.feedback') }}</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>{{ $t('app.topbar.help.about') }}</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Devtools</MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <Drawer>
                <DrawerTrigger as-child>
                    <MenubarTrigger>
                        Devtools
                    </MenubarTrigger>
                </DrawerTrigger>
                <DrawerContent>
                    <div class="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Devtools</DrawerTitle>
                            <DrawerDescription>Devtools</DrawerDescription>
                        </DrawerHeader>
                        <div class="p-4 pb-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button variant="outline">
                                        <Icon icon="radix-icons:moon"
                                            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Icon icon="radix-icons:sun"
                                            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span class="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem @click="mode = 'light'">
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="mode = 'dark'">
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="mode = 'auto'">
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <DrawerFooter>
                            <DrawerClose as-child>
                                <Button variant="outline">
                                    Close
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </MenubarMenu>
    </Menubar>

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
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger
} from '@/components/ui/menubar'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
const mode = useColorMode()
const router = useRouter()

</script>