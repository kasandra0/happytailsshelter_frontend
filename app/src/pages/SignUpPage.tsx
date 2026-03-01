import * as React from "react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FieldErrors = Partial<Record<"name" | "email" | "password" | "confirmPassword", string>>

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRules = { minLen: 8, upper: /[A-Z]/, lower: /[a-z]/, number: /[0-9]/ }

function validatePassword(pw: string): string | null {
  if (pw.length < passwordRules.minLen) return "Password must be at least 8 characters."
  if (!passwordRules.upper.test(pw)) return "Password must include at least 1 uppercase letter."
  if (!passwordRules.lower.test(pw)) return "Password must include at least 1 lowercase letter."
  if (!passwordRules.number.test(pw)) return "Password must include at least 1 number."
  return null
}

export default function SignUpPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState("")
  const [loading, setLoading] = useState(false)

  const canSubmit = useMemo(
    () => !!(name.trim() && email.trim() && password && confirmPassword && !loading),
    [name, email, password, confirmPassword, loading]
  )

  const validate = (): boolean => {
    const errs: FieldErrors = {}

    if (!name.trim()) errs.name = "Please enter your name."
    if (!email.trim()) errs.email = "Please enter your email."
    else if (!emailRegex.test(email.trim()))
      errs.email = "Please enter a valid email (example: name@email.com)."

    if (!password) errs.password = "Please create a password."
    else {
      const pwErr = validatePassword(password)
      if (pwErr) errs.password = pwErr
    }

    if (!confirmPassword) errs.confirmPassword = "Please confirm your password."
    else if (confirmPassword !== password) errs.confirmPassword = "Passwords do not match."

    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    if (!validate()) return

    setLoading(true)
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        const msg =
          data?.message ||
          (res.status === 409
            ? "That email is already in use. Try logging in instead."
            : "We couldn’t create your account. Please try again.")
        throw new Error(msg)
      }

      if (data?.token) localStorage.setItem("token", data.token)
      navigate("/dashboard")
    } catch (err: any) {
      setFormError(err?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create your account to continue</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Claudia Dominguez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!fieldErrors.name}
                  />
                  {fieldErrors.name && <p className="text-sm text-red-500">{fieldErrors.name}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="claudia@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!fieldErrors.email}
                  />
                  {fieldErrors.email && <p className="text-sm text-red-500">{fieldErrors.email}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min 8 chars, upper/lower/number"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={!!fieldErrors.password}
                  />
                  {fieldErrors.password && <p className="text-sm text-red-500">{fieldErrors.password}</p>}
                  {!fieldErrors.password && (
                    <p className="text-xs text-muted-foreground">
                      Must be 10+ characters and include uppercase, lowercase, and a number.
                    </p>
                  )}
                </div>

            git <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    aria-invalid={!!fieldErrors.confirmPassword}
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="text-sm text-red-500">{fieldErrors.confirmPassword}</p>
                  )}
                </div>

                {formError && <p className="text-sm text-red-500">{formError}</p>}

                <Button type="submit" className="w-full" disabled={!canSubmit}>
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}