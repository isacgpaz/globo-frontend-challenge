import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export function RateSelect({
  rating,
  setRating,
  isDisabled = true,
}: {
  rating: number,
  setRating: (value: number) => void,
  isDisabled: boolean,
}) {

  const handleMouseOver = (index: number) => {
    setRating(index);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  return (
    <div className="flex items-center gap-2">
      <ul className="flex gap-1 mt-2">
        {[1, 2, 3, 4].map((index) => (
          <li
            key={index}
          >
            <button
              onMouseOver={() => !isDisabled && handleMouseOver(index)}
              onClick={() => !isDisabled && handleClick(index)}
              className={cn(isDisabled ? "cursor-default" : "cursor-pointer")}
            >
              <Star
                className="w-5 h-5"
                fill={index <= rating ? "orange" : "white"}
              />

            </button>
          </li>
        ))}
      </ul>

      <p className="block mt-2 text-xs text-primary">
        <strong className="text-base">{rating}</strong>/4
      </p>
    </div>
  )
}