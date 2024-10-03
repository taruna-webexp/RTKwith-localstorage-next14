import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

const SelectQualification = ({
  control,
  name,
  selectQualification,
  errors,
  handleDropDownChange,
  label,
}) => {
 
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field }) => (
            <>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                {...field}
        
                label={label}
                onChange={(e) => {
                  field.onChange(e);
                  handleDropDownChange(e.target.value);
                }}
              >
                {selectQualification.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                ))}
              </Select>
            </>
          )}
        />
      </FormControl>
      
    </div>
  );
};

export default SelectQualification;
