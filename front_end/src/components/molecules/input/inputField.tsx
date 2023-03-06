import React, { useState, ChangeEvent } from "react";
import { Input, FormField, Label, HelperText } from "./styles/inputField";

type InputFieldProps = {
  label: string;
  value: string;
  helperText:string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({label, value, helperText, onChange}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };
  return (
    <FormField>
      <Input
        onBlur={handleBlur}
        required
        placeholder="name"
        type="input"
        id="name"
      />
      <Label htmlFor="name">{label}</Label>
      {touched && <HelperText>check label</HelperText>}
    </FormField>
  );
};

export default InputField;
