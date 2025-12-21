import { useState, type JSX } from 'react';
import { useFormContext } from 'react-hook-form';
import { CalendarDaysIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import type { TokenDto } from '@root/src/types/token.types';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Button } from '../../ui/button';
import { Calendar } from '../../ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import type { CreateQuestFormValues } from './form-schema';
import { CreateQuestStepCard } from './step-card';

export function CreateQuestFormFirstStep({
  tokens,
  onNextClick,
}: {
  tokens: TokenDto[];
  onNextClick: () => void;
}): JSX.Element {
  const form = useFormContext<CreateQuestFormValues>();
  const [dateOpen, setDateOpen] = useState(false);

  const onNextClickWrapper = () => {
    if (
      form.getValues('title') === '' ||
      form.getValues('description') === '' ||
      form.getValues('endDate') === null ||
      form.getValues('tokenId') === ''
    ) {
      toast.error('Please fill in all fields');
      return;
    }

    onNextClick();
  };

  return (
    <CreateQuestStepCard
      currentStep={1}
      title="Let’s start with basic info"
      description="Turn your post into a growth engine"
      onNextClick={onNextClickWrapper}
    >
      <div className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 w-full justify-start gap-3 px-3 py-2 font-normal"
                    >
                      <CalendarDaysIcon className="text-purple-dark size-6" />
                      {field.value
                        ? field.value.toLocaleDateString()
                        : 'End date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      disabled={(date) => date < new Date()}
                      onSelect={(date) => {
                        field.onChange(date);
                        setDateOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tokenId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-purple-light h-12 shadow-none">
                    <SelectValue placeholder="Token Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </CreateQuestStepCard>
  );
}
