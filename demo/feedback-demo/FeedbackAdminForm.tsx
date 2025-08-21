"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { FeedbackUrl, NewBatchEntryUrl } from "@/constants";
import SubmitButton from "../button-demo/SubmitButton";

import axios, { AxiosError } from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";
import { batchType } from "@/types/Types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import SuccessMessageCard from "../card-demo/SuccessMessageCard";
import { toast } from "sonner";


const fetcher = (url: string) => axios.get(url, { headers: { Authorization: Cookies.get("token") } }).then((res) => res.data);

const FormSchema = z.object({
  batch: z.string().min(2, { message: "Batch Name must be atleast 2 character" }),
  student: z.string().min(3, { message: "Student Name must be atleast 3 character" }),
  teacher: z.string().min(3, { message: "Teacher Name must be atleast 3 characters long" }),
  destination: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email" }),
});

export function FeedbackAdminForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      batch: "",
      student: "",
      teacher: "",
      destination: "+971",
      email: "",
    },
  });
  // Watching form field - batch
  const batchName = form.watch("batch"); 

  // Fetching batchdetails using swr
  const { data } = useSWR<batchType[]>(NewBatchEntryUrl, fetcher);

  // Handle fetch details from batch module
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${NewBatchEntryUrl}?name=${batchName}`, {headers: {Authorization: Cookies.get('token')}});
        console.log(res.data);
        if (res.data) {
            console.log(res.data);
            const selectedBatchName = res.data.find((item: batchType) => item.batch === batchName);
          if (selectedBatchName) {
            form.setValue("student", selectedBatchName.studentName || "");
            form.setValue("teacher", selectedBatchName.teacher || "");
            form.setValue("email", selectedBatchName.email || "");
            form.setValue("destination", selectedBatchName.destination || "");
          } else {
            form.setValue("student", "");
            form.setValue("teacher", "");
            form.setValue("email", "");
            form.setValue("destination", "");
          }
        }
      } catch (error) {
    console.error(error);
      form.setValue("student", "");
      form.setValue("teacher", "");
      form.setValue("email", "");
      form.setValue("destination", "");
      }
    }; 

    handleFetch();

  }, [batchName, form]);

  // Handle form status
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.post(FeedbackUrl, data);
      console.log(res.data);
      // form.reset();

      const { message, success } = res.data;
      setIsSuccess(success);
      toast.success(message)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast.error(message || 'An unknown error has occurred.')
      }
    }
  }

  return (
    <>
    {(isSubmitSuccessful && isSuccess) 
    ? (<SuccessMessageCard to="/feedbackViewer" content="Thank you for creating feedback!"/>) 
    : (<Form {...form}>
       <div className="mb-8 flex flex-col items-center">
                  <h1 className="lg:text-4xl text-2xl mb-4 text-center font-serif">
                    Create a Batchwise Feedback
                  </h1>
                  <Label className="text-gray-500 lg:text-sm text-xs text-center">
                    Please fill neccessary fields
                  </Label>
                </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Batch Details */}
        <FormField
          control={form.control}
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Batch Details
                
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger
                    title="Batch Name"
                    className="py-6 w-full shadow-none rounded-xl"
                  >
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                </FormControl>
                <FormDescription>
                  This field is for batches, please choose a batch.
                </FormDescription>
                <FormMessage />
                <SelectContent>
                  {data?.map((item) => (
                    <SelectItem value={item.batch} key={item._id}>
                      {item.batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Student and Teacher Name */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="student"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Student Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    disabled
                    title="Student Name"
                    className="py-6 shadow-none rounded-xl"
                  />
                </FormControl>
                <FormDescription>
                  Provided the name of the student you want to create. This will
                  be displayed to feedback.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="teacher"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Teacher Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    disabled
                    title="Teacher Name"
                    className="py-6 shadow-none rounded-xl"
                  />
                </FormControl>
                <FormDescription>
                  Provided the name of the teacher you want to create. This will
                  be displayed to feedback.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email and Contact details */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div className="w-full mx-w-md">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Details</FormLabel>
                <FormControl>
                  <PhoneInput
                    country={"ae"}
                    {...field}
                    disabled
                    inputStyle={{ width: "100%", height: "48px" }}
                    inputProps={{ ref: field.ref, required: true }}
                  />
                </FormControl>
                <FormDescription>
                  Provided the contact details you want to create. This will be
                  displayed to feedback.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    disabled
                    title="Email Address"
                    className="py-6 shadow-none rounded-xl"
                  />
                </FormControl>
                <FormDescription>
                  Provided the email address you want to create. This will be
                  displayed to feedback.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <SubmitButton
          name={isSubmitting ? "Creating..." : "Create"}
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </Form>)}
    </>
  );
}
