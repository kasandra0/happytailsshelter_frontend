import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function AnimalIntakePage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Animal Intake</h2>
          <p className="text-sm text-muted-foreground">
            Add a new animal to the shelter database.
          </p>
        </div>

        <Button asChild variant="outline">
          <NavLink to="/animals">Back to Listing</NavLink>
        </Button>
      </div>

      <div className="container mx-auto py-10">
        <div className="rounded-md border p-6">
          <h3 className="text-lg font-semibold">Intake Form</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            This page is under construction. Please check back later.
          </p>

          <div className="mt-6 flex gap-2">
            <Button disabled>Save Animal</Button>
            <Button disabled variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}