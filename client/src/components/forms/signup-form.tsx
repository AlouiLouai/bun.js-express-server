'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAuth from '@/hooks/use.auth';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      // Show success toast
      toast({
        variant: 'default',
        title: 'Registration Successful',
        description: `Welcome, ${formData.firstname}! Your account has been created.`,
      });
      router.push("/auth/sign-in")
    } catch (error: unknown) {
      const errorMessage =
        (error instanceof Error && error.message) ||
        'An unexpected error occurred. Please try again.';

      // Show error toast
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: errorMessage,
      });
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Register with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  {/* Apple button content */}
                </Button>
                <Button variant="outline" className="w-full">
                  {/* Google button content */}
                </Button>
              </div>
              <div className="relative text-center text-sm">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                {/* Row for Firstname and Lastname */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstname">Firstname</Label>
                    <Input
                      id="firstname"
                      type="text"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="Your firstname..."
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastname">Lastname</Label>
                    <Input
                      id="lastname"
                      type="text"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Your lastname..."
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email..."
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Your password..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </Button>
                {error && (
                  <p className="text-sm text-red-500">
                    {error || 'An error occurred. Please try again.'}
                  </p>
                )}
              </div>
              <div className="text-center text-sm">
                Already have an account?{' '}
                <a href="/auth/signin" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
