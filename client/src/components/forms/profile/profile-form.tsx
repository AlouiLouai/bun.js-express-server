'use client';

import { useState, FormEvent } from 'react';
import { toast } from '@/hooks/use-toast';
import { upload } from '@vercel/blob/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileService from '@/services/profile.services';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/use-user';

interface ProfileFormProps {
  initialData: {
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
  };
  onCancel: () => void;
  onSuccess: () => void;
}

export default function ProfileForm({
  initialData,
  onCancel,
  onSuccess,
}: ProfileFormProps) {
  const router = useRouter();
  const user = useUser();
  const [formData, setFormData] = useState(initialData);
  const [avatarPreview, setAvatarPreview] = useState(initialData.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes for other fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input for avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl); // Set the preview using the object URL
      setAvatarFile(file); // Save the file for uploading later
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let avatarUrl = formData.avatar;

      // Upload avatar if a new file was selected
      if (avatarFile) {
        const blob = await upload(avatarFile.name, avatarFile, {
          access: 'public',
          handleUploadUrl: '/api/upload-avatar',
        });
        avatarUrl = blob.url;
      }

      const updatedData = {
        ...formData,
        avatar: avatarUrl,
      };

      // Call the API to update the profile
      const profileService = new ProfileService();
      await profileService.updateProfile(updatedData);

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated!',
      });

      onSuccess();
      // Redirect based on the user's role
      router.push(`/in/${user?.role?.toLowerCase()}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save changes. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center items-center space-x-4">
            <div className="relative">
              <Image
                src={avatarPreview || 'avatar.png'}
                alt="Avatar Preview"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                unoptimized
              />
              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-sm p-1 cursor-pointer rounded-full"
              >
                Upload
              </label>
            </div>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
