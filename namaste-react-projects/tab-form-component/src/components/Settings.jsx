const Settings = ({ formData, setFormData }) => {
  const { theme } = formData;
  const fieldConfig = [
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

  const handleFieldChange = (e) => {
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
