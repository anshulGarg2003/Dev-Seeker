import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  search: z.string().min(2, {
    message: "Tag must be at least 2 characters.", // Updated minimum length message
  }),
});

export function SearchBar() {
  const query = useSearchParams();
  const router = useRouter();

  // Initialize useForm with zodResolver and defaultValues from query parameters
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get("search") || "", // Set default value from query parameter
    },
  });

  // Update form field value when query parameter changes
  useEffect(() => {
    form.setValue("search", query.get("search") || "");
  }, [query.get("search"), form]);

  // Define a submit handler
  async function onSubmit(values) {
    if (values.search) {
      router.push(`/browse/?search=${encodeURIComponent(values.search)}`);
    } else {
      router.push("/browse");
    }
  }

  // Render the SearchBar component
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Filter the rooms according to tags..."
                    className="w-[450px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">
            <Search /> Submit
          </Button>

          {/* Clear Button */}
          {query.get("search") && (
            <Button
              variant="link"
              onClick={() => {
                form.setValue("search", "");
                router.push("/browse");
              }}
            >
              Clear
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
