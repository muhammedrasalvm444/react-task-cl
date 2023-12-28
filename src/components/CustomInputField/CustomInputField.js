import React from "react";
import { Form } from "semantic-ui-react";
import { Controller } from "react-hook-form";
import "./style.css";

function CustomInputField({ name, control, redStar, error, ...others }) {
  return (
    <div className={`input_class ${error ? "error" : ""}`}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <React.Fragment>
            <Form.Input
              value={value}
              onChange={onChange}
              size="large"
              width="100%" // Set the width to 100%

              {...others}
            />
            {error && (
              <p className="error-message">{error}</p>
            )}
          </React.Fragment>
        )}
      />
    </div>
  );
}

export default CustomInputField;

