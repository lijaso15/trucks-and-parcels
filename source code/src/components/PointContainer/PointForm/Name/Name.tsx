import { Field } from "formik";
import React from "react";

interface NameProps {
  name: string;
}

const Name = ({ name }: NameProps) => (
  <Field
    name={name}
    render={({ field /* { name, value, onChange, onBlur } */ }) => {
      return (
        <input
          {...field}
          type="text"
          style={{
            width: field.value
              ? String(String(field.value).length / 2 + 0.5) + "rem"
              : "1rem",
            position: "absolute",
            right: "10%"
          }}
        />
      );
    }}
  />
);

export default Name;
