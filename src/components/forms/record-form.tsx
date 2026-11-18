"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { FormField } from "@/components/forms/form-field";
import type { FormId } from "@/constants/forms";
import { forms } from "@/constants/forms";
import { AppFrame } from "@/layouts/app-frame";
import { useRecordsStore } from "@/store/use-records-store";
import { validateField, validateFile, validateForm } from "@/utils/validation";
import type { FormValues } from "@/utils/validation";

type RecordFormProps = {
  formId: FormId;
};

export function RecordForm({ formId }: RecordFormProps) {
  const form = forms[formId];
  const router = useRouter();
  const birthDate = useRecordsStore((state) => state.child.birthDate);
  const saveRecord = useRecordsStore((state) => state.saveRecord);
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [submitted, setSubmitted] = useState(false);
  const valuesRef = useRef(values);
  const fileRef = useRef<File | null>(null);
  const timersRef = useRef<number[]>([]);

  function updateValue(name: string, value: string) {
    const nextValues = { ...valuesRef.current, [name]: value };
    valuesRef.current = nextValues;
    setValues(nextValues);

    if (!submitted) {
      return;
    }

    const field = form.fields.find((item) => item.name === name);
    if (!field) {
      return;
    }

    const message =
      field.type === "file"
        ? validateFile(fileRef.current, field.required)
        : validateField(field, nextValues, birthDate);

    setErrors((current) => {
      const next = { ...current };
      if (message) {
        next[name] = message;
      } else {
        delete next[name];
      }
      return next;
    });
  }

  function handleFile(name: string, file: File | null) {
    fileRef.current = file;
    updateValue(name, file?.name ?? "");
  }

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") {
      return;
    }

    setSubmitted(true);
    const nextErrors = validateForm(form.fields, valuesRef.current, birthDate);
    const fileField = form.fields.find((field) => field.type === "file");
    if (fileField) {
      const fileError = validateFile(fileRef.current, fileField.required);
      if (fileError) {
        nextErrors[fileField.name] = fileError;
      }
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = form.fields.find((field) => nextErrors[field.name]);
      if (firstInvalid) {
        document.getElementById(`field-${firstInvalid.name}`)?.focus();
      }
      return;
    }

    setStatus("submitting");
    timersRef.current.push(
      window.setTimeout(() => {
        saveRecord(formId, normalize(valuesRef.current));
        setStatus("success");
        timersRef.current.push(
          window.setTimeout(() => {
            router.push(form.returnTo);
          }, 700),
        );
      }, 400),
    );
  }

  const submitLabel =
    status === "submitting"
      ? "Сохранение…"
      : status === "success"
        ? "Сохранено"
        : "Сохранить";

  return (
    <AppFrame>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          minWidth: 0,
          px: { xs: "14px", sm: "18px" },
          py: { xs: "16px", sm: "20px" },
          width: "100%",
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: "text.primary",
            fontSize: { xs: 18, sm: 19 },
            fontWeight: 700,
            lineHeight: "23px",
            overflowWrap: "anywhere",
          }}
        >
          {form.title}
        </Typography>
        <Typography
          component="p"
          sx={{
            color: "text.secondary",
            fontSize: 11,
            lineHeight: "13px",
            m: 0,
          }}
        >
          {form.description}
        </Typography>
        {status === "success" ? (
          <Typography
            component="p"
            role="status"
            sx={{ color: "primary.main", fontSize: 12, m: 0 }}
          >
            Запись сохранена
          </Typography>
        ) : null}
        {Object.keys(errors).length > 0 ? (
          <Typography
            component="p"
            role="alert"
            color="error"
            sx={{ fontSize: 12, m: 0 }}
          >
            Проверьте выделенные поля. Запись не сохранена.
          </Typography>
        ) : null}
        {form.fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={values[field.name] ?? ""}
            error={errors[field.name]}
            onChange={(value) => updateValue(field.name, value)}
            onFile={(file) => handleFile(field.name, file)}
          />
        ))}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "8px",
            width: "100%",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disableElevation
            disabled={status !== "idle"}
            sx={{
              bgcolor: "primary.main",
              borderRadius: "11px",
              flex: { sm: "1.5 1 0" },
              fontSize: 13,
              fontWeight: 600,
              minHeight: 44,
              textTransform: "none",
              "&:hover": { bgcolor: "#628a76" },
            }}
          >
            {submitLabel}
          </Button>
          <Button
            type="button"
            variant="contained"
            disableElevation
            disabled={status !== "idle"}
            onClick={() => router.push(form.returnTo)}
            sx={{
              bgcolor: "#e8f1eb",
              borderRadius: "11px",
              color: "#557764",
              flex: { sm: "1 1 0" },
              fontSize: 13,
              fontWeight: 600,
              minHeight: 44,
              textTransform: "none",
              "&:hover": { bgcolor: "#dce8e0" },
            }}
          >
            Отмена
          </Button>
        </Box>
      </Box>
    </AppFrame>
  );
}

function normalize(values: FormValues): FormValues {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()]),
  );
}
