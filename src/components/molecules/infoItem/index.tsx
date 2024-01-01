interface InfoItemProps {
  text: string;
  icon: React.ReactNode;
  iconSize?: string;
  onClick?: () => void;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  text,
  icon,
  iconSize,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={onClick && { cursor: "pointer" }}
      className="flex w-fit items-center gap-4"
    >
      <div  className={`min-w-[${iconSize}px]`}>{icon}</div>

      <p  className="text-md font-bold">
        {text}
      </p>
    </div>
  );
};
