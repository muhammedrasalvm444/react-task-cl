import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { Controller } from "react-hook-form";

function CustomInputField({ name, control, redStar, ...others }) {
  // // };

  return (
    <div {...others} redStar={redStar}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Form.Input
            value={value}
            onChange={onChange}
            size="large"
            {...others}
          />
        )}
      />
    </div>
  );
}

export default CustomInputField;
