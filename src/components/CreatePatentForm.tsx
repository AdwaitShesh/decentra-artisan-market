import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { FilePlus, Upload } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters").max(500),
  category: z.string().min(1, "Please select a category"),
  rights: z.string().min(20, "Rights description must be at least 20 characters"),
  terms: z.string().min(20, "Terms must be at least 20 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function CreatePatentForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      rights: "",
      terms: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (!selectedFile) {
      toast.error("Please upload a file for your patent");
      return;
    }

    // This would connect to a blockchain service in a real app
    console.log("Form data:", data);
    console.log("File:", selectedFile);
    
    toast.success("Patent submission initiated!", {
      description: "Your patent is being processed and will be minted as an NFT.",
    });
    
    // Reset form after submission
    form.reset();
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="pt-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Create NFT Patent</h2>
          <p className="text-gray-600">
            Protect your intellectual property by creating an NFT-based patent that is
            verifiable and immutable on the blockchain.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6 md:col-span-1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patent Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your patent title" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of your innovation or creation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patent Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="digital-art">Digital Art</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="literary-work">Literary Work</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="algorithm">Algorithm</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the most relevant category for your patent
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Upload Patent Asset</FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <Input
                      type="file"
                      id="patent-file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf,video/*"
                    />
                    <label 
                      htmlFor="patent-file" 
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      {previewUrl ? (
                        <div className="relative w-full">
                          <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="w-full h-32 object-cover rounded-md mb-2" 
                          />
                          <p className="text-sm text-gray-500">
                            {selectedFile?.name}
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-gray-500">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Supports images, PDFs and videos
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:col-span-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patent Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your innovation in detail" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Detailed description of your creation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rights Claimed</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Specify the rights you are claiming" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        What rights are you claiming with this patent?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage Terms</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Specify how others can use your patent" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Terms and conditions for others to use or license your patent
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-bharat-teal hover:bg-bharat-teal/90 text-white">
                <FilePlus className="mr-2 h-4 w-4" />
                Submit Patent Application
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
