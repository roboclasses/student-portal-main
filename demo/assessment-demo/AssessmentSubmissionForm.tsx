"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { AnswerUrl, AssessmentUrl } from "@/constants";
import { useParams } from "next/navigation";
import { QuestionType } from "@/types/Types";
import { Input } from "@/components/ui/input";
// import { getUserSession } from "@/lib/session"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import SuccessMessageCard from "../card-demo/SuccessMessageCard";
import { toast } from "sonner";

const FormSchema = z.object({
  answer: z.array(
    z.enum(["A", "B", "C", "D"], {
      error: "You need to select an option.",
    })
  ),
  candidate: z.string().optional(),
  teacher: z.string().optional(),
  batch: z.string().optional(),
  assessmentLevel: z.string().optional(),
});

export function AssessmentSubmissionForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { answer: [] },
  });

  const { id } = useParams();
  const [data, setData] = useState<QuestionType[]>([]);
  const [isSuccess, setIsSuccess] = useState(false)

  // Fetching assessment quetions and options
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get(`${AssessmentUrl}/${id}`);
        console.log(res.data);

        const assessmentData = res.data;
        setData(assessmentData.questions);
        form.reset({
          candidate: assessmentData.candidate,
          teacher: assessmentData.teacher,
          answer: new Array(assessmentData.questions.length).fill(""),
          batch: assessmentData.batch,
          assessmentLevel: assessmentData.assessmentLevel,
        });
      } catch (error) {
        console.error(error);
      }
    };

    handleFetch();
  }, [form, id]);

  // Handle login status
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    // Assessment submission time
    const submissionTime = new Date().toISOString();
    console.log("Assessment submission time: ", submissionTime);

    const payload = {
      answer: data.answer,
      candidate: data.candidate,
      teacher: data.teacher,
      assessmentId: id,
      batch: data.batch,
      assessmentLevel: data.assessmentLevel,
      submissionTime: submissionTime,
    };

    try {
      const res = await axios.post(AnswerUrl, payload);
      console.log(res.data);
      // form.reset();

      const { message, success } = res.data;
      setIsSuccess(success)
      toast.success(message)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        const { message } = error.response?.data;
        toast.error(message || "An unknown error has occurred.")
      }
    }
  }

  return (
    <>
      {(isSubmitSuccessful && isSuccess)
      ? ( <SuccessMessageCard to="/assessmentViewer" content="Thank you for submitting the assessment. One of our teacher will reach you soon."/>) 
      : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-8 flex flex-col items-center">
              <h1 className="lg:text-4xl text-2xl mb-4 text-center font-serif">
                Assessment Form
              </h1>
              <Label className="text-gray-500 md:text-lg text-xs text-center">
                Please check your details and fill the form, once done please
                submit
              </Label>
            </div>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>View candidate details</AccordionTrigger>
                <AccordionContent>
                  {/* Candidate Name */}
                  <FormField
                    control={form.control}
                    name="candidate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Candidate Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            required
                            placeholder="Enter your name"
                            className="shadow-none rounded-xl py-6"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormDescription>
                          This field is for the candidate who will give the
                          assessment
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>

                <AccordionContent>
                  {/* Teacher Name */}
                  <FormField
                    control={form.control}
                    name="teacher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teacher Name</FormLabel>
                        <FormControl>
                          <Input
                            required
                            disabled
                            {...field}
                            className="shadow-none rounded-xl py-6"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormDescription>
                          This field is for teacher name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>

                <AccordionContent>
                  {/* Batch name */}
                  <FormField
                    control={form.control}
                    name="batch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assessment Subject Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            required
                            disabled
                            className="shadow-none rounded-xl py-6"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormDescription>
                          This field is for the particular batch where the
                          candidate studying
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>

                <AccordionContent>
                  {/* Difficulty level */}
                  <FormField
                    control={form.control}
                    name="assessmentLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assessment Level</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            required
                            disabled
                            className="shadow-none rounded-xl py-6"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormDescription>
                          This field is for assessment level
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {data.map((item, index) => (
              <div key={index}>
                <FormField
                  control={form.control}
                  name={`answer.${index}`}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className=" font-semibold">
                        {index + 1}. {item.question}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                          className="flex flex-col space-y-1 text-gray-500"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="A" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.option.a}
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="B" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.option.b}
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="C" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.option.c}
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="D" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.option.d}
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button type="submit" className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Answers"}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
