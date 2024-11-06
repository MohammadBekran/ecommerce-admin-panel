import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { useCreateStoreModal } from "@/features/store/core/hooks";
import { createStore } from "@/features/store/core/services/api";
import type { TCreateStoreFields } from "@/features/store/core/types";
import { createStoreSchema } from "@/features/store/core/validations";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CreateStoreForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  });
  const onClose = useCreateStoreModal((state) => state.onClose);

  const onSubmit = (values: TCreateStoreFields) => {
    startTransition(() => createStore(values));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          <Button type="submit" disabled={isPending}>
            Continue
          </Button>
          <Button
            type="submit"
            variant="ghost"
            disabled={isPending}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateStoreForm;
