import { ActionState, FieldErrors } from "@/lib/create-safe-actions";
import { useCallback, useState } from "react";

type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

interface useActionProps<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: useActionProps<TOutput> = {},
) => {
  const [fieldErrors, setFieldError] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);

  const [data, setData] = useState<TOutput | undefined>(undefined);

  const [error, setError] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (data: TInput) => {
      setIsLoading(true);

      try {
        const result = await action(data);

        if (!result) {
          return;
        }

        setFieldError(result.fieldErrors);

        if (result.errors) {
          setError(result.errors);

          options.onError?.(result.errors);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false), options.onComplete?.();
      }
    },
    [action, options],
  );

  return {
    execute,
    data,
    error,
    fieldErrors,
    isLoading,
  };
};
