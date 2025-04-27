
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    if (showCaptcha) {
      setLoginError("Please complete the CAPTCHA (not implemented in demo)");
      return;
    }

    setIsLoading(true);
    setLoginError("");
    
    try {
      const success = await login(values.username, values.password);
      if (success) {
        navigate("/admin");
      } else {
        const newAttemptCount = failedAttempts + 1;
        setFailedAttempts(newAttemptCount);
        
        if (newAttemptCount >= 3) {
          setShowCaptcha(true);
          setLoginError("Too many failed attempts. Please complete the CAPTCHA.");
        } else {
          setLoginError("Invalid username or password.");
        }
      }
    } catch (error) {
      setLoginError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Saint Woven Saver</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Admin Dashboard</p>
          </div>

          {loginError && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        autoComplete="username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showCaptcha && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                  <p className="text-sm text-center">
                    [CAPTCHA would appear here in production]
                  </p>
                  <div className="mt-2 h-12 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      CAPTCHA Placeholder
                    </span>
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Remember me</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                <p>Demo credentials:</p>
                <p>Username: admin, Password: admin123</p>
                <p>Username: editor, Password: editor123</p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
