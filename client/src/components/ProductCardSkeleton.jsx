export default function ProductCardSkeleton() {
  return (
    <div>
      <div className="skeleton aspect-[3/4]" />
      <div className="mt-3.5 space-y-2">
        <div className="skeleton h-2.5 w-1/2" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-2.5 w-1/3" />
        <div className="skeleton h-3.5 w-1/4" />
      </div>
    </div>
  );
}
