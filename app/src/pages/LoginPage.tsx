import React, { useContext, useState } from "react"
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
import { login } from "@/services/authService"
import { useNavigate } from "react-router-dom"
import { ADMIN_ROLE, FOSTER_PARENT_ROLE, type User } from "@/types/types"
import { GlobalContext } from "@/hooks/GlobalContext"
import { EyeOff, Eye } from "lucide-react"

export function LoginPage({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    const globalContext = useContext(GlobalContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle login logic here
        try {
            const response = await login(formData.email, formData.password);

            // get user data from response and set it in global context

            if (response.status !== 200) {
                setErrorMessage("Login failed. Please check your email and password.");
                return;
            }
            const token = response.data.data.token;
            localStorage.setItem("token", token);
            const payload = JSON.parse(atob(token.split('.')[1]));
            const user: User = {
                userId: payload.user_id,
                email: payload.email,
                role: parseInt(payload.role, 10),
                name: payload.name, // TODO: convert to split name
                firstName: '', // not in token
                lastName: '', // not in token
            };
            globalContext.setUser(user);
            if (user.role === ADMIN_ROLE) {
                navigate("/admin/dashboard");
            } else if (user.role === FOSTER_PARENT_ROLE) {
                navigate("/fosterparent/dashboard");
            } else {
                navigate("/error");
            }
        } catch (error) {
            setErrorMessage("Login failed. Please check your email and password.");
            // Show an error message to the user
        }
    };
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                                {/* Error message container */}
                                {errorMessage && (
                                    <div className="text-red-500 text-sm">{errorMessage}</div>
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid w-full gap-6">
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex justify-items-stretch">
                                            <Label htmlFor="password">Password</Label>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                required
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
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <a href="/signup" className="underline underline-offset-4">
                                        Sign up
                                    </a>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
