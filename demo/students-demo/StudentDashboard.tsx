import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, BookOpen, Calendar, FileText, MessageSquare } from "lucide-react"
import { STUDENT_PROFILE } from "@/constants/images"
import Image from "next/image"

export function StudentDashboard() {
  return (
      <div className="max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <Card className="mb-8 bg-custom-gradient text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
                <p className="text-purple-100">Always stay updated in your student portal</p>
              </div>
              <div className="w-32 h-32">
                <Image
                  src={STUDENT_PROFILE}
                  height={500}
                  width={500}
                  alt="Student illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Links Section */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent hover:bg-purple-50">
                    <FileText className="w-6 h-6 text-purple-600" />
                    <span className="text-sm">Assignments</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent hover:bg-purple-50">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    <span className="text-sm">Grades</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent hover:bg-purple-50">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                    <span className="text-sm">Messages</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent hover:bg-purple-50">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    <span className="text-sm">Schedule</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enrolled Courses Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Current Enrolled Courses</CardTitle>
                <Button variant="link" className="text-purple-600">
                  See all
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          In Progress
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2">Object Oriented Programming</h3>
                      <p className="text-sm text-gray-600 mb-4">Learn the fundamentals of OOP concepts</p>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">View Course</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-200 bg-indigo-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                          In Progress
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2">Database Systems</h3>
                      <p className="text-sm text-gray-600 mb-4">Fundamentals of database design and SQL</p>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">View Course</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Classes & Deadlines Section */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Classes & Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Database Systems Lab</h4>
                      <p className="text-sm text-gray-600">Today, 2:00 PM - Room 301</p>
                    </div>
                    <Badge variant="destructive">Due Today</Badge>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">OOP Assignment #3</h4>
                      <p className="text-sm text-gray-600">Due: December 18, 2024</p>
                    </div>
                    <Badge variant="secondary">3 days left</Badge>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Data Structures Lecture</h4>
                      <p className="text-sm text-gray-600">Tomorrow, 10:00 AM - Room 205</p>
                    </div>
                    <Badge variant="outline">Tomorrow</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-8">
            {/* Recent Announcements Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Announcements</CardTitle>
                <Button variant="link" className="text-purple-600">
                  See all
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-sm">Semester Break Notice</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          Winter break starts December 20th. Classes resume January 8th.
                        </p>
                        <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-sm">Library Hours Extended</h4>
                        <p className="text-xs text-gray-600 mt-1">Library will be open 24/7 during finals week.</p>
                        <p className="text-xs text-gray-400 mt-2">1 day ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-sm">New Course Registration</h4>
                        <p className="text-xs text-gray-600 mt-1">Spring semester registration opens January 2nd.</p>
                        <p className="text-xs text-gray-400 mt-2">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications Panel Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Notifications Panel</CardTitle>
                <Badge variant="destructive">3</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <Bell className="w-4 h-4 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Payment Reminder</h4>
                      <p className="text-xs text-gray-600 mt-1">Tuition payment due in 5 days</p>
                      <Button variant="link" className="text-xs p-0 h-auto text-red-600">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <Calendar className="w-4 h-4 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Exam Schedule</h4>
                      <p className="text-xs text-gray-600 mt-1">Final exams start December 22nd</p>
                      <Button variant="link" className="text-xs p-0 h-auto text-orange-600">
                        View Schedule
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">New Message</h4>
                      <p className="text-xs text-gray-600 mt-1">Message from Prof. Smith about assignment</p>
                      <Button variant="link" className="text-xs p-0 h-auto text-blue-600">
                        Read Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}
