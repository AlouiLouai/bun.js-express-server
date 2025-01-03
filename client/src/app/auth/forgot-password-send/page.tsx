'use client';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <BackgroundGradient className="rounded-[22px] max-w-xl p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <Card>
              <CardHeader className="text-center">Welcome back</CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Please check your email inbox to get the reset password
                      link
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BackgroundGradient>
        </div>
      </div>
    </div>
  );
}
