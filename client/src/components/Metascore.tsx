type MetascoreProps = {
  metascore?: number;
};

/**
 * Metascore component
 * @param {number} [metascore] - The metascore of the game
 */
export default function Metascore({ metascore }: MetascoreProps) {
  return (
    <div
      aria-label="metascore"
      className={`flex items-center justify-center rounded-md border border-white text-sm text-white ${
        metascore !== undefined
          ? metascore > 75
            ? 'bg-green-700'
            : metascore > 50
            ? 'bg-yellow-700'
            : 'bg-red-700'
          : 'hidden'
      } h-7 w-7 px-1`}
    >
      {metascore?.toFixed() ?? 'N/A'}
    </div>
  );
}
