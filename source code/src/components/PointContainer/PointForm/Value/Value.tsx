import { Field } from "formik";
import React from "react";

interface ValueProps {
  name: string;
  isTruck: boolean;
}

const Value = ({ name, isTruck }: ValueProps) => (
  <Field
    name={name}
    render={({ field /* { name, value, onChange, onBlur } */ }) => {
      return (
        <input
          {...field}
          type="number"
          style={{
            width: field.value
              ? String(String(field.value).length / 2 + 0.5) + "rem"
              : isTruck
              ? "4.5rem"
              : "3.5rem",
            position: "absolute",
            right: "50%"
          }}
          placeholder={isTruck ? "capacity" : "volume"}
        />
      );
    }}
  />
);

export default Value;
