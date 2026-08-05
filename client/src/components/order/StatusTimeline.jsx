import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ORDER_STATUS_FLOW, STATUS_LABELS } from '../../constants/order';

export const StatusTimeline = ({ status }) => {
  const currentIndex = ORDER_STATUS_FLOW.indexOf(status);

  return (
    <ol className="space-y-4" aria-label="Order status timeline">
      {ORDER_STATUS_FLOW.map((step, index) => {
        const isComplete = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <li key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  isComplete ? 'bg-brand-600 text-white' : 'bg-white/10 text-white/35'
                }`}
              >
                <CheckCircleIcon className="h-5 w-5" />
              </span>
              {index < ORDER_STATUS_FLOW.length - 1 ? (
                <span
                  className={`mt-1 w-0.5 flex-1 min-h-6 ${
                    index < currentIndex ? 'bg-brand-500' : 'bg-white/10'
                  }`}
                />
              ) : null}
            </div>
            <div className="pb-2">
              <p
                className={`font-semibold ${
                  isCurrent ? 'text-brand-400' : isComplete ? 'text-white' : 'text-white/35'
                }`}
              >
                {STATUS_LABELS[step]}
              </p>
              {isCurrent ? (
                <p className="text-xs text-white/45">Current status</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
