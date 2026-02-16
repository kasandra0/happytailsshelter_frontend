import "./App.css";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "./components/ui/calendar/calendar";
import React from "react";
import { DatePickerDemo } from "./pages/DatePickerDemo";

function App() {
const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
      <div>
        <h1 className="text-primary text-3xl underline">Hello world!</h1>

        <Button>default</Button>
        <Button variant="outline">outline</Button>
        <Button variant="secondary">secondary</Button>
        <br />
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
    </>
  );
}

export default App;
