import { Loader } from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import { useVerifyEvaluation } from "@/modules/medias/verify-evaluation";
import { MediaType } from "@/types/media";
import { MediaEvaluation } from "../media-evaluation";

export function MediaCover({
  mediaId,
  title,
  duration,
  type,
  rate
}: {
  mediaId: string;
  title: string,
  duration: number,
  type: MediaType,
  rate: number | null
}) {
  const {
    data: verifyEvaluation,
    isPending: isEvaluationPending
  } = useVerifyEvaluation(mediaId)

  return (
    <header className="flex flex-col bg-gradient-to-t from-slate-950 to-blue-950 rounded-b-3xl h-[24vh] md:h-[32vh]">
      <div className="relative lg:max-w-5xl mx-auto w-full h-full">
        <div className="absolute bottom-8 left-6">
          <span className="text-3xl font-bold block mb-2">
            {title}
          </span>

          <div className="flex items-center gap-4">
            {type === MediaType.MOVIE && (
              <Badge variant="outline" className="bg-slate-400 uppercase text-[0.6rem] font-medium">
                Filme
              </Badge>
            )}

            {type === MediaType.SERIE && (
              <Badge variant="outline" className="bg-slate-400 uppercase text-[0.6rem] font-medium">
                Série
              </Badge>
            )}
            <span className="text-sm">
              ({duration} min)
            </span>
          </div>


          {isEvaluationPending ? (
            <Loader label="Carregando avaliação..." />
          ) : (
            <MediaEvaluation
              isDisabled={!verifyEvaluation?.evaluationAvalable}
              rate={rate ?? 0}
              mediaId={mediaId}
            />
          )}
        </div>
      </div>
    </header>
  )
}