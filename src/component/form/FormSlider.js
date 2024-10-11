import { Slider, FormControl, FormLabel } from "@mui/material";
import { Controller } from "react-hook-form";

export default function FormSlider({
  name,
  control,
  label,
  defaultValue,
  marks,
  min,
  max,
  step,
  valueLabelDisplay = "auto",
}) {
  return (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Slider
            {...field}
            value={field.value || defaultValue}
            onChange={(_, value) => field.onChange(value)}
            valueLabelDisplay={valueLabelDisplay}
            marks={marks}
            min={min}
            max={max}
            step={step}
          />
        )}
      />
    </FormControl>
  );
}
