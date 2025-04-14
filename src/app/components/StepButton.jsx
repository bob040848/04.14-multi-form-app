export const StepButton = ({ step, handleNext, handleBack, formData }) => {
  const validateStep = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.username) {
        return false;
      }
      const firstNameValid = /^[a-zA-Z\s]+$/.test(formData.firstName);
      const lastNameValid = /^[a-zA-Z\s]+$/.test(formData.lastName);
      const usernameValid = formData.username.trim() !== "";
      return firstNameValid && lastNameValid && usernameValid;
    }
    if (step === 2) {
      if (
        !formData.email ||
        !formData.phone ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        return false;
      }
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      const phoneValid = /^\d{8,}$/.test(formData.phone);
      const passwordValid =
        formData.password.length >= 6 &&
        /[a-zA-Z]/.test(formData.password) &&
        /[0-9]/.test(formData.password);
      const confirmPasswordValid =
        formData.password === formData.confirmPassword;
      return emailValid && phoneValid && passwordValid && confirmPasswordValid;
    }
    if (step === 3) {
      if (!formData.dob || !formData.image) return false;
      const dob = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const isAdult =
        age > 18 ||
        (age === 18 &&
          today.getMonth() >= dob.getMonth() &&
          today.getDate() >= dob.getDate());
      return formData.dob !== "" && isAdult && formData.image !== null;
    }
    return true;
  };

  const isValid = validateStep();

  return (
    <div className="flex items-center gap-3 mt-6">
      {step > 1 && step < 4 && (
        <button
          onClick={handleBack}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover.ctrl + shift + L:bg-gray-100 flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      )}
      {step < 4 && (
        <button
          onClick={handleNext}
          disabled={!isValid}
          className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center ${
            isValid
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } ${step === 1 ? "w-full" : ""}`}
        >
          {step === 3 ? `Submit ${step}/3` : `Continue ${step}/3`}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
