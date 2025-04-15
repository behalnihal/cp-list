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
          <div className="flex justify-center items-center gap-2 p-4">
            <Button onClick={goToFirstPage}>First</Button>
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            <Button onClick={goToLastPage}>Last</Button>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default PracticePage;
