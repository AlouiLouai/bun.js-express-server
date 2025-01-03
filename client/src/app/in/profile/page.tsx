'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'; // Assuming your Dialog component is stored here
import ProfileForm from '@/components/forms/profile/profile-form';
import ProfileCard from '@/components/profile/profile-card';

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatarUrl: '/placeholder.svg?height=96&width=96',
  });

  const handleSave = (newData: typeof profileData) => {
    setProfileData(newData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Profile Card */}
        {!isEditing && (
          <ProfileCard {...profileData} onEdit={() => setIsEditing(true)} />
        )}

        {/* Radix UI Dialog Modal */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <button
              className="hidden"
              onClick={() => setIsEditing(true)}
            ></button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>

            {/* Profile Form */}
            <ProfileForm
              initialData={profileData}
              onSave={handleSave}
              onCancel={handleCancel}
            />

            <DialogFooter>
              <DialogClose onClick={handleCancel}>Cancel</DialogClose>
              <DialogClose onClick={() => setIsEditing(false)}>
                Save
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
