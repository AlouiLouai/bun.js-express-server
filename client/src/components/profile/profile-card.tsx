'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BackgroundGradient } from '../ui/background-gradient';

interface ProfileCardProps {
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  onEdit: () => void;
}

export default function ProfileCard({
  avatar,
  firstname,
  lastname,
  email,
  onEdit,
}: ProfileCardProps) {
  return (
    <BackgroundGradient className="rounded-[22px] max-w-xl p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <Card className="w-full max-w-sm mx-auto">
        <CardContent className="flex flex-col items-center p-6">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage
              src={avatar || '/avatar.png'}
              alt={`${firstname} ${lastname}`}
            />
            <AvatarFallback>
              {firstname[0]}
              {lastname[0]}
            </AvatarFallback>
          </Avatar>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold mb-2">
              <span className="mr-2">{lastname}</span>
              <span>{firstname}</span>
            </h2>
            <p className="text-muted-foreground">{email}</p>
          </div>
          <Button onClick={onEdit} variant="outline">
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </BackgroundGradient>
  );
}
