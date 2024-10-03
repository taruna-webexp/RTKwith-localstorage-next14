import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Controller } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
const RadioButton = ({
  handleCheckboxChange,
  control,
  selectCheck,
  name,
  radioButtonData,
  errors
}) => {

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Select Your Gender" }}
        render={({ field }) => (
          <RadioGroup
            className="inline-grid grid-cols-3 gap-4"
            aria-labelledby="demo-radio-buttons-group-label"
            {...field}
          >
            {" "}
            {radioButtonData.map((item) => (
              <>
                <FormControlLabel
                  value={item.value}
                  control={
                    <Radio
                      name={name}
                      checked={selectCheck.gender == item.value}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={item.label}
                />
                <br />
              </>
            ))}
          </RadioGroup>
        )}
      />
      
    </>
  );
};

export default RadioButton;
