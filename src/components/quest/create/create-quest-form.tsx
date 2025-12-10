'use client';

import { useEffect, useState, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  getAccount,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import type { TokenDto } from '@root/src/types/token.types';
import { useCreateQuest } from '@root/src/hooks/quest/use-create-quest';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';
import { Form } from '../../ui/form';
import {
  createQuestFormSchema,
  type CreateQuestFormValues,
} from './form-schema';
import { CreateQuestFormFirstStep } from './first-step';
import { CreateQuestFormSecondStep } from './second-step';
import { CreateQuestFormThirdStep } from './third-step';

const LOCAL_STORAGE_KEY = 'createQuestForm';

export function CreateQuestForm({
  tokens,
}: {
  tokens: TokenDto[];
}): JSX.Element {
  const form = useForm<CreateQuestFormValues>({
    resolver: zodResolver(createQuestFormSchema),
    defaultValues: {
      title: '',
      description: '',
      tokenId: '',
      actions: [
        {
          url: '',
          maxCount: 0,
          rewardAmount: 0,
        },
      ],
    },
  });
  const [step, setStep] = useState(1);
  const { isPending, mutateAsync } = useCreateQuest();
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const router = useRouter();

  const transferTokensClick = async (
    depositAddress: string,
    amount: number,
    tokenId: string,
  ): Promise<void> => {
    if (!publicKey || !sendTransaction) {
      toast.error('Please connect your wallet in settings');

      return;
    }

    try {
      const recipientPublicKey = new PublicKey(depositAddress);
      const selectedToken = tokens.find((t) => t.id === tokenId);

      if (!selectedToken) {
        toast.error('Token not found');

        return;
      }

      const isSOL = selectedToken.symbol.toUpperCase() === 'SOL';

      let transaction: Transaction;

      if (isSOL) {
        const lamports = amount;

        transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPublicKey,
            lamports,
          }),
        );
      } else {
        if (!selectedToken.address) {
          toast.error('Token address not found');

          return;
        }

        const mintPublicKey = new PublicKey(selectedToken.address);
        const senderTokenAccount = await getAssociatedTokenAddress(
          mintPublicKey,
          publicKey,
        );
        const recipientTokenAccount = await getAssociatedTokenAddress(
          mintPublicKey,
          recipientPublicKey,
        );

        transaction = new Transaction();

        try {
          await getAccount(connection, recipientTokenAccount);
        } catch {
          transaction.add(
            createAssociatedTokenAccountInstruction(
              publicKey,
              recipientTokenAccount,
              recipientPublicKey,
              mintPublicKey,
            ),
          );
        }

        transaction.add(
          createTransferInstruction(
            senderTokenAccount,
            recipientTokenAccount,
            publicKey,
            amount,
            [],
          ),
        );
      }

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      toast.success('Transfer successful');

      router.push(PUBLIC_PAGES_URLS.QUESTS);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Transfer failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  const onSubmit = async (values: CreateQuestFormValues): Promise<void> => {
    try {
      const response = await mutateAsync({
        ...values,
        endDate: values.endDate.toISOString(),
      });

      if (!response.data) {
        toast.error('Failed to create quest');

        return;
      }

      const walletAddress = response.data.depositAddress;
      const rewardAmount = response.data.rewardAmount;

      await transferTokensClick(walletAddress, rewardAmount, values.tokenId);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to create quest',
      );
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedData) {
      return;
    }

    try {
      const parsedData: CreateQuestFormValues = JSON.parse(savedData);

      if (parsedData.endDate && typeof parsedData.endDate === 'string') {
        parsedData.endDate = new Date(parsedData.endDate);
      } else {
        parsedData.endDate = undefined as unknown as Date;
      }

      form.reset(parsedData);
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [form]);

  const formValues = form.watch();

  useEffect(() => {
    if (typeof window === 'undefined' || !formValues) {
      return;
    }

    const dataToStore = {
      ...formValues,
      endDate:
        formValues.endDate instanceof Date
          ? formValues.endDate.toISOString()
          : undefined,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
  }, [formValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {step === 1 ? (
          <CreateQuestFormFirstStep
            onNextClick={() => setStep(2)}
            tokens={tokens}
          />
        ) : null}
        {step === 2 ? (
          <CreateQuestFormSecondStep
            onNextClick={() => setStep(3)}
            onBackClick={() => setStep(1)}
          />
        ) : null}
        {step === 3 ? (
          <CreateQuestFormThirdStep
            disabled={isPending}
            onBackClick={() => setStep(2)}
          />
        ) : null}
      </form>
    </Form>
  );
}
