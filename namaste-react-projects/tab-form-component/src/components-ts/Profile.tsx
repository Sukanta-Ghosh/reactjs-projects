import React, { ChangeEvent } from "react";
import { TabComponentsProps } from "./types";

const Profile: React.FC<TabComponentsProps> = ({
  formData,
  setFormData,
  formError,
}) => {
  const { name, age, email } = formData;

  // config
  const fieldConfig = [
    {
      label: "Name",
      type: "text",
      name: "name",
      value: name,
    },
    {
      label: "Age",
      type: "number",
      name: "age",
      value: age,
    },
    {
      label: "Email",
      type: "text",
      name: "email",
      value: email,
    },
  ];

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      {fieldConfig.map((config, idx) => (
        <div key={idx}>
          <label>{config.label}:</label>
          <input
            name={config.name}
            type={config.type}
            value={config.value}
            onChange={handleFieldChange}
          />
          {formError[config.name] && (
            <span className="error">{formError[config.name]}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Profile;
