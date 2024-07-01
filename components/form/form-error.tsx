import { XCircle } from "lucide-react";

interface FormErrorProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormError = ({ id, errors }: FormErrorProps) => {
  if (!errors) {
    return null;
  }

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-sm text-rose-600"
    >
      {errors?.[id]?.map((error) => (
        <div
          key={error}
          className="flex items-center rounded-xl border border-rose-500 bg-rose-500/10 p-2 font-medium"
        >
          <XCircle className="mr-2 size-4" />
          {error}
        </div>
      ))}
    </div>
  );
};
