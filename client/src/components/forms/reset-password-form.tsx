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

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
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
          <form>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
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
