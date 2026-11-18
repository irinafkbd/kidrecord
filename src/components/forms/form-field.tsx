"use client";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { FieldConfig } from "@/constants/forms";

type FormFieldProps = {
  field: FieldConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onFile: (file: File | null) => void;
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#f6f8f5",
    borderRadius: "10px",
    fontSize: 16,
    minHeight: 44,
  },
  "& .MuiOutlinedInput-input": {
    py: "12px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e4eae5",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#729b86",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#729b86",
  },
  "& .MuiFormHelperText-root": {
    mx: 0,
    overflowWrap: "anywhere",
  },
} as const;

export function FormField({
  field,
  value,
  error,
  onChange,
  onFile,
}: FormFieldProps) {
  const inputId = `field-${field.name}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minWidth: 0,
        width: "100%",
      }}
    >
      <Typography
        component="label"
        htmlFor={field.type === "file" ? undefined : inputId}
        id={`${inputId}-label`}
        sx={{
          color: "text.secondary",
          fontSize: 11,
          fontWeight: 500,
          lineHeight: "13px",
        }}
      >
        {field.label}
      </Typography>
      {field.type === "file" ? (
        <FileControl
          id={inputId}
          labelId={`${inputId}-label`}
          value={value}
          placeholder={field.placeholder}
          error={error}
          onFile={onFile}
        />
      ) : (
        <TextField
          id={inputId}
          name={field.name}
          value={value}
          error={Boolean(error)}
          helperText={error}
          placeholder={field.type === "select" ? undefined : field.placeholder}
          required={field.required}
          fullWidth
          select={field.type === "select"}
          type={inputType(field.type)}
          onChange={(event) => onChange(event.target.value)}
          slotProps={{
            htmlInput: {
              "aria-invalid": Boolean(error),
              min: field.min,
              max: field.max,
              step: field.type === "number" ? "0.1" : undefined,
              inputMode: field.type === "number" ? "decimal" : undefined,
            },
            select:
              field.type === "select" ? { displayEmpty: true } : undefined,
          }}
          sx={fieldSx}
        >
          {field.type === "select"
            ? [
                <MenuItem key="" value="" disabled>
                  {field.placeholder}
                </MenuItem>,
                ...(field.options ?? []).map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                )),
              ]
            : null}
        </TextField>
      )}
    </Box>
  );
}

function inputType(type: FieldConfig["type"]): string {
  switch (type) {
    case "date":
      return "date";
    case "datetime":
      return "datetime-local";
    case "number":
      return "text";
    case "email":
      return "email";
    default:
      return "text";
  }
}

type FileControlProps = {
  id: string;
  labelId: string;
  value: string;
  placeholder: string;
  error?: string;
  onFile: (file: File | null) => void;
};

function FileControl({
  id,
  labelId,
  value,
  placeholder,
  error,
  onFile,
}: FileControlProps) {
  return (
    <Box>
      <Box
        component="label"
        htmlFor={id}
        sx={{
          alignItems: "center",
          bgcolor: "#f6f8f5",
          border: "1px solid",
          borderColor: error ? "error.main" : "#e4eae5",
          borderRadius: "10px",
          color: value ? "text.primary" : "#a0aaa4",
          cursor: "pointer",
          display: "flex",
          fontSize: 16,
          minHeight: 44,
          overflowWrap: "anywhere",
          position: "relative",
          px: "12px",
          py: "12px",
          width: "100%",
          "& input": {
            clipPath: "inset(50%)",
            height: 1,
            overflow: "hidden",
            position: "absolute",
            whiteSpace: "nowrap",
            width: 1,
          },
        }}
      >
        {value || placeholder}
        <input
          id={id}
          type="file"
          aria-labelledby={labelId}
          aria-invalid={Boolean(error)}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,application/pdf,image/*"
          onChange={(event) => onFile(event.target.files?.[0] ?? null)}
        />
      </Box>
      {error ? (
        <Typography
          component="p"
          color="error"
          sx={{ fontSize: 12, mt: "4px", overflowWrap: "anywhere" }}
        >
          {error}
        </Typography>
      ) : null}
    </Box>
  );
}
