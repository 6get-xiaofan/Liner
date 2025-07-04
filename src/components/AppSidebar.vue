<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    Search,
    CirclePlus
} from 'lucide-vue-next'
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

const emit = defineEmits(['open-change']);

const toggleOpen = () => {
    emit('open-change', !open);
};

// // This is sample data.
// const data = {
//     user: {
//         name: 'shadcn',
//         email: 'm@example.com',
//         avatar: '/avatars/shadcn.jpg',
//     },
//     teams: [
//         {
//             name: 'Acme Inc',
//             logo: GalleryVerticalEnd,
//             plan: 'Enterprise',
//         },
//         {
//             name: 'Acme Corp.',
//             logo: AudioWaveform,
//             plan: 'Startup',
//         },
//         {
//             name: 'Evil Corp.',
//             logo: Command,
//             plan: 'Free',
//         },
//     ],
//     navMain: [
//         {
//             title: 'Playground',
//             url: '#',
//             icon: SquareTerminal,
//             isActive: true,
//             items: [
//                 {
//                     title: 'History',
//                     url: '#',
//                 },
//                 {
//                     title: 'Starred',
//                     url: '#',
//                 },
//                 {
//                     title: 'Settings',
//                     url: '#',
//                 },
//             ],
//         },
//         {
//             title: 'Models',
//             url: '#',
//             icon: Bot,
//             items: [
//                 {
//                     title: 'Genesis',
//                     url: '#',
//                 },
//                 {
//                     title: 'Explorer',
//                     url: '#',
//                 },
//                 {
//                     title: 'Quantum',
//                     url: '#',
//                 },
//             ],
//         },
//         {
//             title: 'Documentation',
//             url: '#',
//             icon: BookOpen,
//             items: [
//                 {
//                     title: 'Introduction',
//                     url: '#',
//                 },
//                 {
//                     title: 'Get Started',
//                     url: '#',
//                 },
//                 {
//                     title: 'Tutorials',
//                     url: '#',
//                 },
//                 {
//                     title: 'Changelog',
//                     url: '#',
//                 },
//             ],
//         },
//         {
//             title: 'Settings',
//             url: '#',
//             icon: Settings2,
//             items: [
//                 {
//                     title: 'General',
//                     url: '#',
//                 },
//                 {
//                     title: 'Team',
//                     url: '#',
//                 },
//                 {
//                     title: 'Billing',
//                     url: '#',
//                 },
//                 {
//                     title: 'Limits',
//                     url: '#',
//                 },
//             ],
//         },
//     ],
//     projects: [
//         {
//             name: 'Design Engineering',
//             url: '#',
//             icon: Frame,
//         },
//         {
//             name: 'Sales & Marketing',
//             url: '#',
//             icon: PieChart,
//         },
//         {
//             name: 'Travel',
//             url: '#',
//             icon: Map,
//         },
//     ],
// }



</script>

<template>
    <Sidebar>
        <SidebarHeader>
            <div class="flex flex-row">
                <div
                    class="flex flex-row items-center justify-center border border-muted rounded-md w-full p-2 border-black cursor-pointer"
                    :click="toggleOpen">
                    <Search :size="18" />
                    <div class="flex-1 text-sm text-muted-foreground ml-1">Search</div>
                    <p class="text-xs text-muted-foreground">
                        <kbd
                            class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span class="text-xs">⌘/Ctrl+J</span>
                        </kbd>
                    </p>
                </div>
                <Button variant="ghost" size="icon" class="ml-2">
                    <CirclePlus />
                </Button>
            </div>
        </SidebarHeader>
        <SidebarContent>

        </SidebarContent>
        <SidebarFooter>
            
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>
