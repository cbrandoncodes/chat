"use client";

import { useState } from "react";
import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateUserAction } from "@/lib/actions/user";
import { SelectUser } from "@shared/drizzle/schema";

type UserProfileDialogProps = {
  children?: React.ReactNode;
  user: SelectUser;
};

const formSchema = z.object({
  name: z.string().min(1),
});

export type UserProfileFormSchema = z.infer<typeof formSchema>;

export function UserProfileDialog({ user, children }: UserProfileDialogProps) {
  const [open, setOpen] = useState(!user?.name);
  const form = useForm<UserProfileFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  const userId = user?.id;

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = form;

  async function onFormSubmit({ name }: UserProfileFormSchema) {
    try {
      await updateUserAction({ id: userId, name });

      toast.success("User profile updated successfully");

      reset();
      setOpen(false);
    } catch (error: unknown) {
      console.log("error ", error);

      toast.error("Failed to update user profile. Please try again.");
    }
  }

  function onFormError(errors: FieldErrors<UserProfileFormSchema>) {
    console.log("errors ", errors);

    const error = Object.entries(errors)?.[0]?.[1]?.message;
    toast.error(error);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            Update your profile information to continue.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onFormSubmit, onFormError)}
            className="space-y-8"
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2Icon className="size-4 animate-spin" />
                )}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
