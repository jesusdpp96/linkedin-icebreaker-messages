"use client";

import type React from "react";

import { useState, useCallback } from "react";
import type { FormData } from "../types";

export const useForm = (initialState: FormData) => {
  const [values, setValues] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});

  const validateUrl = (url: string): boolean => {
    const linkedinRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9%\-]+\/?$/;
    return linkedinRegex.test(url);
  };

  const validateField = useCallback((name: keyof FormData, value: string) => {
    let error = "";

    if (!value.trim()) {
      error = "Este campo es obligatorio";
    } else if (
      (name === "senderUrl" || name === "receiverUrl") &&
      !validateUrl(value)
    ) {
      error = "URL de LinkedIn no válida";
    }

    return error;
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    []
  );

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;
    (Object.keys(values) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  const isFormValid = useCallback(() => {
    return (
      Object.values(values).every((value) => value.trim() !== "") &&
      validateUrl(values.senderUrl) &&
      validateUrl(values.receiverUrl)
    );
  }, [values]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    isFormValid,
  };
};
