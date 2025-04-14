import { useState } from "react";
import { Input } from "./Input";

export const ThirdStep = ({ formData, updateFormData }) => {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name, value) => {
    if (name === "dob") {
      if (!value) return "Please select a date.";
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const isAdult =
        age > 18 ||
        (age === 18 &&
          today.getMonth() >= dob.getMonth() &&
          today.getDate() >= dob.getDate());
      if (!isAdult) return "You must be at least 18 years old.";
    }
    return "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData({ image: file });
      setImagePreview(URL.createObjectURL(file));
      setErrors({ ...errors, image: "" });
    } else {
      setErrors({ ...errors, image: "Please select an image." });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      updateFormData({ image: file });
      setImagePreview(URL.createObjectURL(file));
      setErrors({ ...errors, image: "" });
    } else {
      setErrors({ ...errors, image: "Please select an image." });
    }
  };

  const handleDateBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  return (
    <div>
      <Input
        label="Date of birth *"
        type="date"
        name="dob"
        value={formData.dob || ""}
        onChange={handleDateChange}
        onBlur={handleDateBlur}
        error={errors.dob}
      />
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Profile Image *
        </label>
        <div
          className="mt-1 border border-gray-200 rounded-lg p-6 text-center bg-gray-50"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full h-auto rounded-lg"
              />
            ) : (
              <div>
                <svg
                  className="mx-auto h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <p className="text-gray-500 text-sm mt-2">
                  Browse or Drop Image
                </p>
              </div>
            )}
          </label>
        </div>
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image}</p>
        )}
      </div>
    </div>
  );
};
