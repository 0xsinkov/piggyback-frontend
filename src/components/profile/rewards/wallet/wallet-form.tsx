'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CopyIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@root/src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@root/src/components/ui/form';
import { Input } from '@root/src/components/ui/input';
import { PROTECTED_PAGES_URLS } from '@root/src/constants/routes.constants';
import { useUpdateInfo } from '@root/src/hooks/user/use-update-info';
import type { ProfileDto } from '@root/src/types/user.types';
import { revalidate } from '@root/src/utils/revalidate.utils';
import { ERROR_MESSAGES } from '@root/src/constants/error.constants';
import { isApiError } from '@root/src/utils/api-error.utils';

const formSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet Address is requried'),
});

type FormValues = z.infer<typeof formSchema>;

export function WalletForm({ profile }: { profile: ProfileDto }): JSX.Element {
  const [isEditMode, setIsEditMode] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: profile.walletAddress ?? '',
    },
  });

  const { isPending, mutateAsync } = useUpdateInfo();

  const onSubmit = async (values: FormValues): Promise<void> => {
    try {
      const formData = new FormData();

      formData.append('walletAddress', values.walletAddress);

      await mutateAsync(formData);

      setIsEditMode(false);
      await revalidate(PROTECTED_PAGES_URLS.PROFILE);
    } catch (err) {
      toast.error(isApiError(err) ? err.message : ERROR_MESSAGES.GENERIC_ERROR);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form id="wallet-from" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="walletAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Address</FormLabel>
                <div className="relative h-fit w-full">
                  <FormControl>
                    <Input
                      placeholder="Wallet Address"
                      className="pr-10"
                      disabled={isPending || !isEditMode}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    variant="ghost"
                    className="absolute top-3 right-2 size-6 border-none p-0"
                    onClick={() => navigator.clipboard.writeText(field.value)}
                    type="button"
                  >
                    <CopyIcon className="stroke-purple-dark size-6" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="ml-auto">
        {isEditMode ? (
          <Button
            key="save"
            type="submit"
            form="wallet-from"
            disabled={isPending}
          >
            Save Wallet
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
            Edit Wallet
          </Button>
        )}
      </div>
    </div>
  );
}
