import { RateSelect } from "@/components/rate-select";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/contexts/auth-context";
import { queryClient } from "@/lib/query-client";
import { useEvaluateMedia } from "@/modules/medias/evaluate-media";
import { useVerifyEvaluation } from "@/modules/medias/verify-evaluation";
import { useEffect, useState } from "react";

export function MediaEvaluation({
  rate = 0,
  mediaId
}: {
  rate?: number;
  mediaId: string
}) {
  const { user } = useAuthContext()
  const [isDisabled, setIsDisabled] = useState(true)
  const [rating, setRating] = useState(0);

  const { data: verifyEvaluation } = useVerifyEvaluation(mediaId)
  const { mutate: evaluateMedia } = useEvaluateMedia()

  function handleEvaluateMedia() {
    evaluateMedia({
      mediaId,
      rate: rating
    }, {
      onSuccess() {
        toast({
          variant: 'success',
          description: 'Avaliação realizada com sucesso.'
        })

        queryClient.invalidateQueries({
          queryKey: ['verify-evaluation']
        })

        queryClient.invalidateQueries({
          queryKey: ['media', mediaId]
        })

        setIsDisabled(true)
      }
    })
  };

  useEffect(() => {
    if (rate || isDisabled) {
      setRating(rate)
    }
  }, [rate, isDisabled])

  return (
    <div>
      <div className="flex items-center gap-2">
        <RateSelect
          rating={rating}
          setRating={setRating}
          isDisabled={isDisabled}
        />

        {user && verifyEvaluation?.evaluationAvalable && (
          <>
            {isDisabled ? (
              <Button
                size='sm'
                className="mt-2 transition-all hover:no-underline hover:scale-90"
                variant='link'
                onClick={() => setIsDisabled(false)}
              >
                Avaliar
              </Button>
            ) : (
              <>
                <Button
                  size='sm'
                  className="mt-2 transition-all hover:no-underline hover:scale-90"
                  variant='link'
                  onClick={handleEvaluateMedia}
                >
                  Salvar avaliação
                </Button>

                <Button
                  size='sm'
                  className="mt-2 text-white transition-all hover:no-underline hover:scale-90"
                  variant='link'
                  onClick={() => setIsDisabled(true)}
                >
                  Cancelar
                </Button>

              </>
            )}
          </>
        )}
      </div>

      {verifyEvaluation?.rate && (
        <span className="text-xs text-white">
          Sua nota: {verifyEvaluation.rate}
        </span>
      )}
    </div>
  )
}