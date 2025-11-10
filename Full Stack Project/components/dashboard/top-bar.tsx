"use client"

import { Menu, LogOut, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface User {
  id: string
  email: string
  role: "admin" | "editor" | "viewer"
  name: string
}

interface TopBarProps {
  user: User
  onLogout: () => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function TopBar({ user, onLogout, sidebarOpen, setSidebarOpen }: TopBarProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-700"
      case "editor":
        return "bg-blue-500/20 text-blue-700"
      case "viewer":
        return "bg-green-500/20 text-green-700"
      default:
        return "bg-gray-500/20 text-gray-700"
    }
  }

  return (
    <div 
      className="sticky top-0 z-50 bg-gradient-to-r from-white via-blue-50/20 to-white backdrop-blur-lg border-b h-16 flex items-center justify-between px-6 shadow-sm relative overflow-hidden"
      style={{
        borderImage: 'linear-gradient(to right, #3B82F6, #A855F7, #3B82F6) 1'
      }}
    >
      {/* Decorative Security Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-2 left-20 w-8 h-8 text-blue-400 opacity-[0.35] rotate-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
        <svg className="absolute top-3 left-1/3 w-7 h-7 text-purple-400 opacity-[0.32] -rotate-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        <svg className="absolute top-2 right-32 w-7 h-7 text-teal-400 opacity-[0.33] rotate-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
        </svg>
      </div>

      <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:bg-blue-50/50 rounded-xl transition-all duration-300 hover:scale-105 relative z-10">
        <Menu className="w-5 h-5 text-slate-700" />
      </Button>

      <div className="flex items-center gap-4 relative z-10">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-800">{user.name}</p>
          <div className="flex items-center justify-end gap-2 mt-1">
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
              user.role === 'admin' ? 'bg-red-50 text-red-600 border-red-200' :
              user.role === 'editor' ? 'bg-blue-50 text-blue-600 border-blue-200' :
              'bg-green-50 text-green-600 border-green-200'
            }`}>
              {user.role.toUpperCase()}
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-blue-50/50 rounded-xl transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-blue-200/50 ring-offset-2">
                <span className="text-white text-sm font-bold">{user.name[0]}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-lg border-blue-100 shadow-xl rounded-xl">
            <div className="px-4 py-3 border-b border-blue-100 bg-gradient-to-r from-blue-50/30 to-purple-50/30">
              <p className="text-sm font-semibold text-slate-800">{user.name}</p>
              <p className="text-xs text-slate-600 mt-0.5">{user.email}</p>
            </div>
            <DropdownMenuItem disabled className="text-slate-600 my-1">
              <UserIcon className="mr-2 h-4 w-4 text-blue-500" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-blue-100" />
            <DropdownMenuItem onClick={onLogout} className="text-red-600 focus:text-red-700 focus:bg-red-50 my-1 font-medium">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
