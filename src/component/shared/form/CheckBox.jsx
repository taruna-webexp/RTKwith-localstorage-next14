import React from "react";
import { Checkbox } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Controller } from "react-hook-form";
const CheckBox = ({ name, checkBoxdata, control,errors }) => {
  return (
    <FormGroup className="inline-grid grid-cols-3 gap-4">
      {checkBoxdata.map((item, index) => (
        <>
          <Controller
            key={item.value}
            control={control}
            defaultValue={index === 0 ? true : false}
            name={`${name}[${item.value}]`}
            // rules={{ required: "Select The language" }}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      value={item.value}
                    />
                  }
                  label={item.label}
                />
              </>
            )}
          />
          
        </>
      ))}
    </FormGroup>
  );
};

export default CheckBox;
