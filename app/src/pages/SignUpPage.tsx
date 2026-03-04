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
import { register } from "@/services/authService"
import { Eye, EyeOff } from "lucide-react"

type FieldErrors = Partial<Record<"name" | "email" | "password" | "confirmPassword", string>>

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignUpPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const canSubmit = useMemo(
    () => !!(firstName.trim() && lastName.trim() && email.trim() && password && confirmPassword && !loading),
    [firstName, lastName, email, password, confirmPassword, loading]
  )

  const validate = (): boolean => {
    const errs: FieldErrors = {}

    if (!firstName.trim()) errs.name = "Please enter your first name."
    if (!lastName.trim()) errs.name = "Please enter your last name."
    if (!email.trim()) errs.email = "Please enter your email."
    else if (!emailRegex.test(email.trim()))
      errs.email = "Please enter a valid email (example: name@email.com)."

    if (!password) errs.password = "Please create a password."

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
    await register(firstName.trim(), lastName.trim(), email.trim(), password)
      .then(() => {
        navigate("/login")
      })
      .catch((error) => {
        setFormError("Registration failed. Please try again.")
      })
      .finally(() => {
        setLoading(false)
      })
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
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      aria-invalid={!!fieldErrors.name}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      aria-invalid={!!fieldErrors.name}
                    />
                  </div>
                </div>
                {fieldErrors.name && <p className="text-sm text-red-500">{fieldErrors.name}</p>}

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!fieldErrors.email}
                  />
                  {fieldErrors.email && <p className="text-sm text-red-500">{fieldErrors.email}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={!!fieldErrors.password}
                    />
                    <Button
                      className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {fieldErrors.password && <p className="text-sm text-red-500">{fieldErrors.password}</p>}
                  {!fieldErrors.password && (
                    <p className="text-xs text-muted-foreground">
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    aria-invalid={!!fieldErrors.confirmPassword}
                  />
                  
                  </div>
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