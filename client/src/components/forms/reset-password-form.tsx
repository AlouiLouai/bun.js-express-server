'use client';
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
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/use.auth';
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { resetPassword, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: '',
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Check password match in real-time
  useEffect(() => {
    setPasswordMatch(formData.new_password === formData.confirm_password);
  }, [formData.new_password, formData.confirm_password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordMatch) {
      toast({
        variant: 'destructive',
        title: 'Password mismatch',
        description:
          'Passwords do not match. Please correct them before submitting.',
      });
      return;
    }

    try {
      if (token) {
        await resetPassword({ token, new_password: formData.new_password });
        toast({
          variant: 'default',
          title: 'Password Reset Successful',
          description: 'You can now log in with your new password.',
        });
        router.push('/auth/sign-in');
      } else {
        // Show success toast
        toast({
          variant: 'destructive',
          title: 'Reset Token Issue',
          description:
            'Unknown issue! Try resending the forgot password email.',
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        (error instanceof Error && error.message) ||
        'An unexpected error occurred. Please try again.';

      // Show error toast
      toast({
        variant: 'destructive',
        title: 'Reset password Failed',
        description: errorMessage,
      });
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Create a new password for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="new_password">New Password</Label>
                <Input
                  id="new_password"
                  type="password"
                  value={formData.new_password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                />
                {!passwordMatch && (
                  <p className="text-sm text-red-500">Passwords do not match</p>
                )}
                {passwordMatch && (
                  <Button type="submit" className="w-full">
                    {loading ? 'Resetting password' : 'Reset Password'}
                  </Button>
                )}
              </div>
              {error && (
                <p className="text-sm text-red-500">
                  {error || 'An error occurred. Please try again.'}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-sm">
        Remembered your password?{' '}
        <a href="/auth/sign-in" className="underline underline-offset-4">
          Go back to login
        </a>
      </div>
    </div>
  );
}
