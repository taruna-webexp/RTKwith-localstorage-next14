import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
const InputField = ({
  control,
  label,
  name,
  type,
  className,
  value,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={name} className="block"></label>
      <Controller
        defaultValue=""
        control={control}
        rules={{
          required: "Name Must Be Fill",
        }}
        name={name}
        render={({ field }) => (
          <TextField
            type={type}
            value={value}
            className={className}
            label={label}
            name={name}
            placeholder={placeholder}
            {...field}
          />
        )}
      />
    </>
  );
};

export default InputField;
