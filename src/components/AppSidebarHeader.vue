<script setup lang="ts">
import { ChevronsUpDown, Plus, CirclePlus, Search, Settings2 } from 'lucide-vue-next'
import { Button } from './ui/button'
import { type Component, ref } from 'vue'
import { Minus, Square, X } from "lucide-vue-next"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from '@/components/ui/sidebar'

const props = defineProps<{
    teams: {
        name: string
        logo: Component
        plan: string
    }[]
}>()

const { isMobile } = useSidebar()
const activeTeam = ref(props.teams[0])
</script>

<template>
    <SidebarMenu class="flex flex-col align-center gap-0">
        <SidebarMenuItem class="flex flex-row mb-2">
            <div class="flex flex-row gap-1">
                <span class="group rounded-2xl w-3 h-3 bg-[#ff5b52] flex items-center justify-center cursor-pointer">
                    <X class="size-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 dark:text-black" />
                </span>
                <span class="group rounded-2xl w-3 h-3 bg-[#e6c02a] flex items-center justify-center cursor-pointer">
                    <Minus class="size-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 dark:text-black" />

                </span>
                <span class="group rounded-2xl w-3 h-3 bg-[#53c22b] flex items-center justify-center cursor-pointer">
                    <svg t="1751712608216" class=" opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24305"
                        width="200" height="200">
                        <path
                            d="M749.056 230.4l-343.552 1.536c-24.576 0-30.208 14.336-12.8 31.232l368.128 368.128c17.408 17.408 31.232 11.264 31.232-12.8l1.024-343.552c0-24.576-19.968-44.544-44.032-44.544zM263.168 392.192c-17.408-17.408-31.232-11.264-31.232 12.8l-1.024 343.552c0 24.576 19.968 44.032 44.032 44.032l343.552-1.536c24.576 0 30.208-14.336 12.8-31.232L263.168 392.192z"
                            p-id="24306"></path>
                    </svg>
                </span>
            </div>
            <div class="flex-1"></div>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton size="lg"
                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <div
                            class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <component :is="activeTeam.logo" class="size-4" />
                        </div>
                        <div class="grid flex-1 text-left text-sm leading-tight">
                            <span class="truncate font-semibold">
                                {{ activeTeam.name }}
                            </span>
                            <span class="truncate text-xs">{{ activeTeam.plan }}</span>
                        </div>
                        <ChevronsUpDown class="ml-auto" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start"
                    :side="isMobile ? 'bottom' : 'right'" :side-offset="4">
                    <DropdownMenuLabel class="text-xs text-muted-foreground">
                        Teams
                    </DropdownMenuLabel>
                    <DropdownMenuItem v-for="(team, index) in teams" :key="team.name" class="gap-2 p-2"
                        @click="activeTeam = team">
                        <div class="flex size-6 items-center justify-center rounded-sm border">
                            <component :is="team.logo" class="size-4 shrink-0" />
                        </div>
                        {{ team.name }}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem class="gap-2 p-2">
                        <div class="flex size-6 items-center justify-center rounded-md border bg-background">
                            <Plus class="size-4" />
                        </div>
                        <div class="font-medium text-muted-foreground">
                            Add team
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                <!-- <form class="mt-2 w-full">
                    <SidebarGroup class="py-0">
                        <SidebarGroupContent class="relative">
                            <Label for="search" class="sr-only">
                                Search
                            </Label>
                            <SidebarInput id="search" placeholder="Search the docs..." class="pl-8" />
                            <Search
                                class="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </form> -->
            </DropdownMenu>

        </SidebarMenuItem>
    </SidebarMenu>
</template>
