export const STATUS_LABELS: Record<string, string> = {
  A: "Available",
  X: "Adopted",
  F: "Fostered",
};

export const USER_STATUS: Record<string, string> = {
  A: "Active", // actively accepting fosters
  X: "Inactive", //not accepting fosters
  D: "Disabled", // disabled account
}

export const STATUS_STYLES: Record<string, string> = {
  A: "bg-yellow-100 text-yellow-800",
  X: "bg-gray-100 text-gray-600",
  F: "bg-purple-100 text-purple-800",
};