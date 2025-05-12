"use client"

import type React from "react"

/**
 * Custom hook for using toast notifications
 * Provides a consistent way to show toast notifications across the application
 */
import { useState, useEffect, useCallback } from "react"

const TOAST_TIMEOUT = 5000

type ToastVariant = "default" | "destructive"

export type ToastActionElement = React.ReactElement<any, string>

export type Toast = {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: ToastVariant
}

export type ToastProps = Omit<Toast, "id">

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ ...props }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, ...props }

    setToasts((prevToasts) => [...prevToasts, newToast])

    return id
  }, [])

  const dismiss = useCallback((toastId?: string) => {
    setToasts((prevToasts) => (toastId ? prevToasts.filter((toast) => toast.id !== toastId) : []))
  }, [])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1))
      }, TOAST_TIMEOUT)

      return () => clearTimeout(timer)
    }
  }, [toasts])

  return {
    toast,
    dismiss,
    toasts,
  }
}
