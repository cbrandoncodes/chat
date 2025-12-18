"use client";

import { z } from "zod";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRightIcon, Loader2Icon, MailIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function MagicLinkAuth() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = form;

  async function onFormSubmit({ email }: FormSchema) {
    try {
      const { error } = await authClient.signIn.magicLink({
        email,
        name: email,
        callbackURL: "/app",
        newUserCallbackURL: "/app",
        errorCallbackURL: "/auth?error=true",
      });

      if (error) {
        throw new Error(
          error?.message ?? "Magic link failed. Please try again."
        );
      }

      reset();

      toast.success("Magic link sent to your email.");
    } catch (error: unknown) {
      console.log("error ", error);

      toast.error("Failed to send magic link. Please try again.");
    }
  }

  function onFormError(errors: FieldErrors<FormSchema>) {
    console.log("errors ", errors);

    const error = Object.entries(errors)?.[0]?.[1]?.message;
    toast.error(error);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onFormSubmit, onFormError)}
        className="w-full space-y-4"
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  icon={MailIcon}
                  type="email"
                  placeholder="name@work.com"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full text-base"
        >
          {isSubmitting && <Loader2Icon className="size-4 animate-spin" />}
          Send Magic Link <ArrowRightIcon className="size-4" />
        </Button>
      </form>
    </Form>
  );
}
