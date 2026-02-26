import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { DatePickerDemo } from "./DatePickerDemo";

function Demo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
      <div className="flex flex-1 flex-col gap-4 p-4 items-center">
        <h3>This page has not been implemented yet. This is Demo Page</h3>
        <Button>default</Button>
        <Button variant="outline">outline</Button>
        <Button variant="secondary">secondary</Button>
        <br />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="fosterparent">Foster Parent</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <br />

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />

        <DatePickerDemo />
      </div>
  );
}

export default Demo;
