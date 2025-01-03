'use client';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'; // Radix UI Dialog
import ProfileForm from '@/components/forms/profile/profile-form'; // Profile Form
import ProfileCard from '@/components/profile/profile-card'; // Profile Card
import useUser from '@/hooks/use-user';

export function ProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const profile = useUser();
  const [isEditing, setIsEditing] = useState(false);

  // Provide default values for profile data if any value is undefined
  const [profileData, setProfileData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    avatar: '/default-avatar.png', // Provide a fallback avatar URL
  });

  // This will handle canceling the edits
  const handleCancel = () => {
    setIsEditing(false); // Close the form and switch back to the view mode
    onClose(); // Close the modal
  };

  // Reset `isEditing` when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false); // Reset isEditing state when modal is closed
    }
  }, [isOpen]);

  // Update profileData once profile is available
  useEffect(() => {
    if (profile) {
      setProfileData({
        firstname: profile?.firstname ?? '',
        lastname: profile?.lastname ?? '',
        email: profile?.email ?? '',
        avatar: profile?.avatar ?? '/avatar.png',
      });
    }
  }, [profile]); // This effect depends on `profile`

  // Loading check for user data
  if (!profile) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading Profile...</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose onClick={handleCancel}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby=''>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        {/* Render Profile Card if not editing */}
        {!isEditing && (
          <ProfileCard
            {...profileData}
            onEdit={() => setIsEditing(true)} // Open modal in edit mode
          />
        )}

        {/* Render Profile Form if editing */}
        {isEditing && (
          <ProfileForm
            initialData={profileData}
            onCancel={handleCancel}
            onSuccess={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
