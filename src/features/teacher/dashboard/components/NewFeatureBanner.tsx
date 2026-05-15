import type { FC } from "react";
import { FiHelpCircle } from "react-icons/fi";

const NewFeatureBanner: FC = () => {
  return (
    <div className="bg-[#FF8000] rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-center">
      <FiHelpCircle className="absolute -right-6 -bottom-6 w-32 h-32 opacity-20" />
      <h3 className="text-xl font-black mb-2 relative z-10">New Feature</h3>
      <p className="text-sm font-medium text-orange-100 mb-6 relative z-10 w-4/5">
        Try can now auto-grade multiple choice qizzes in seconds
      </p>
      <button className="bg-white text-orange-500 font-black text-sm px-6 py-2 rounded-lg w-fit hover:shadow-lg transition-shadow relative z-10">
        Try it out
      </button>
    </div>
  );
};

export default NewFeatureBanner;
