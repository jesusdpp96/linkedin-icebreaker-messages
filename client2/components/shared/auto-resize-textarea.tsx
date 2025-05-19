"use client";

/**
 * Auto-resize textarea component
 * Automatically adjusts height based on content
 */
import { useRef, useEffect, type ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";

interface AutoResizeTextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxRows?: number;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
}

export function AutoResizeTextarea({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  maxRows = 7,
  className,
  id,
  name,
  required = false,
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";

    // Calculate line height from computed styles
    const lineHeight =
      Number.parseInt(window.getComputedStyle(textarea).lineHeight) || 24;

    // Calculate max height based on maxRows
    const maxHeight = lineHeight * maxRows;

    // Set the height based on scrollHeight, but cap it at maxHeight
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;

    // Add overflow if content exceeds maxHeight
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  // Resize on value change
  useEffect(() => {
    resizeTextarea();
  }, [value]);

  // Initial resize on mount
  useEffect(() => {
    resizeTextarea();
  }, []);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e);
        resizeTextarea();
      }}
      onFocus={(e) => {
        onFocus(e);
      }}
      onBlur={(e) => {
        onBlur(e);
      }}
      placeholder={placeholder}
      className={className}
      id={id}
      name={name}
      required={required}
      rows={1}
      style={{ resize: "none", overflowY: "hidden", minHeight: "2.5rem" }}
    />
  );
}
