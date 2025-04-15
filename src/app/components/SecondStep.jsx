import { useState } from "react";
import { Input } from "./Input";

export const SecondStep = ({ formData, updateFormData }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormData({ [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateField = (name, value) => {
    if (!value.trim()) return "This field is required";
    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Please provide a valid email address.";
      }
    }
    if (name === "phone") {
      if (!/^\d{8,}$/.test(value)) {
        return "Please enter a valid phone number.";
      }
    }
    if (name === "password") {
      if (value.length < 6 || !/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
        return "Password must be at least 6 characters and include letters and numbers.";
      }
    }
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        return "Passwords do not match.";
      }
    }
    return "";
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  return (
    <div>
      <Input
        label="Email *"
        type="email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
      />
      <Input
        label="Phone number *"
        type="tel"
        name="phone"
        value={formData.phone || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phone}
      />
      <Input
        label="Password *"
        type="password"
        name="password"
        value={formData.password || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
      />
      <Input
        label="Confirm password *"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.confirmPassword}
      />
    </div>
  );
};
