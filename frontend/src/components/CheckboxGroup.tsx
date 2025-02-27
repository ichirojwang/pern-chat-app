import { useState } from "react";

// only one option selected at a time

interface Props<T extends readonly string[]> {
  options: T;
  onCheckboxChange: (option: T[number] | "") => void;
}

const CheckboxGroup = <T extends readonly string[]>({ options, onCheckboxChange }: Props<T>) => {
  const [selectedOption, setSelectedOption] = useState<T[number] | "">("");
  return (
    <div className="flex">
      {options.map((option) => {
        return (
          <div className="form-control" key={option}>
            <label className={`label gap-2 cursor-pointer`}>
              <span className="label-text">{option}</span>
              <input
                type="checkbox"
                className="checkbox border-slate-900"
                checked={option === selectedOption}
                onChange={() => {
                  if (option === selectedOption) {
                    setSelectedOption("");
                    onCheckboxChange("");
                  } else {
                    setSelectedOption(option);
                    onCheckboxChange(option);
                  }
                }}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};
export default CheckboxGroup;
