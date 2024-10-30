import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  children?: ReactNode;
};

function BaseModal({ children, open }: ModalProps) {
  return (
    <>
      {open ? (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full dark:bg-gray-800 overflow-y-auto max-h-[95vh]">
              {children}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default BaseModal;
