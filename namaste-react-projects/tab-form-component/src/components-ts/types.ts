// Define types for form data and errors
export interface FormData {
  name: string;
  age: number;
  email: string;
  interests: string[];
  theme: string;
}

export interface FormError {
  name?: string;
  age?: string;
  email?: string;
  interests?: string;
}

export interface Tab {
  name: string;
  component: React.ComponentType<{
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    formError: FormError;
  }>;
  validate: () => boolean;
}

export interface SettingsFieldConfig {
  label: string;
  type: string;
  name: string;
}

// export interface SettingsProps {
//   formData: FormData;
//   setFormData: React.Dispatch<React.SetStateAction<FormData>>;
// }

// export interface ProfileProps {
//   formData: FormData;
//   setFormData: React.Dispatch<React.SetStateAction<FormData>>;
//   formError: FormError;
// }

export interface TabComponentsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formError: FormError;
}