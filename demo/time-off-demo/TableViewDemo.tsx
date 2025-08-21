
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableFooter,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FilterTimeOffDemo } from "./FilterTimeOffDemo";
import { TimeOffApprovalDemo } from "./TimeOffApprovalDemo";
import { TimeOffUrl } from "@/constants";
import { getUserSession } from "@/lib/session";
import { leaveType } from "@/types/Types";
import { adjustedNormalLeave, calculateLeaveDays } from "@/lib/helpers";
import { LEAVE_POLICY, teachers } from "@/data/dataStorage";

import React, { useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import axios, { AxiosError } from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";
import { RefreshCcw } from "lucide-react";


const fetcher = (url: string) => axios.get(url, {headers: { Authorization: Cookies.get("token") }}).then((res) => res.data);

const TableViewDemo = () => {
  const { data: leaves = [], error, isLoading, isValidating } = useSWR<leaveType[]>(TimeOffUrl, fetcher);

  const [filters, setFilters] = useState<{ type: string, status: string, fromDate: string }>({ type: "", status: "", fromDate: "" });
  const [employee, setEmployee] = useState("All");
  const [user, setUser] = useState({ role: "", name: "" });

  // Get user session
  useEffect(() => {
    const handleFetch = async () => {
      const user = await getUserSession();
      if (!user.role || !user.name) {
        throw new Error("No user session is found.");
      }
      setUser({ role: user.role, name: user.name });
    };
    handleFetch();
  }, []);

  // Get the teacher name from select or current user
  const targetTeacher = useMemo(() => {
    if (employee && user.role === "admin") {

      // Find the first matching teacher name from leaves
      const matchedLeave = leaves.find((leave) => leave.teacherName === employee )      
      return matchedLeave?.teacherName || "";
    }
    return user.name;
  }, [employee, user, leaves]);

  // Calculate used leave days for both types
  const usedNormalLeaveDays = useMemo(
    () =>
      user.role === "teacher" || (user.role === "admin" && targetTeacher)
        ? calculateLeaveDays(leaves, LEAVE_POLICY.normal.name, targetTeacher)
        : 0,
    [leaves, user, targetTeacher]
  );

  const usedSickLeaveDays = useMemo(
    () =>
      user.role === "teacher" || (user.role === "admin" && targetTeacher)
        ? calculateLeaveDays(leaves, LEAVE_POLICY.sick.name, targetTeacher)
        : 0,
    [leaves, user, targetTeacher]
  );

  const usedHalfLeavesDays = useMemo(
    () =>
      user.role === "teacher" || (user.role === "admin" && targetTeacher)
        ? calculateLeaveDays(leaves, LEAVE_POLICY.half.name, targetTeacher)
        : 0,
    [leaves, user, targetTeacher]
  );

  const usedAdjustedNormalLeaveDays = useMemo(
    () =>
      user.role === "teacher" || (user.role === "admin" && targetTeacher)
        ? adjustedNormalLeave(usedNormalLeaveDays, usedHalfLeavesDays)
        : LEAVE_POLICY.normal.total,
    [usedHalfLeavesDays, usedNormalLeaveDays, user, targetTeacher]
  );

  // Advance Filter logic for leaves leaves
  const filteredData = useMemo(() => {
    if (!leaves) return [];

    return leaves.filter((item) => {
      if (user.role === "teacher" && item.teacherName !== user.name) return false;
      if (filters.type && item.timeOffType !== filters.type) return false;
      if (filters.status && item.status !== filters.status) return false;
      if (
        filters.fromDate &&
        item.dateRange?.from &&
        new Date(item.dateRange?.from) < new Date(filters.fromDate)
      ) return false;
      if(user.role === 'admin' && employee === 'All' && item.teacherName !== employee) return true;
      if ( user.role === 'admin' && item.teacherName !== employee) return false;
      return true;
    });
  }, [leaves, user, filters, employee]);

  // Reset applied filters
  const resetFilters = () => setFilters({ type: "", status: "", fromDate: "" });

  // Handle edge cases
  const handleEdgeCases = () => {
    if (leaves?.length === 0) return <div>Empty list for Leaves</div>;
    if (error instanceof AxiosError) {
      const { message } = error.response?.data;
      return <div>{message || "An unknown error has occurred."}</div>;
    }
    if (isLoading) return <div>Loading...</div>;
    if (isValidating) return <div>Refershing leaves...</div>;
  };

  return (
    <Card className="lg:w-full w-[380px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 mr-2">
          <FilterTimeOffDemo onFilterLeaves={setFilters} />
          {Object.values(filters).some(Boolean) && (
            <Button
              variant="outline"
              className="rounded-full shadow-none"
              onClick={resetFilters}
            >
              <RefreshCcw />
              Reset
            </Button>
          )}
        </div>

        {user.role === 'admin' && (
        <Select onValueChange={(value) => setEmployee(value)} >
          <SelectTrigger>
            <SelectValue placeholder="Filter Employees" />
          </SelectTrigger>
          <SelectContent>
            {teachers.map((item) => (
              <SelectItem value={item.name} key={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      </CardHeader>
      <CardContent className="w-full overflow-x-auto">
        {(error || leaves?.length === 0 || isLoading || isValidating)
        ? handleEdgeCases()
        : (
          <Table>
            <TableCaption>A list of past leaves</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Teacher Name</TableHead>
                <TableHead>Time off type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Total Days</TableHead>
                <TableHead className="text-right">Additional note</TableHead>
                {user.role === "admin" && (<TableHead className="text-right">Manage</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item: leaveType) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.status}</TableCell>
                  <TableCell>{item.teacherName}</TableCell>
                  <TableCell>{item.timeOffType}</TableCell>
                  <TableCell>
                    {item.dateRange?.from ? format(new Date(item.dateRange?.from), "MMM dd, yyyy") : ""}
                  </TableCell>
                  <TableCell>
                    {item.dateRange?.to ? format(new Date(item.dateRange?.to), "MMM dd, yyyy") : ""}
                  </TableCell>
                  <TableCell>
                    {item.dateRange?.from && item.dateRange?.to
                      ? differenceInCalendarDays(
                          new Date(item.dateRange?.to),
                          new Date(item.dateRange?.from)
                        ) + 1
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">{item.notes}</TableCell>
                  {user.role === "admin" && (
                    <TableCell className="text-right">
                      <TimeOffApprovalDemo timeOffId={item._id} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              {user.role === "teacher" || (user.role === "admin" && employee !== 'All') ? 
              (
                <TableRow>
                  <TableCell colSpan={3} className="text-right">
                    {`Normal leave remaining: ${usedAdjustedNormalLeaveDays}`}
                  </TableCell>

                  <TableCell colSpan={3} className="text-right">
                    {`Sick leave remaining: ${LEAVE_POLICY.sick.total - usedSickLeaveDays}`}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>Total Rows</TableCell>
                  <TableCell className="text-right">{filteredData.length}</TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TableViewDemo;
