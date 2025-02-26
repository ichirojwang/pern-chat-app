import { useState } from "react";

// only one option selected at a time

interface Props {
  options: string[]; // pass in a list of option
  onCheckboxChange: (option: string) => void; // whoever uses this component keeps track of what gets selected
}

const CheckboxGroup = ({ options, onCheckboxChange }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  return (
    <div className="flex">
      {options.map((option) => {
        return (
          <div className="form-control">
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
                  }
                  setSelectedOption(option);
                  onCheckboxChange(option);
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
