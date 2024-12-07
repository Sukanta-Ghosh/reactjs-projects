/* Implement a Highly Scalable Config-Driven Form Rendering functionality in React.
  
  Requirements:
    - Render a form based on a configuration object schema.
    - The form should include various input fields such as text fields, radio buttons, checkboxes, etc.
    - Implement validation for each field.
    - Display appropriate error messages when validation fails for any field.
    - Ensure that the UI reflects the form structure and validation status based on the configuration.
*/

import "./App.css";
import Form from "./components/form";
import { schema } from "./config/schema";

export default function App() {
  const onSubmit = (formData) => {
    console.log("form data = ", formData);
  };

  return (
    <div className="App">
      <h1>Config Driven Form</h1>
      <Form schema={schema} onSubmit={onSubmit} />
    </div>
  );
}
