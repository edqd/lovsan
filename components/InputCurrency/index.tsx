import React, { useState } from "react";

export const InputCurrency: React.FC<{
  onSubmit: (value: number) => void;
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
        }
      }}
    >
      <input
        type="number"
        data-testid="amount-input"
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
      ></input>
      <button data-testid="amount-submit" type="submit">Calculate</button>
      {field.error && field.dirty && <div>{field.error}</div>}
    </form>
  );
};

export default InputCurrency;
