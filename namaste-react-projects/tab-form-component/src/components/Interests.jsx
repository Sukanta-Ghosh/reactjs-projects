const Interests = ({ formData, setFormData, formError }) => {
  const { interests } = formData;

  // config
  const fieldConfig = [
    {
      label: "Coding",
      type: "checkbox",
      name: "coding",
    },
    {
      label: "Music",
      type: "checkbox",
      name: "music",
    },
    {
      label: "Football",
      type: "checkbox",
      name: "football",
    },
  ];

  const handleFieldChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setFormData((formData) => ({
      ...formData,
      interests: checked
        ? [...formData.interests, name]
        : formData.interests.filter((item) => item !== name),
    }));
  };

  return (
    <div>
      {fieldConfig.map((config, idx) => (
        <div key={idx}>
          <input
            type={config.type}
            name={config.name}
            checked={interests.includes(config.name)}
            onChange={handleFieldChange}
          />
          <label>{config.label}</label>
        </div>
      ))}
      {formError["interests"] && (
        <span className="error">{formError["interests"]}</span>
      )}
    </div>
  );
};

export default Interests;
