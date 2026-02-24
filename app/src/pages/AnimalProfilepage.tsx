import { Button } from "@/components/ui/button";
import type { Animal } from "@/types/animal";

interface AnimalProfilePageProps {
  animal: Animal;
}

export function AnimalProfilePage({ animal }: AnimalProfilePageProps) {
  const title = animal.name ?? "Unnamed Animal";
  const status = (animal as unknown as { status?: string }).status ?? "Status Unknown";
  const breed = (animal as unknown as { breed?: string }).breed ?? "Unknown";
  const age = (animal as unknown as { age?: string }).age ?? "Unknown";
  const gender = (animal as unknown as { gender?: string }).gender ?? "Unknown";
  const description =
    (animal as unknown as { description?: string }).description ??
    "No description available yet.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 sm:p-10 space-y-8 border border-gray-100">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>

          <div className="flex justify-center">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
              {status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Breed
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {breed}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Age
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {age}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Gender
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900 capitalize">
              {gender}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Adoption
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              Ready to meet you
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Submit an application to start the adoption process.
            </p>
          </div>
        </div>

        <section className="rounded-2xl border border-gray-100 bg-white p-0">
          <div className="rounded-2xl bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              About {title}
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {description}
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {"color" in (animal as object) && (
                <div className="rounded-lg border border-gray-100 bg-white p-3">
                  <p className="text-gray-500">Color</p>
                  <p className="font-medium text-gray-900">
                    {String((animal as unknown as { color?: string }).color ?? "Unknown")}
                  </p>
                </div>
              )}

              {"location" in (animal as object) && (
                <div className="rounded-lg border border-gray-100 bg-white p-3">
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">
                    {String((animal as unknown as { location?: string }).location ?? "Unknown")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="space-y-3">
          <Button className="w-full py-6 text-lg font-semibold rounded-xl transition-transform hover:scale-[1.01] active:scale-[0.99]">
            Apply to Adopt {title}
          </Button>

          <p className="text-center text-xs text-gray-500">
            By applying, you’re taking the first step toward giving {title} a loving home.
          </p>
        </div>
      </div>
    </div>
  );
}