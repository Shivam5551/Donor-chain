import React from "react";
import { State } from "country-state-city";

interface SelectStateProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectState: React.FC<SelectStateProps> = ({ value, onChange }) => {
  const states = State.getStatesOfCountry("IN"); // Fetching Indian states dynamically

  return (
    <select
      className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={onChange}
    >
      <option value="">Select a state</option>
      {states.map((state) => (
        <option key={state.isoCode} value={state.name}>
          {state.name}
        </option>
      ))}
    </select>
  );
};

export default SelectState;
