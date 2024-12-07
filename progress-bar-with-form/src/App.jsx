import React, { useState } from "react";
import "./App.css";
import ProgressBar from "./ProgressBar";

export default function App() {
  const documentCategories = ["XL", "PDF"];
  const documentTypes = ["Resume", "Adhar"];

  // states
  const [formValues, setFormValues] = useState({
    fileName: "",
    type: "-",
    fileCategory: "-",
    email: "",
  });

  const [errors, setErrors] = useState({
    fileName: "",
    type: "",
    fileCategory: "",
    email: "",
  });

  const [percent, setPercent] = React.useState(0);

  // handler functions
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    const { fileName, type, email, fileCategory } = formValues;

    let newErrors = {
      fileName: "",
      type: "",
      fileCategory: "",
      email: "",
    };

    if (!fileName.length) {
      newErrors.fileName = "fileName error";
    }

    if (type === "-") {
      newErrors.type = "type error";
    }

    if (fileCategory == "-") {
      newErrors.fileCategory = "fileCategory error";
    }

    if (!email.length) {
      newErrors.email = "email error";
    }
    setErrors(newErrors);

    let passValidatedFields = 0;
    let allFields = Object.keys(formValues).length;
    for (const key in newErrors) {
      if (newErrors[key].length === 0) {
        passValidatedFields += 1;
      }
    }

    const percent = (passValidatedFields / allFields) * 100;

    setPercent(percent);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex-container">
      <div className="flex-items">Progress Bar: {percent}%</div>
      <ProgressBar percent={percent} />

      {/* File Name */}
      <div className="flex-items">
        <span>File Name:</span>
        <input
          type="input"
          name="fileName"
          value={formValues.fileName}
          onChange={handleChange}
        />
      </div>
      <p className="error">{errors.fileName}</p>

      {/* File Category */}
      <div className="flex-items">
        <span>Document Category:</span>
        <select name="fileCategory" onChange={handleChange}>
          <option>-</option>
          {documentCategories.map((ele, idx) => {
            return (
              <option key={idx} value={ele}>
                {ele}
              </option>
            );
          })}
        </select>
      </div>
      <p className="error">{errors.fileCategory}</p>

      {/* Document Type */}
      <div className="flex-items">
        <span>Document Type:</span>
        <select name="type" onChange={handleChange}>
          <option>-</option>
          {documentTypes.map((ele, idx) => (
            <option key={idx} value={ele}>
              {ele}
            </option>
          ))}
        </select>
      </div>
      <p className="error">{errors.type}</p>

      {/* Email */}
      <div className="flex-items">
        <span>Email:</span>
        <input
          type="input"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </div>
      <p className="error">{errors.email}</p>

      <div className="flex-items">
        <button onClick={onSubmit} className="flex-items">
          Submit
        </button>
      </div>
    </form>
  );
}
