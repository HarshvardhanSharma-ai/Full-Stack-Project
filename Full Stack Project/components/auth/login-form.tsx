"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, Lock, Info } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface LoginFormProps {
  onSuccess: (token: string) => void
  onSwitchToSignup?: () => void
}

export default function LoginForm({ onSuccess, onSwitchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Login failed")
        return
      }

      localStorage.setItem("authToken", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      onSuccess(data.token)
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault()
    alert("Password reset functionality coming soon! Please contact your administrator for assistance.")
  }

  const handleGoogleSignIn = () => {
    setError("")
    alert("Google Sign-In integration coming soon! This feature requires OAuth configuration.")
  }

  const handleAppleSignIn = () => {
    setError("")
    alert("Apple Sign-In integration coming soon! This feature requires OAuth configuration.")
  }

  return (
    <Card className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-xl px-0">
      <CardHeader className="space-y-4 px-8 pt-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src="/accessflow-logo.jpg" alt="AccessFlow logo" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="text-center">
          <div className="text-2xl font-extrabold text-foreground">AccessFlow</div>
          <div className="text-sm text-muted mt-1">Secure access control, beautifully reimagined.</div>
        </div>
      </CardHeader>

      <CardContent className="px-8 pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white border border-gray-200 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0078D4]/20 transition rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white border border-gray-200 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0078D4]/20 transition rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0078D4] text-white hover:shadow-md transition py-3 font-medium"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="flex items-center justify-between mt-2">
            <div />
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-slate-500 hover:text-[#0078D4] hover:underline transition"
            >
              Forgot Password?
            </button>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="text-xs text-slate-400">or</div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="mt-3 flex gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex-1 border border-gray-200 rounded-md py-2 text-sm text-slate-700 hover:shadow-sm hover:border-gray-300 transition"
            >
              Sign in with Google
            </button>
            <button
              type="button"
              onClick={handleAppleSignIn}
              className="flex-1 border border-gray-200 rounded-md py-2 text-sm text-slate-700 hover:shadow-sm hover:border-gray-300 transition"
            >
              Sign in with Apple
            </button>
          </div>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            {onSwitchToSignup ? (
              <button onClick={onSwitchToSignup} className="text-[#0078D4] font-medium hover:underline">Sign up</button>
            ) : (
              <a href="#" className="text-[#0078D4] font-medium hover:underline">Sign up</a>
            )}
          </div>

          <div className="mt-6 text-center">
            <span className="text-xs text-slate-400">© 2025 AccessFlow. All rights reserved.</span>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}