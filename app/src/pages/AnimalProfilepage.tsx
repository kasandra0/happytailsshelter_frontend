import { Button } from "@/components/ui/button";

export function AnimalProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        
        <h1 className="text-3xl font-bold text-center">
          Rubby
        </h1>

        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><strong>Breed:</strong> Yorkie</p>
          <p><strong>Age:</strong> 7 months old</p>
          <p><strong>Gender:</strong> female</p>
          <p><strong>Status:</strong> Available for Adoption</p>
        </div>

        <p className="text-gray-600 leading-relaxed">
          Rubby is a playful and affectionate Yorkie who loves being around
          people, she enjoys short walks, cuddles, and treats.
        </p>

        <Button className="w-full">
          Apply to Adopt
        </Button>

      </div>

    </div>
  );
}
