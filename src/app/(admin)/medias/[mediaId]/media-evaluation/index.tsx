import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/query-client";
import { useEvaluateMedia } from "@/modules/medias/evaluate-media";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export function MediaEvaluation({
  rate = 0,
  isDisabled = false,
  mediaId
}: {
  rate?: number;
  isDisabled?: boolean,
  mediaId: string
}) {
  const [rating, setRating] = useState(0);

  const { mutate: evaluateMedia } = useEvaluateMedia()

  useEffect(() => {
    if (rate) {
      setRating(rate)
    }
  }, [rate])

  const handleMouseOver = (index: number) => {
    setRating(index);
  };

  const handleClick = (index: number) => {
    setRating(index);
    evaluateMedia({
      mediaId,
      rate: index
    }, {
      onSuccess() {
        toast({
          variant: 'success',
          description: 'Avaliação realizada com sucesso.'
        })

        queryClient.invalidateQueries({
          queryKey: ['verify-evaluation']
        })
      }
    })
  };

  return (
    <div className="flex items-center gap-2">
      <ul className="flex gap-1 mt-2">
        {[1, 2, 3, 4].map((index) => (
          <li
            key={index}
            className="cursor-pointer"
          >
            <button
              onMouseOver={() => !isDisabled && handleMouseOver(index)}
              onClick={() => !isDisabled && handleClick(index)}
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