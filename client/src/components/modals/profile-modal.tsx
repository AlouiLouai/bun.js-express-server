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

export function ProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    avatarUrl: '/placeholder.svg?height=96&width=96',
  });

  // This will handle saving the profile data
  const handleSave = (newData: typeof profileData) => {
    setProfileData(newData);
    setIsEditing(false); // Close the form and switch back to the view mode
    onClose(); // Close the modal
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
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
            onSave={handleSave} // Save changes
            onCancel={handleCancel} // Cancel changes
          />
        )}

        <DialogFooter>
          {/* Cancel Button */}
          <DialogClose onClick={handleCancel}>Cancel</DialogClose>
          {/* Save Button */}
          {isEditing && <DialogClose onClick={() => handleSave(profileData)}>Save</DialogClose>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
