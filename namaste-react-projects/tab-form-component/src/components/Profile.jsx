const Profile = ({ formData, setFormData, formError }) => {
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

  const handleFieldChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((formData) => ({
      ...formData,
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
