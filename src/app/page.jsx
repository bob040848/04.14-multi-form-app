"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Header,
  FirstStep,
  SecondStep,
  ThirdStep,
  FourthStep,
  StepButton,
} from "./components";

const Home = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    image: null,
  });

  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    const savedStep = localStorage.getItem("step");
    console.log(
      "On page load - savedStep:",
      savedStep,
      "savedFormData:",
      savedFormData
    );
    if (savedStep && parseInt(savedStep, 10) === 4) {
      localStorage.removeItem("formData");
      localStorage.removeItem("step");
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        dob: "",
        image: null,
      });
    } else if (savedFormData && savedStep) {
      const parsedStep = parseInt(savedStep, 10);
      if (parsedStep >= 1 && parsedStep <= 3) {
        setFormData((prev) => ({
          ...prev,
          ...JSON.parse(savedFormData),
          image: null,
        }));
        setStep(parsedStep);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("step", step.toString());
    if (step < 4) {
      const { image, ...dataToSave } = formData;
      localStorage.setItem("formData", JSON.stringify(dataToSave));
    } else {
      localStorage.removeItem("formData");
    }
  }, [formData, step]);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (step < 4) {
      setDirection(1);
      setTimeout(() => {
        setStep(step + 1);
      }, 300);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setTimeout(() => {
        setStep(step - 1);
      }, 300);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4 }}
          className={`bg-white rounded-lg shadow-xl p-6 w-full ${
            step === 4 ? "max-w-xs min-h-[150px]" : "max-w-md min-h-[400px]"
          }`}
        >
          {step < 4 && <Header step={step} />}
          <div className={step < 4 ? "min-h-[300px]" : ""}>
            {step === 1 && (
              <FirstStep formData={formData} updateFormData={updateFormData} />
            )}
            {step === 2 && (
              <SecondStep formData={formData} updateFormData={updateFormData} />
            )}
            {step === 3 && (
              <ThirdStep formData={formData} updateFormData={updateFormData} />
            )}
            {step === 4 && <FourthStep />}
          </div>
          {step < 4 && (
            <StepButton
              step={step}
              handleNext={handleNext}
              handleBack={handleBack}
              formData={formData}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default Home;
