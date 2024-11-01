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
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto max-h-[95vh] text-gray-900 dark:text-gray-100">
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