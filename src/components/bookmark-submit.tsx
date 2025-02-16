"use client";

import { submitBookmark } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  url: z.string().url({
    message: "Invalid URL.",
  }),
  type: z.string().optional(),
  notes: z.string().optional(),
});

export type formData = z.infer<typeof formSchema>;

interface Props {
  className?: string;
  setFormOpen?: (open: boolean) => void;
}

const bookmarks = ["Others", "Hacker News", "bytes"];

export const SubmitBookmarkForm: React.FC<Props> = ({ className }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    // mode: 'onChange',
    defaultValues: {
      url: "",
      type: "",
      notes: "",
    },
  });
  const {
    formState: { isSubmitting, errors },
  } = form;
  const hasErrors = Object.keys(errors).length > 0;

  async function onSubmit(values: formData) {
    try {
      await submitBookmark(values);
      toast.success("Bookmark submitted!", {
        description: (
          <span>
            <span className="underline underline-offset-4">{values.url}</span>{" "}
            has been submitted. Thank you!
          </span>
        ),
      });
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={bookmarks[0]}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bookmark type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bookmarks.map((bookmark) => (
                    <SelectItem key={bookmark} value={bookmark}>
                      {bookmark}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormDescription>Optional.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {hasErrors ? (
            "Submit"
          ) : (
            <span key={isSubmitting ? "summitting" : "submit"}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};
