import * as Yup from "yup";

export type ValidationError<T> = Partial<Record<keyof T, string>>;

export const ValidationForm = async <T>(
  data: T,
  schema: Yup.Schema<T>
): Promise<ValidationError<T>> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return {};
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const newErrors: ValidationError<T> = {};
      err.inner.forEach((e) => {
        if (e.path) {
          newErrors[e.path as keyof T] = e.message;
        }
      });
      return newErrors;
    }
    throw err; // Error lain (misalnya dari network)
  }
};
