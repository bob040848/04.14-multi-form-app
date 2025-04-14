import Image from "next/legacy/image";

export const Header = ({ step }) => {
  return (
    <div className="mb-6">
      {step < 4 && (
        <>
          <div className="flex justify-start mb-4">
            <Image
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google Logo"
              width={92}
              height={30}
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join Us! 😎</h1>
          <p className="text-gray-500 text-sm mt-1">
            Please provide all current information accurately.
          </p>
        </>
      )}
    </div>
  );
};
