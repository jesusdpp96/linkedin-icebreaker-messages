"use client"

import type React from "react"

/**
 * Custom hook for form validation
 * Handles common form validation patterns and error messages
 */
import { useState } from "react"

interface ValidationRules {
  required?: boolean
  minLength?: number
  pattern?: RegExp
  match?: string
}

interface ValidationErrors {
  [key: string]: string
}

export function useFormValidation<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setValues((prev) => ({ ...prev, [name]: value }))

    // Clear error when typing if field was previously touched
    if (touched[name] && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  // Mark field as touched
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  // Validate form based on rules
  const validate = (rules: Record<string, ValidationRules>) => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    // Check each field against its rules
    Object.entries(rules).forEach(([fieldName, fieldRules]) => {
      const value = values[fieldName]

      // Required validation
      if (fieldRules.required && (!value || value.trim() === "")) {
        newErrors[fieldName] = "Este campo es obligatorio"
        isValid = false
      }

      // Min length validation
      else if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
        newErrors[fieldName] = `Debe tener al menos ${fieldRules.minLength} caracteres`
        isValid = false
      }

      // Pattern validation
      else if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
        newErrors[fieldName] = "Formato inválido"
        isValid = false
      }

      // Match validation (for password confirmation)
      else if (fieldRules.match && value !== values[fieldRules.match]) {
        newErrors[fieldName] = "Los valores no coinciden"
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  // Reset form to initial values
  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    resetForm,
    setValues,
  }
}
