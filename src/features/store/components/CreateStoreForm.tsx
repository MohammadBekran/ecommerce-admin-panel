import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TCreateStoreFields } from "@/features/store/core/types";
import { createStoreSchema } from "@/features/store/core/validations";
import createStore from "@/features/store/core/services/api/create-store.api";

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
  const form = useForm({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: TCreateStoreFields) => {
    createStore(values);
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
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
};

export default CreateStoreForm;
