import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, BookOpen, Search, Filter, Clock, Users } from "lucide-react"

export function CourseCatalog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Courses filter section  */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search courses..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Enrolled Courses</CardTitle>
                <Badge variant="secondary">4 Courses</Badge>
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
                          75% Complete
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2">Object Oriented Programming</h3>
                      <p className="text-sm text-gray-600 mb-3">Learn the fundamentals of OOP concepts</p>
                      <div className="w-full bg-purple-200 rounded-full h-2 mb-4">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          12 weeks
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          45 students
                        </span>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Continue Course</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-200 bg-indigo-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                          60% Complete
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2">Database Systems</h3>
                      <p className="text-sm text-gray-600 mb-3">Fundamentals of database design and SQL</p>
                      <div className="w-full bg-indigo-200 rounded-full h-2 mb-4">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          14 weeks
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          38 students
                        </span>
                      </div>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Continue Course</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          90% Complete
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2">Data Structures</h3>
                      <p className="text-sm text-gray-600 mb-3">Advanced data structures and algorithms</p>
                      <div className="w-full bg-green-200 rounded-full h-2 mb-4">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          16 weeks
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          52 students
                        </span>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">Continue Course</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          30% Complete
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2">Web Development</h3>
                      <p className="text-sm text-gray-600 mb-3">Modern web development with React</p>
                      <div className="w-full bg-orange-200 rounded-full h-2 mb-4">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          10 weeks
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          67 students
                        </span>
                      </div>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">Continue Course</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Available Courses</CardTitle>
                <Button variant="link" className="text-purple-600">
                  View All Catalog
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Card className="border-blue-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="lg:flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Machine Learning Fundamentals</h3>
                            <p className="text-sm text-gray-600 mb-2">Introduction to ML algorithms and applications</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                12 weeks
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                25 spots left
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-2">Advanced</Badge>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="lg:flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Mobile App Development</h3>
                            <p className="text-sm text-gray-600 mb-2">Build native mobile apps with React Native</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                14 weeks
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                18 spots left
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-2">Intermediate</Badge>
                          <Button className="w-full bg-teal-600 hover:bg-teal-700">Enroll Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-rose-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="lg:flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-rose-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Cybersecurity Essentials</h3>
                            <p className="text-sm text-gray-600 mb-2">Learn network security and ethical hacking</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                10 weeks
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                32 spots left
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-2">Beginner</Badge>
                          <Button className="w-full bg-rose-600 hover:bg-rose-700">Enroll Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Course Updates</CardTitle>
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
                        <h4 className="font-medium text-sm">New Assignment Posted</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          Database Systems - Final project requirements uploaded
                        </p>
                        <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-sm">Course Material Updated</h4>
                        <p className="text-xs text-gray-600 mt-1">OOP - New lecture slides for Chapter 8 available</p>
                        <p className="text-xs text-gray-400 mt-2">1 day ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-sm">Registration Reminder</h4>
                        <p className="text-xs text-gray-600 mt-1">Spring semester course registration opens soon</p>
                        <p className="text-xs text-gray-400 mt-2">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Course Notifications</CardTitle>
                <Badge variant="destructive">3</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <Bell className="w-4 h-4 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Assignment Due Soon</h4>
                      <p className="text-xs text-gray-600 mt-1">OOP Assignment #3 due in 2 days</p>
                      <Button variant="link" className="text-xs p-0 h-auto text-red-600">
                        View Assignment
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <BookOpen className="w-4 h-4 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">New Course Available</h4>
                      <p className="text-xs text-gray-600 mt-1">AI Ethics course now open for enrollment</p>
                      <Button variant="link" className="text-xs p-0 h-auto text-orange-600">
                        View Course
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Study Group Invitation</h4>
                      <p className="text-xs text-gray-600 mt-1">Join Database Systems study group</p>
                      <Button variant="link" className="text-xs p-0 h-auto text-blue-600">
                        Join Group
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
