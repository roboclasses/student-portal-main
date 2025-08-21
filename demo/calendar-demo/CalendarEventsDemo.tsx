"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { appointmentTypes, batchType } from "@/types/Types";
import { DemoClassUrl, NewBatchEntryUrl } from "@/constants";
import { getUserSession } from "@/lib/session";
import { teachers } from "@/data/dataStorage";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";



// Augment FullCalendar's EventInput type
import { EventInput } from '@fullcalendar/core';

// Define a custom event type that includes backgroundColor and borderColor
interface CustomEvent extends EventInput {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  extendedProps: {
    type: string;
  };
  classNames?: string[];
  backgroundColor?: string;
  borderColor?: string;
}


const fetcher = (url: string) => axios.get(url, {headers:{Authorization: Cookies.get("token")}}).then((res) => res.data);

const CalendarEventsDemo = () => {
  const { data: batchData, error: batchError } = useSWR<batchType[]>(NewBatchEntryUrl, fetcher);
  const { data: demoClassData, error: demoError } = useSWR<appointmentTypes[]>(DemoClassUrl, fetcher);

  const [user, setUser] = useState({role:"", name:""})
  const [teacher, setTeacher] = useState("Monty")

// Handle fetch user session
useEffect(()=>{
  const handleFetch = async()=>{
    try {
      const session = await getUserSession();
      if(!session.role || !session.name){
        throw new Error('No user session is found.')
      }
      setUser({role: session.role, name: session.name})
      
    } catch (error) {
      console.error(error);
    }
  }

  handleFetch();
},[])  

// Process batchData into calendar events
const batchEvents = useMemo(() => {
  if (!batchData) return [];

  return batchData
    .filter((batch) => {
      const startDate = new Date(batch.startDate);
      if (isNaN(startDate.getTime())) return false; // Invalid date
      startDate.setHours(0, 0, 0, 0);
      return (
        ((user.role === 'admin' || user.role === 'contractor') ? 
          (batch.teacher === teacher) : 
            user.role === 'teacher' ? 
              (batch.teacher === user.name) : 
                false) &&
        Array.isArray(batch.day) &&
        Array.isArray(batch.time) &&
        batch.day.length === batch.time.length &&
        batch.completed === "No" // Only include non-completed batches
      );
    })
    .flatMap((batch) => {
      const events: CustomEvent[] = [];
      const startDate = new Date(batch.startDate);
      if (isNaN(startDate.getTime())) return events; // Invalid start date

      const endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1); // Assume batch runs for a year

      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      // Iterate over day-time pairs
      batch.day.forEach((day, index) => {
        const dayStr = typeof day === "string" ? day.toLowerCase() : "";
        const time = batch.time[index];
        if (!dayStr || typeof time !== "string") return; // Skip invalid day or time

        const timeMatch = time.match(/^(\d{1,2}):(\d{2})$/);
        if (!timeMatch) return; // Invalid time format

        const [hours, minutes] = timeMatch.slice(1).map(Number);
        if (isNaN(hours) || isNaN(minutes) || hours > 23 || minutes > 59) {
          return; // Invalid hours or minutes
        }

        // Find the day index for the given day name
        const dayIndex = daysOfWeek.findIndex(
          (d) => d.toLowerCase() === dayStr
        );
        if (dayIndex === -1) return; // Invalid day name

        // Iterate from startDate to endDate
        for (
          let date = new Date(startDate);
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          if (date.getDay() === dayIndex) {
            const eventStart = new Date(date);
            eventStart.setHours(hours, minutes, 0, 0);

            const eventEnd = new Date(eventStart);
            eventEnd.setHours(eventEnd.getHours() + 1);

            events.push({
              id: `${batch._id}-${eventStart.toISOString()}-${time}`,
              title: batch.batch,
              start: eventStart,
              end: eventEnd,
              allDay: false,
              extendedProps: {
                type: "batch",
              },
              classNames: ["batch-event"],
              backgroundColor: batch.colorCode || "#3b82f6",
              borderColor: batch.colorCode || "#3b82f6",
            });
          }
        }
      });

      return events;
    });
}, [batchData, teacher, user]);

  // Process demoClassData into calendar events
  const demoEvents = useMemo(() => {
    if (!demoClassData) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return demoClassData
      .filter((demo) => {
        const demoDate = new Date(demo.date);
        if (isNaN(demoDate.getTime())) return false; // Invalid date
        demoDate.setHours(0, 0, 0, 0);
        return (demoDate >= today && 
                typeof demo.time === "string" && 
                ((user.role === 'admin' || user.role === 'contractor') ? 
                  (demo.teacher === teacher) : 
                    user.role === 'teacher' ? 
                      (demo.teacher === user.name) : 
                        false)
                );
      })
      .map((demo) => {
        const demoDate = new Date(demo.date);
        if (isNaN(demoDate.getTime())) return null; // Invalid date

        // Validate time format (HH:mm)
        const timeMatch = demo.time.match(/^(\d{1,2}):(\d{2})$/);
        if (!timeMatch) return null; // Invalid time format

        const [hours, minutes] = timeMatch.slice(1).map(Number);
        if (isNaN(hours) || isNaN(minutes) || hours > 23 || minutes > 59) {
          return null; // Invalid hours or minutes
        }

        demoDate.setHours(hours, minutes, 0, 0);

        const eventEnd = new Date(demoDate);
        eventEnd.setHours(eventEnd.getHours() + 1);

        return {
          id: demo._id,
          title: demo.isCompensationClass === false ? "Demo Class": "Compensation Class",
          start: demoDate,
          end: eventEnd,
          allDay: false,
          extendedProps: {
            type: "demo",
          },
          classNames:  demo.isCompensationClass === false ? ["demo-event"] : ["compensation-event"]
        };
      })
      .filter((event): event is NonNullable<typeof event> => event !== null);
  }, [demoClassData, teacher, user]);

  // Combine all events
  const allEvents = useMemo(() => [...batchEvents, ...demoEvents], [batchEvents, demoEvents]);

  // Handle edge cases
  const handleEdgeCases = () => {
    if (batchError || demoError) return <div>An error occurred while fetching data.</div>;
    if (!batchData || !demoClassData) return <div>Loading...</div>;
    if (allEvents.length === 0) return <div>No events to display.</div>;
    return null;
  };

  return (
    <div className="grid lg:grid-cols-1 grid-cols-1 w-full px-5 justify-start items-start gap-5">
      <div className="flex flex-row justify-center mt-2">
      {(user.role === "admin" || user.role === "contractor") && (<Select value={teacher} onValueChange={(value)=>setTeacher(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Teachers"/>
            </SelectTrigger>
            <SelectContent>
             {teachers.map((teacher)=>(
              <SelectItem value={teacher.name} key={teacher.id}>{teacher.name}</SelectItem>
             ))}
            </SelectContent>
          </Select>)}
      </div>
      <div className="w-full mt-4">
        {handleEdgeCases() || (
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            editable={false}
            selectable={false}
            dayMaxEvents={true}
            events={allEvents}
            slotMinTime="08:00:00" // Start time at 8 AM
            slotMaxTime="23:00:00" // End time at 10 PM
            views={{
              dayGridMonth: {
                titleFormat: { year: "numeric", month: "short" },
              },
              timeGridWeek: {
                titleFormat: {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
                dayHeaderFormat: { weekday: "short" },
              },
              timeGridDay: {
                titleFormat: {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              },
            }}
          />
        )}
      </div>

      <style jsx global>{`
  @media (max-width: 768px) {
    .fc-header-toolbar {
      flex-direction: column;
      gap: 0.5rem;
    }

    .fc-toolbar-chunk {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 0.5rem;
    }

    .fc .fc-button {
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
    }

    .fc-timegrid-axis {
      font-size: 0.7rem;
    }

    .fc-timegrid-slot-label {
      font-size: 0.7rem;
    }

    .fc-daygrid-day-number {
      font-size: 0.8rem;
    }

    .fc-event-title {
      font-size: 0.7rem;
    }

    .fc-col-header-cell-cushion {
      font-size: 0.7rem;
    }

    .fc .demo-event {
      background-color: #ef4444 !important; /* Tailwind red-500 */
      border-color: #ef4444 !important;
      color: white !important;
    }

    .fc .compensation-event {
      background-color: #ef4444 !important; /* Tailwind red-500 */
      border-color: #ef4444 !important;
      color: white !important;
    }

    .fc .batch-event {
      color: white !important;
    }
  }

  /* Apply custom gradient to FullCalendar breadcrumb buttons */
  .fc .fc-button {
    background: linear-gradient(100deg, rgb(65, 177, 199) 26%, rgb(144, 178, 51) 100%) !important;
    border: none !important;
    color: white !important; /* Ensure text is readable */
    transition: opacity 0.2s ease; /* Optional: Smooth hover effect */
  }

  .fc .fc-button:hover {
    opacity: 0.9; /* Optional: Slightly dim on hover */
  }

  .fc .fc-button.fc-button-active {
    background: linear-gradient(100deg, rgb(55, 167, 189) 26%, rgb(134, 168, 41) 100%) !important; /* Slightly darker gradient for active state */
  }

  .fc .fc-button:disabled {
    opacity: 0.5 !important; /* Dim disabled buttons */
    background: linear-gradient(100deg, rgb(65, 177, 199) 26%, rgb(144, 178, 51) 100%) !important; /* Maintain gradient */
  }
`}</style>
    </div>
  );
};

export default CalendarEventsDemo;