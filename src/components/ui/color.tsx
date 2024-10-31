const Color = ({ color }: { color: string }) => {
  return (
    <div className="flex items-center gap-x-2">
      {color}
      <div
        className="size-6 rounded-full border"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default Color;
