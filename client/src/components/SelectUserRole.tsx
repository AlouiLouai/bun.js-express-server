'use client';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export function SelectUserRole({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();

  const handleRoleSelection = (role: 'TEACHER' | 'STUDENT') => {
    // Store role in session storage
    sessionStorage.setItem('role', role);
    router.push(`/auth/sign-up`);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Select Your Role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Teacher Block */}
            <div
              onClick={() => handleRoleSelection('TEACHER')}
              className="flex flex-col items-center justify-center w-72 h-48 bg-white border-2 border-gray-200 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 hover:border-blue-500 hover:shadow-lg"
            >
              <h2 className="text-xl font-medium text-gray-800">
                Register as Teacher
              </h2>
              <p className="text-sm text-gray-500">
                Join as an instructor and manage content.
              </p>
            </div>

            {/* Student Block */}
            <div
              onClick={() => handleRoleSelection('STUDENT')}
              className="flex flex-col items-center justify-center w-72 h-48 bg-white border-2 border-gray-200 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 hover:border-green-500 hover:shadow-lg"
            >
              <h2 className="text-xl font-medium text-gray-800">
                Register as Student
              </h2>
              <p className="text-sm text-gray-500">
                Join as a student and access learning content.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
