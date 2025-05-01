import React, { ChangeEvent } from "react";
import { SettingsFieldConfig, TabComponentsProps } from "./types";

const Settings: React.FC<TabComponentsProps> = ({ formData, setFormData }) => {
  const { theme } = formData;

  const fieldConfig: SettingsFieldConfig[] = [
    {
      label: "Dark",
      type: "radio",
      name: "dark",
    },
    {
      label: "Light",
      type: "radio",
      name: "light",
    },
  ];

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setFormData((formData) => ({
      ...formData,
      theme: name,
    }));
  };

  return (
    <div>
      {fieldConfig.map((config, idx) => (
        <div key={idx}>
          <input
            type={config.type}
            name={config.name}
            checked={theme === config.name}
            onChange={handleFieldChange}
          />
          <label>{config.label}</label>
        </div>
      ))}
    </div>
  );
};

export default Settings;
