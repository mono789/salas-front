interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let statusStyles;

  if (status === "Aceptada") {
    statusStyles = "bg-lime-500 dark:bg-teal-900 text-center rounded-full px-2";
  }
  if (status === "Pendiente") {
    statusStyles = "bg-amber-500 text-center rounded-full px-2";
  }
  if (status === "Rechazada") {
    statusStyles = "bg-orange-500 text-center rounded-full px-2";
  }

  return <div className={statusStyles}>{status}</div>;
};

export default StatusBadge;
