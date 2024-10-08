"use client"


import { useAuthActions } from "@convex-dev/auth/react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "../hooks/use-current-user"
import { Loader, LogOut } from "lucide-react"

export default function UserButton() {
    const { data, isLoading } = useCurrentUser()
    const { signOut } = useAuthActions()

    if(isLoading) {
        return <Loader className="size-10 animate-spin text-muted-foreground" />
    }

    if(!data) return null

    const { name, image } = data
    const avatarBackup = name!.charAt(0).toUpperCase()

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage alt={name} src={image} />
                    <AvatarFallback className="bg-emerald-600 text-white">{avatarBackup}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem onClick={() => signOut()} className="h-10">
                    <LogOut className="size-4 mr-2"/> Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}