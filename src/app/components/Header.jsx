import Image from "next/legacy/image";

export const Header = ({ step }) => {
  return (
    <div className="mb-6">
      {step < 4 && (
        <>
          <div className="flex justify-start mb-4">
            <Image
              src="https://pinecone-academy-multi-step-form.vercel.app/pinecone-logo.svg"
              alt="pinecone-logo"
              width={92}
              height={80}
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
