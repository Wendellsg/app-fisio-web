'use client'
import { useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

export const Modals = ({
  children,
  isOpen,
  onClose,
  title,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (!isOpen) return null;

  return (
    <section className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg md:w-fit w-[90vw] max-w-[90vw]">
        <div className="flex justify-between items-center p-4">
          {title && <p className="text-sm font-bold text-gray-800">{title}</p>}


          <RiCloseCircleFill className="cursor-pointer text-3xl ml-auto" onClick={onClose}/>
        </div>
        <div className="my-4 overflow-y-auto overflow-x-clip max-h-[80vh] w-full md:w-[500px] md:max-w-[500px] p-4">{children}</div>
      </div>
    </section>
  );
};
