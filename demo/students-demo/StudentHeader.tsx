'use client'
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

const StudentHeader = () => {
  const pathname = usePathname();
  const {slug} = useParams();

  // Screen name based on routes data
  const routesData = [
  {id:1, path:'/students/studentDashboard', name:'Student Dashboard'},
  {id:2, path:'/students/courseCatalog', name:'My Courses & Course Catalog'},
  {id:3, path:`/students/courses/${slug}`, name:`${slug}`},
  {id:4, path:'/students/assessmentsAndAssignments', name:'Assessments and Assignments'},
  ]

  return (
    <div className="flex items-center justify-between mb-8 lg:px-40">
      <div>
        {routesData.map((item)=>(
          <h1 className="text-2xl font-bold text-gray-900" key={item.id}>
            {item.path === pathname ? item.name : ''}
          </h1>
        ))}
        <p className="text-gray-600">December 15, 2024</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            3
          </Badge>
        </Button>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">3rd Year</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
