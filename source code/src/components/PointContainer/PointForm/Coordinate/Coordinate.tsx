import { Field } from "formik";
import React from "react";

interface CoordinateProps {
  name: string;
}

const Coordinate = ({ name }: CoordinateProps) => (
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
              : "1rem"
          }}
        />
      );
    }}
  />
);

export default Coordinate;
