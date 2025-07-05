<script lang="ts">
export const description
    = 'A sidebar that collapses to icons.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { Separator } from '@/components/ui/separator'
import SidebarHeaderMeun from '@/components/SidebarHeaderMeun.vue'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'

import { useMagicKeys } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps<{
    open: boolean
}>()

const open = ref(false)

const keys = useMagicKeys()
const CmdJ = keys['Cmd+J']

function handleOpenChange() {
    open.value = !open.value
}

watch(() => props.open, () => {
    open.value = !open.value

})

watch(CmdJ, (v) => {
    if (v)
        handleOpenChange()
})

</script>

<template>
    <div>
        <SidebarProvider class="h-full w-full">
            <AppSidebar @open-change="handleOpenChange" />
            <SidebarInset>
                <header class="flex h-9 flex-row border-b w-full">
                    <div class="flex items-center justify-center gap-2">
                        <SidebarTrigger class="ml-2" />
                        <Separator orientation="vertical" class="h-4" />
                        <SidebarHeaderMeun />
                    </div>
                    <div id="drag-region" data-tauri-drag-region class="flex-1"></div>
                </header>
                <div class="flex flex-1 flex-col gap-4 p-4 pt-0 w-full">

                </div>
            </SidebarInset>
        </SidebarProvider>
        <CommandDialog v-model:open="open">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem value="calendar">
                        Calendar
                    </CommandItem>
                    <CommandItem value="search-emoji">
                        Search Emoji
                    </CommandItem>
                    <CommandItem value="calculator">
                        Calculator
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <CommandItem value="profile">
                        Profile
                    </CommandItem>
                    <CommandItem value="billing">
                        Billing
                    </CommandItem>
                    <CommandItem value="settings">
                        Settings
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    </div>
</template>
