import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

export const Pagination = ({ page, totalPages, onPageChange, totalItems, pageSize }) => {
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm text-white/50">
        Showing {start}–{end} of {totalItems}
      </p>

      <nav className="flex items-center gap-2" aria-label="Menu pagination">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Prev
        </Button>

        <div className="flex items-center gap-1">
          {pages.map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={pageNumber === page ? 'primary' : 'ghost'}
              size="sm"
              className="min-w-9 !px-2.5"
              onClick={() => onPageChange(pageNumber)}
              aria-label={`Page ${pageNumber}`}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </Button>
          ))}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
};
