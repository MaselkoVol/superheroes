import { ZodError } from "zod";
import { FieldErrors } from "../common/types/error";

export function zodToFieldErrors(error: ZodError) {
  const fieldErrors: FieldErrors = {};

  error.issues.forEach((issue) => {
    const path = issue.path[0] as string;
    if (path && !fieldErrors[path]) {
      fieldErrors[path] = issue.message;
    }
  });

  return fieldErrors;
}
