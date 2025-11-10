"use client"

import { useState, useEffect } from "react"
import LoginForm from "@/components/auth/login-form"
import SignupForm from "@/components/auth/signup-form"
import Dashboard from "@/components/dashboard/dashboard"
// Removed database initialization from client component

export default function Home() {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showSignup, setShowSignup] = useState(false)

  useEffect(() => {
    // Removed database initialization from client component
    // This should be handled on the server side
    
    const savedToken = localStorage.getItem("authToken")
    if (savedToken) {
      setToken(savedToken)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
          <p className="mt-4 text-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (token) {
    return <Dashboard token={token} setToken={setToken} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#E0F2FE] to-[#F3E8FF] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blurred gradient shapes for ambient pastel background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* vibrant pastel washes for depth */}
        <div className="absolute -top-40 -left-40 w-[60vw] h-[60vh] rounded-full bg-gradient-to-br from-[#BAE6FF] to-[#C7D2FE] blur-3xl filter opacity-70" />
        <div className="absolute -bottom-40 -right-40 w-[50vw] h-[50vh] rounded-full bg-gradient-to-tr from-[#FED7E2] to-[#FBCFE8] blur-3xl filter opacity-70" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] rounded-full bg-gradient-to-r from-[#DBEAFE] to-[#E0E7FF] blur-3xl filter opacity-50" />
      </div>

      {/* 🔒 Floating background security icons with colors */}
      <div className="pointer-events-none absolute inset-0 select-none" style={{ zIndex: 1 }}>
        {[
          { src: "/background-icons/lock.svg", top: "8%", left: "5%", size: 50, rotate: -8, delay: 0, color: "#3B82F6", anim: "animate-float-slow" },
          { src: "/background-icons/key.svg", top: "22%", left: "82%", size: 65, rotate: 12, delay: 2, color: "#8B5CF6", anim: "animate-float-slow-alt" },
          { src: "/background-icons/fingerprint.svg", top: "48%", left: "7%", size: 72, rotate: -5, delay: 4, color: "#06B6D4", anim: "animate-float-slow" },
          { src: "/background-icons/shield.svg", top: "68%", left: "85%", size: 58, rotate: 8, delay: 6, color: "#10B981", anim: "animate-float-slow-alt" },
          { src: "/background-icons/eye.svg", top: "12%", left: "88%", size: 48, rotate: -10, delay: 1, color: "#F59E0B", anim: "animate-float-slow" },
          { src: "/background-icons/network.svg", top: "78%", left: "10%", size: 62, rotate: 7, delay: 3, color: "#EC4899", anim: "animate-float-slow-alt" },
          { src: "/background-icons/certificate.svg", top: "35%", left: "90%", size: 54, rotate: -12, delay: 5, color: "#6366F1", anim: "animate-float-slow" },
          { src: "/background-icons/scan.svg", top: "85%", left: "82%", size: 68, rotate: 6, delay: 7, color: "#14B8A6", anim: "animate-float-slow-alt" },
        ].map((icon, i) => (
          <div
            key={i}
            className={`absolute ${icon.anim}`}
            style={{
              top: icon.top,
              left: icon.left,
              animationDelay: `${icon.delay}s`,
            }}
          >
            <img
              src={icon.src}
              alt=""
              style={{
                width: `${icon.size}px`,
                height: `${icon.size}px`,
                transform: `rotate(${icon.rotate}deg)`,
                opacity: 0.35,
                filter: `invert(48%) sepia(79%) saturate(2476%) hue-rotate(${i * 45}deg) brightness(118%) contrast(119%) drop-shadow(0 0 10px ${icon.color}80)`,
              }}
            />
          </div>
        ))}
      </div>

      {showSignup ? (
        <SignupForm onSwitchToLogin={() => setShowSignup(false)} />
      ) : (
        <LoginForm onSwitchToSignup={() => setShowSignup(true)} onSuccess={setToken} />
      )}
    </div>
  )
}