import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarLayout from "@/layout/SidebarLayout";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import type { Animal } from "@/types/types";

type AdoptFormState = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  reason: string;
  hasPets: "yes" | "no" | "";
  homeType: "House" | "Apartment" | "Other" | "";
};

export default function AdoptPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loadingAnimal, setLoadingAnimal] = useState(true);

  const [form, setForm] = useState<AdoptFormState>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
    hasPets: "",
    homeType: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  function updateField<K extends keyof AdoptFormState>(key: K, value: AdoptFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function loadAnimal() {
      try {
        setLoadingAnimal(true);
        setError(null);
        const res = await api.get<{ data: Animal }>(`/animals/${id}`);
        if (cancelled) return;
        setAnimal(res.data);
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.response?.data?.message || e?.message || "Failed to load animal.");
        }
      } finally {
        if (!cancelled) setLoadingAnimal(false);
      }
    }

    loadAnimal();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) {
      setError("Missing animal id in URL.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccessMsg(null);

      const payload = {
        animalId: id,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        reason: form.reason.trim(),
        hasPets: form.hasPets === "yes",
        homeType: form.homeType,
      };

      await api.post(`/adoptions`, payload);
      setSuccessMsg("Adoption request submitted! We’ll contact you soon.");
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Failed to submit adoption request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SidebarLayout>
      <div className="p-6 max-w-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Adoption Application</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {id ? (
                <>
                  For Animal ID: <span className="font-mono">{id}</span>
                </>
              ) : (
                "No animal selected."
              )}
            </p>

            {loadingAnimal && <p className="mt-2 text-sm">Loading animal details…</p>}

            {!loadingAnimal && animal && (
              <div className="mt-3 rounded-lg border bg-white p-4">
                <p className="font-semibold">{(animal as any).name ?? "Animal"}</p>
                <p className="text-sm text-muted-foreground">
                  {(animal as any).breed ? `Breed: ${(animal as any).breed}` : null}
                  {(animal as any).age !== undefined ? ` • Age: ${(animal as any).age}` : null}
                </p>
              </div>
            )}
          </div>

          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {successMsg && (
          <div className="mt-6 rounded-lg border p-4">
            <p className="text-sm">{successMsg}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="space-y-1">
            <label className="text-sm font-medium">Full name</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input
                className="w-full rounded-lg border px-3 py-2"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Phone</label>
              <input
                className="w-full rounded-lg border px-3 py-2"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Address</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Do you currently have pets?</label>
              <select
                className="w-full rounded-lg border px-3 py-2"
                value={form.hasPets}
                onChange={(e) => updateField("hasPets", e.target.value as any)}
                required
              >
                <option value="">Select…</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Home type</label>
              <select
                className="w-full rounded-lg border px-3 py-2"
                value={form.homeType}
                onChange={(e) => updateField("homeType", e.target.value as any)}
                required
              >
                <option value="">Select…</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Why do you want to adopt?</label>
            <textarea
              className="w-full rounded-lg border px-3 py-2 min-h-[110px]"
              value={form.reason}
              onChange={(e) => updateField("reason", e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={submitting || !id}>
              {submitting ? "Submitting..." : "Submit application"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={submitting}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </SidebarLayout>
  );
}