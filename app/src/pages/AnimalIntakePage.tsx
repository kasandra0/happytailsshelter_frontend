import { ManageAnimalForm } from "@/components/form/manageAnimalForm";

export default function AnimalIntakePage() {
    
    return <div>
        <h1 className="text-2xl font-bold">Animal Intake Form</h1>
        <p>Add a new animal to the shelter database here</p>
        <ManageAnimalForm animal={null} onSubmit={() => {throw new Error("Submission not implemented");}} />
    </div>;
}