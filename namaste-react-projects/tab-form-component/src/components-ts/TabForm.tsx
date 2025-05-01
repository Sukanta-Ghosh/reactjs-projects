import React, { useState } from "react";
import Interests from "./Interests";
import Profile from "./Profile";
import Settings from "./Settings";
import { FormData, FormError, Tab } from "./types";

const TabForm: React.FC = () => {
  // state
  const [activeTab, setActiveTab] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: 0,
    email: "",
    interests: ["coding", "music"],
    theme: "dark",
  });
  const [formError, setFormError] = useState<FormError>({});

  // validations
  const profileValidate = (): boolean => {
    const error: FormError = {};

    if (!formData.name || formData.name.length < 2) {
      error.name = "Name is not valid";
    }
    if (!formData.age || formData.age < 18) {
      error.age = "Age is not valid";
    }
    if (!formData.email || !formData.email.includes("@")) {
      error.email = "Email is not valid";
    }

    setFormError(error);
    return Object.keys(error).length > 0 ? false : true;
  };

  const interestsValidate = (): boolean => {
    const error: FormError = {};

    if (formData.interests.length === 0) {
      error.interests = "Interests is not valid";
    }

    setFormError(error);
    return Object.keys(error).length > 0 ? false : true;
  };

  // tab config
  const tabs: Tab[] = [
    {
      name: "Profile",
      component: Profile,
      validate: profileValidate,
    },
    {
      name: "Interests",
      component: Interests,
      validate: interestsValidate,
    },
    {
      name: "Settings",
      component: Settings,
      validate: () => true,
    },
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  const handlePrevNextClick = (config: "prev" | "next"): void => {
    if (!tabs[activeTab].validate()) {
      return;
    }

    if (config === "prev") {
      setActiveTab((activeTab) => activeTab - 1);
    } else {
      setActiveTab((activeTab) => activeTab + 1);
    }
  };

  const handleActiveTab = (idx: number): void => {
    if (!tabs[activeTab].validate()) {
      return;
    }
    setActiveTab(idx);
  };

  return (
    <div>
      <h4>Typescript Component</h4>
      <div className="tab-container">
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            className="tab"
            onClick={() => handleActiveTab(idx)}
            style={{ backgroundColor: activeTab === idx ? "grey" : "white" }}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent
          formData={formData}
          setFormData={setFormData}
          formError={formError}
        />
      </div>
      <div>
        {activeTab > 0 && (
          <button onClick={() => handlePrevNextClick("prev")}>Prev</button>
        )}
        {activeTab < tabs.length - 1 && (
          <button onClick={() => handlePrevNextClick("next")}>Next</button>
        )}
        {activeTab === tabs.length - 1 && <button>Submit</button>}
      </div>
    </div>
  );
};

export default TabForm;
