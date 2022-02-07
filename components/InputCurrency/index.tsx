import Btn from "components/Btn";
import React, { useState } from "react";
import { Input, Error } from "./Input";

export const InputCurrency: React.FC<{
  onSubmit: (value?: number) => void;
  validate: (val?: number) => string | undefined;
}> = ({ onSubmit, validate }) => {
  // in real world this would have probably been react-final-form/formik etc
  const [field, setField] = useState<{
    value: number | undefined;
    dirty: boolean;
    error?: string;
  }>({ value: undefined, dirty: false, error: validate() });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (field.error && !field.dirty) {
          setField((prev) => ({
            ...prev,
            dirty: true,
          }));
        }
        if (!field.error && field.value) {
          onSubmit(field.value);
        } else {
          // erase previous result on bad submit
          onSubmit();
        }
      }}
    >
      <Input
        type="number"
        data-testid="amount-input"
        placeholder="69420"
        onChange={(e) =>
          setField((prev) => {
            const value = parseFloat(e.target.value);
            return {
              ...prev,
              value,
              error: validate(value),
            };
          })
        }
      ></Input>
      <Btn data-testid="amount-submit" type="submit">
        Calculate
      </Btn>
      {field.error && field.dirty && <Error>{field.error}</Error>}
    </form>
  );
};

export default InputCurrency;
