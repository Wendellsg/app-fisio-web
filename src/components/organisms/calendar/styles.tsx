import { THEME } from "../../../theme";

export function WeekDate({ isToday, children }) {
  const bgColor = isToday ? `bg-accent` : "bg-transparent";
 
  return (
    <span
      className={`w-full flex justify-center items-center rounded-lg font-bold text-xs md:text-sm text-gray-500 ${bgColor}`}
    >
      {children}
    </span>
  );
}

export function Day({ isToday, isCurrentMonth, isSelected, children, ...props }) {
  const textColor = isSelected
    ? "text-white"
    : isCurrentMonth
    ? "text-gray-700"
    : isSelected
    ? "text-black"
    : "text-gray-500";
  const bgColor = isSelected ? `bg-accent` : "bg-transparent";
  const borderColor = isToday
    ? `border-2 border-accent`
    : "border-none";
  const hoverBgColor = isSelected
    ? `bg-accent`
    : "hover:bg-gray-100";

  return (
    <div
      className={`w-full h-auto aspect-square flex flex-col justify-center items-center relative rounded-lg text-xs md:text-sm font-bold ${textColor} ${bgColor} ${borderColor} cursor-pointer ${hoverBgColor}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Meeting({ children , ...props}) {
  return (
    <div
      className={`w-5 h-auto aspect-content flex flex-col justify-center items-center absolute bottom[-5px] left-0 rounded-full text-white p-0.5 bg-${THEME.colors.primary} cursor-pointer`}
      {...props}
    >
      {children}
    </div>
  );
}
