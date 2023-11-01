type MetascoreProps = {
  metascore?: number;
};

export default function Metascore({ metascore }: MetascoreProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-md border border-white text-sm text-white ${
        metascore !== undefined
          ? metascore > 75
            ? 'bg-green-600'
            : metascore > 35
            ? 'bg-yellow-600'
            : 'bg-red-600'
          : 'bg-gray-600'
      } h-7 w-7 px-1`}
    >
      {metascore?.toFixed() ?? 'N/A'}
    </div>
  );
}
