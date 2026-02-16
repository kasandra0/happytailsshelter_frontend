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

function App() {
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
      </div>
    </>
  );
}

export default App;
