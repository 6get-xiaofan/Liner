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
            </MenubarContent>
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

const router = useRouter()

</script>