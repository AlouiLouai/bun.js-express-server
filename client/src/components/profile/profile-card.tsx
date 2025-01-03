'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ProfileCardProps {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  onEdit: () => void;
}

export default function ProfileCard({
  avatarUrl,
  firstName,
  lastName,
  email,
  onEdit,
}: ProfileCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="flex flex-col items-center p-6">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={avatarUrl} alt={`${firstName} ${lastName}`} />
          <AvatarFallback>
            {firstName[0]}
            {lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold mb-2">
            <span className="mr-2">{lastName}</span>
            <span>{firstName}</span>
          </h2>
          <p className="text-muted-foreground">{email}</p>
        </div>
        <Button onClick={onEdit} variant="outline">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}
