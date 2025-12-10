'use client';

import { useState, type JSX } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { UploadIcon } from 'lucide-react';
import type { ProfileDto } from '@root/src/types/user.types';
import { useUpdateInfo } from '@root/src/hooks/user/use-update-info';
import { handleApiFormErrors } from '@root/src/utils/form.utils';
import { PROTECTED_PAGES_URLS } from '@root/src/constants/routes.constants';
import { revalidate } from '@root/src/utils/revalidate.utils';
import { Button, buttonVariants } from '../../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';

const formSchema = z.object({
  username: z.string().min(1, 'Username is requried'),
  profilePicture: z.instanceof(File).nullish(),
  email: z.string().email('Invalid email address'),
});

type FormValues = z.infer<typeof formSchema>;

export function SettingsForm({
  profile,
}: {
  profile: ProfileDto;
}): JSX.Element {
  const [isEditMode, setIsEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    profile.profilePictureUrl,
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profile.username ?? '',
      email: profile.email ?? '',
    },
  });

  const { isPending, mutateAsync } = useUpdateInfo();

  const onSubmit = async (values: FormValues): Promise<void> => {
    try {
      const formData = new FormData();

      formData.append('username', values.username);
      formData.append('email', values.email);
      if (values.profilePicture) {
        formData.append('profilePicture', values.profilePicture);
      }

      await mutateAsync(formData);

      setIsEditMode(false);
      await revalidate(PROTECTED_PAGES_URLS.PROFILE);
    } catch (err) {
      handleApiFormErrors(err, form);
    }
  };

  return (
    <div className="flex w-full max-w-125 flex-col gap-8">
      <div className="flex flex-col gap-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            id="profile-from"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <label
                    className="cursor-pointer text-sm font-medium"
                    htmlFor="file-input"
                  >
                    Avatar
                    <div className="relative h-fit w-fit">
                      <Image
                        alt="Profile image"
                        className="size-24 rounded-full object-cover"
                        height={96}
                        src={imagePreview ?? '/shared/profile-placeholder.webp'}
                        width={96}
                      />
                      {isEditMode ? (
                        <div
                          className={buttonVariants({
                            className:
                              'absolute right-0 bottom-0 size-10 rounded-full px-0 py-0',
                            size: 'icon',
                          })}
                        >
                          <UploadIcon className="size-4 text-black" />
                        </div>
                      ) : null}
                    </div>
                    <input
                      accept="image/*"
                      className="hidden"
                      id="file-input"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      type="file"
                      disabled={isPending || !isEditMode}
                    />
                  </label>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      disabled={isPending || !isEditMode}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      disabled={isPending || !isEditMode}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="ml-auto flex gap-3">
        <Button variant="secondary" disabled={isPending}>
          Delete Account
        </Button>
        {isEditMode ? (
          <Button
            key="save"
            type="submit"
            form="profile-from"
            disabled={isPending}
          >
            Save Profile
          </Button>
        ) : (
          <Button
            key="edit"
            onClick={() => {
              if (!isEditMode) {
                setIsEditMode(true);
              }
            }}
            disabled={isPending}
          >
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
}
