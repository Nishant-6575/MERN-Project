export interface SortOption {
  label: string;
  value: string;
}

export const sortOptions: SortOption[] = [
  {
    label: "Newest First",
    value: "-createdAt",
  },
  {
    label: "Oldest First",
    value: "createdAt",
  },
  {
    label: "Name (A-Z)",
    value: "name",
  },
  {
    label: "Name (Z-A)",
    value: "-name",
  },
  {
    label: "Salary (Low to High)",
    value: "salary",
  },
  {
    label: "Salary (High to Low)",
    value: "-salary",
  },
];