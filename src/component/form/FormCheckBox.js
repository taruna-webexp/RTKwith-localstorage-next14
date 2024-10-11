import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";

export default function FormCheckbox({
  name,
  control,
  label,
  value,
  checkedValue,
  unCheckedValue,
}) {
  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={unCheckedValue}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value === checkedValue}
                onChange={(e) =>
                  field.onChange(
                    e.target.checked ? checkedValue : unCheckedValue
                  )
                }
              />
            }
            label={label}
          />
        )}
      />
    </FormGroup>
  );
}
