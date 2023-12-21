type Props = {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick(e: any): void;
  player?: string;
};

function Square({index, onClick, player}: Props) {
  const hoverStyle = "transition duration-500 hover:scale-105 transform";
  return (
    <div
      data-cell-index={index}
      className={`h-32 border-solid border-2 text-7xl flex justify-center items-center cursor-pointer ${hoverStyle}`}
      {...{onClick}}
    >
      <span
        data-cell-index={index}
        className={`transform transition-all duration-150 ease-out`}
      >
        {player}
      </span>
    </div>
  );
}

export default Square;
