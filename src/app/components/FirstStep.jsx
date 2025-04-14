import { useState } from "react";
import { Input } from "./Input";

export const FirstStep = ({ formData, updateFormData }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateField = (name, value) => {
    if (!value.trim()) return "This field is required";
    if (name === "firstName" || name === "lastName") {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        return "Name cannot contain special characters or numbers.";
      }
    }
    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  return (
    <div>
      <Input
        label="First name *"
        type="text"
        name="firstName"
        value={formData.firstName || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.firstName}
      />
      <Input
        label="Last name *"
        type="text"
        name="lastName"
        value={formData.lastName || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.lastName}
      />
      <Input
        label="Username *"
        type="text"
        name="username"
        value={formData.username || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.username}
      />
    </div>
  );
};
