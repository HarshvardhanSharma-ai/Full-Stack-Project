"use client"

import { LayoutDashboard, Users, FileText, BarChart3, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface SidebarProps {
  activePanel: string
  setActivePanel: (panel: string) => void
  userRole: string
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ activePanel, setActivePanel, userRole, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, roles: ["admin", "editor", "viewer"] },
    { id: "admin", label: "Admin Panel", icon: Users, roles: ["admin"] },
    { id: "editor", label: "Editor Panel", icon: FileText, roles: ["admin", "editor"] },
    { id: "viewer", label: "Viewer Panel", icon: BarChart3, roles: ["admin", "editor", "viewer"] },
    { id: "audit", label: "Audit Logs", icon: LogOut, roles: ["admin"] },
  ]

  const visibleMenuItems = menuItems.filter((item) => item.roles.includes(userRole))

  return (
    <div
      className={`relative bg-gradient-to-br from-[#EEF3FF] via-[#DDEBFF] to-[#E3F3FE] border-r border-blue-100/50 flex flex-col transition-all duration-300 backdrop-blur-md shadow-inner ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
      style={{
        boxShadow: 'inset 0 2px 8px rgba(59, 130, 246, 0.05)'
      }}
    >
      {/* Decorative Security Icons Background */}
      {sidebarOpen && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute top-20 left-4 w-12 h-12 text-blue-500 opacity-[0.18] rotate-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <svg className="absolute top-64 right-4 w-10 h-10 text-purple-500 opacity-[0.18] -rotate-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
          </svg>
          <svg className="absolute bottom-32 left-6 w-11 h-11 text-teal-500 opacity-[0.18] rotate-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
          </svg>
          <svg className="absolute bottom-80 right-3 w-9 h-9 text-blue-400 opacity-[0.2] -rotate-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
        </div>
      )}

      <div className="relative z-10 p-6 border-b border-blue-200/40 flex items-center justify-between backdrop-blur-sm">
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-lg ring-2 ring-blue-100">
              <Image 
                src="/accessflow-logo.jpg" 
                alt="AccessFlow Logo" 
                width={44} 
                height={44}
                className="object-cover"
              />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 bg-clip-text text-transparent">AccessFlow</span>
          </div>
        )}
        {!sidebarOpen && (
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-lg ring-2 ring-blue-100 mx-auto">
            <Image 
              src="/accessflow-logo.jpg" 
              alt="AccessFlow Logo" 
              width={44} 
              height={44}
              className="object-cover"
            />
          </div>
        )}
      </div>

      <nav className="relative z-10 flex-1 p-4 space-y-2">
        {visibleMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = activePanel === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30"
                  : "text-slate-700 hover:bg-white/70 hover:backdrop-blur-md hover:scale-[1.03] hover:shadow-md"
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'text-white' : 'text-blue-500 group-hover:text-purple-500'}`} />
              {sidebarOpen && <span className="text-sm font-semibold">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="relative z-10 p-4 border-t border-blue-200/40 backdrop-blur-sm">
        <Button
          variant="ghost"
          className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'} text-slate-700 hover:text-red-600 hover:bg-white/80 hover:backdrop-blur-md hover:scale-[1.03] rounded-xl transition-all duration-300 py-3 font-semibold`}
          onClick={() => {
            localStorage.removeItem("authToken")
            location.reload()
          }}
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="ml-3 text-sm">Logout</span>}
        </Button>
      </div>
    </div>
  )
}
