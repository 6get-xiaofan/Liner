<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import { useRouter } from 'vue-router';
const router = useRouter();
import logo from '@/assets/icon.png'
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
import AppSidebarHeader from '@/components/AppSidebarHeader.vue'
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
import NavMain from './NavMain.vue';


// This is sample data.
const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Demo',
            logo: GalleryVerticalEnd,
            plan: 'D:\\Documents\\Demo',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
        {
            name: 'Evil Corp.',
            logo: Command,
            plan: 'Free',
        },
    ],
    navMain: [
        {
            title: 'Folder1',
            url: '#',
            isActive: true,
            items: [
                {
                    title: 'Demo.md',
                    url: '#',
                },
                {
                    title: 'Demo2.md',
                    url: '#',
                },
                {
                    title: 'Demo3.md',
                    url: '#',
                },
            ],
        },
        {
            title: 'Folder2',
            url: '#',
            items: [
                {
                    title: 'Genesis',
                    url: '#',
                },
                {
                    title: 'Explorer',
                    url: '#',
                },
                {
                    title: 'Quantum',
                    url: '#',
                },
            ],
        },
        {
            title: 'Folder3',
            url: '#',
            items: [
                {
                    title: 'Introduction',
                    url: '#',
                },
                {
                    title: 'Get Started',
                    url: '#',
                },
                {
                    title: 'Tutorials',
                    url: '#',
                },
                {
                    title: 'Changelog',
                    url: '#',
                },
            ],
        },
        {
            title: 'Folder4',
            url: '#',
            items: [
                {
                    title: 'General',
                    url: '#',
                },
                {
                    title: 'Team',
                    url: '#',
                },
                {
                    title: 'Billing',
                    url: '#',
                },
                {
                    title: 'Limits',
                    url: '#',
                },
            ],
        },
    ],
    projects: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: Frame,
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: PieChart,
        },
        {
            name: 'Travel',
            url: '#',
            icon: Map,
        },
    ],
}

const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon',
})

</script>

<template>
    <Sidebar v-bind="props">
        <SidebarHeader>
            <AppSidebarHeader :teams="data.teams" />
        </SidebarHeader>
        <SidebarContent>
            <NavMain :items="data.navMain" />
        </SidebarContent>
        <SidebarFooter>
            <div class="flex flex-row justify-center">
                <img :src="logo" alt="logo" class="size-15">
                <h1 class="text-xl font-bold font-['MapleMonoNL']">Liner.</h1>
            </div>
            <pre class="text-[12px] text-gray-500 text-center">0.4.6-alpha-sha.gd90d9f8</pre>
            <p class="text-[12px] text-gray-500 text-center">© 2025 Gabriel Ryder. All rights reserved.</p>
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>