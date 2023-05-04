import * as S from "./styles";

export const ProgressBar: React.FC<{
  progress: number;
  width: string;
  height: string;
  borderRadius: string;
  onSeek?: (percentage: number) => void;
}> = ({ progress, width, height, borderRadius, onSeek }) => {
  const getPercentageOnClick = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const percentage = (x / rect.width) * 100;
    return percentage;
  };

  return (
    <S.ProgressBarContainer
      width={width}
      height={height}
      borderRadius={borderRadius}
      onClick={(e) => {
        onSeek && onSeek(getPercentageOnClick(e));
      }}
      style={
        onSeek && {
          cursor: "pointer",
        }
      }
    >
      <S.ProgressBar progress={`${progress.toFixed(2)}%`} />
    </S.ProgressBarContainer>
  );
};
