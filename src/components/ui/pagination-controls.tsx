import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  currentPage: number;
  setCurrentPage: (page: number | ((p: number) => number)) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  totalItems: number;
  totalPages: number;
  startIndex: number;
}

export function PaginationControls({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  totalItems,
  totalPages,
  startIndex,
}: PaginationControlsProps) {
  if (totalItems === 0) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-4">
      {/* Left: Result per page */}
      <div className="flex items-center space-x-3 text-sm text-foreground">
        <span className="font-medium">Result per page</span>
        <Select 
          value={itemsPerPage.toString()} 
          onValueChange={(v) => {
            setItemsPerPage(Number(v));
            setCurrentPage(1); // Reset to first page when changing page size
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={itemsPerPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right: Text and Pagination Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>

          {getPageNumbers().map((page, i) => (
            page === '...' ? (
              <div key={`ellipsis-${i}`} className="flex items-center justify-center w-8 h-8 text-muted-foreground font-medium">
                ...
              </div>
            ) : (
              <Button
                key={`page-${page}`}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className={cn(
                  "w-8 h-8 font-medium text-sm",
                  currentPage === page ? "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setCurrentPage(page as number)}
              >
                {page}
              </Button>
            )
          ))}

          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            onClick={() => setCurrentPage(p => Math.min(totalPages || 1, p + 1))}
            disabled={currentPage >= totalPages}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

