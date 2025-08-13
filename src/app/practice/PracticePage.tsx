"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reveal } from "@/utils/Reveal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

interface Problem {
  problem_url: string;
  topic: string;
  name: string;
}

interface PracticePageProps {
  problems: Problem[];
}

const PracticePage = ({ problems }: PracticePageProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(problems.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProblems = problems.slice(startIndex, endIndex);

  const goToLastPage = () => setCurrentPage(totalPages);
  const goToFirstPage = () => setCurrentPage(1);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Reveal>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-sky-800">Practice Problems</h1>
        <div className="rounded-md border mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-sky-800 text-xl">
                  Problem
                </TableHead>
                <TableHead className="font-bold text-sky-800 text-xl">
                  Topic
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProblems.map((problem: Problem, index: number) => (
                <TableRow
                  key={index}
                  className="transition-colors duration-300"
                >
                  <TableCell>
                    <a
                      href={problem.problem_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center space-x-2"
                    >
                      <span>{problem.name}</span>
                    </a>
                  </TableCell>

                  <TableCell className="font-medium">{problem.topic}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-4 w-full">
            <div className="flex items-center gap-2 justify-self-start">
              <Button
                variant="outline"
                size="sm"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                aria-label="Go to first page"
                title="First page"
              >
                <ChevronsLeft />
                <span className="hidden sm:inline">First</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                title="Previous page"
                className="min-w-[96px]"
              >
                <ChevronLeft />
                <span className="hidden sm:inline">Previous</span>
              </Button>
            </div>

            <span className="text-sm tabular-nums text-muted-foreground text-center justify-self-center min-w-[10rem]">
              Page {currentPage} of {totalPages}
            </span>

            <div className="flex items-center gap-2 justify-self-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
                title="Next page"
                className="min-w-[96px]"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                aria-label="Go to last page"
                title="Last page"
              >
                <span className="hidden sm:inline">Last</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default PracticePage;
