import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BlurBox = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {children}
      </div>
    </div>
  );
};

export default BlurBox;
