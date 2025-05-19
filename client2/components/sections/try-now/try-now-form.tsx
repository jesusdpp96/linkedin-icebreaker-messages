"use client";

import type React from "react";

/**
 * Try now form component
 * Displays the form for generating messages
 */
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { AutoResizeTextarea } from "@/components/shared/auto-resize-textarea";
import { buttonStyles } from "@/utils/styles";
import { usePostHog } from "posthog-js/react";

interface TryNowFormProps {
  formData: {
    senderLinkedIn: string;
    problem: string;
    solution: string;
    receiverLinkedIn: string;
  };
  formErrors: {
    senderLinkedIn: string;
    receiverLinkedIn: string;
  };
  availableGenerations: number;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: FormEvent) => void;
}

export function TryNowForm({
  formData,
  formErrors,
  availableGenerations,
  onInputChange,
  onSubmit,
}: TryNowFormProps) {
  const posthog = usePostHog();
  const [formStarted, setFormStarted] = useState(false);
  const [completedFields, setCompletedFields] = useState<string[]>([]);
  const [formStartTime, setFormStartTime] = useState<number | null>(null);

  // Track when form is started
  const handleFieldFocus = (fieldName: string) => {
    if (!formStarted) {
      setFormStarted(true);
      setFormStartTime(Date.now());
      posthog.capture("form_start", {
        first_field: fieldName,
      });
    }
  };

  // Track when a field is completed
  const handleFieldBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (value && !completedFields.includes(name)) {
      posthog.capture("form_field_complete", {
        field_name: name,
      });
      setCompletedFields((prev) => [...prev, name]);
    }

    // Check if all fields are completed
    const allFields = [
      "senderLinkedIn",
      "problem",
      "solution",
      "receiverLinkedIn",
    ];
    const updatedCompletedFields = [...completedFields];
    if (value && !updatedCompletedFields.includes(name)) {
      updatedCompletedFields.push(name);
    }

    if (updatedCompletedFields.length === allFields.length && formStartTime) {
      const timeToComplete = Date.now() - formStartTime;
      posthog.capture("form_complete", {
        time_to_complete: timeToComplete,
      });
    }
  };

  // Custom input change handler that wraps the provided handler
  const handleInputChangeWithTracking = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onInputChange(e);
  };

  // Custom submit handler that wraps the provided handler
  const handleSubmitWithTracking = (e: FormEvent) => {
    // Track form submission
    const allFieldsComplete = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    posthog.capture("generate_message_request", {
      form_data_complete: allFieldsComplete,
    });

    onSubmit(e);
  };

  return (
    <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm hover:bg-zinc-800/80 transition-colors">
      <CardContent className="p-6">
        <form onSubmit={handleSubmitWithTracking} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="senderLinkedIn" className="text-white">
              Tu perfil de LinkedIn
            </Label>
            <Input
              id="senderLinkedIn"
              name="senderLinkedIn"
              placeholder="https://linkedin.com/in/tu-perfil"
              value={formData.senderLinkedIn}
              onChange={handleInputChangeWithTracking}
              onFocus={() => handleFieldFocus("senderLinkedIn")}
              onBlur={handleFieldBlur}
              className="bg-zinc-900/50 border-zinc-700 text-white"
              required
            />
            {formErrors.senderLinkedIn && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.senderLinkedIn}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem" className="text-white">
              Problema que resuelves
            </Label>
            <AutoResizeTextarea
              id="problem"
              name="problem"
              placeholder="Describe el problema que tu producto o servicio resuelve..."
              value={formData.problem}
              onChange={handleInputChangeWithTracking}
              onFocus={() => handleFieldFocus("problem")}
              onBlur={handleFieldBlur}
              className="bg-zinc-900/50 border-zinc-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution" className="text-white">
              Solución que ofreces
            </Label>
            <AutoResizeTextarea
              id="solution"
              name="solution"
              placeholder="Describe cómo tu producto o servicio soluciona el problema..."
              value={formData.solution}
              onChange={handleInputChangeWithTracking}
              onFocus={() => handleFieldFocus("solution")}
              onBlur={handleFieldBlur}
              className="bg-zinc-900/50 border-zinc-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiverLinkedIn" className="text-white">
              Perfil de LinkedIn del destinatario
            </Label>
            <Input
              id="receiverLinkedIn"
              name="receiverLinkedIn"
              placeholder="https://linkedin.com/in/destinatario"
              value={formData.receiverLinkedIn}
              onChange={handleInputChangeWithTracking}
              onFocus={() => handleFieldFocus("receiverLinkedIn")}
              onBlur={handleFieldBlur}
              className="bg-zinc-900/50 border-zinc-700 text-white"
              required
            />
            {formErrors.receiverLinkedIn && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.receiverLinkedIn}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className={`${buttonStyles.primary} ${buttonStyles.fullWidth}`}
            size="lg"
            disabled={availableGenerations <= 0}
          >
            {availableGenerations > 0
              ? "Generar mensaje"
              : "Sin generaciones disponibles"}
          </Button>

          {availableGenerations <= 0 && (
            <p className="text-center text-amber-400 text-sm mt-2">
              Has agotado tus generaciones gratuitas. ¡Regístrate para obtener
              más!
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
