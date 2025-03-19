"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { SiCodechef, SiCodeforces } from "react-icons/si";
import { Contest } from "./api/contests/route";
import { useEffect, useState } from "react";

export default function Home() {
  const [upcomingContests, setUpcomingContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadContests = async () => {
      fetch("/api/contests")
        .then((res) => res.json())
        .then((data) => {
          setUpcomingContests(data.contests);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error loading contests", error);
        });
    };
    loadContests();
  }, []);

  const formatTime = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);
    const formattedTime = date.toLocaleTimeString();
    return formattedTime;
  };
  const formatDate = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[now.getDay()];
  const date = now.toLocaleDateString();
  return (
    <>
      <span className="text-sm">
        {day}, {date}
      </span>

      {/* Contest Table  */}
      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-blue-500 text-xl">
                Event
              </TableHead>
              <TableHead className="font-bold text-blue-500 text-xl">
                Date
              </TableHead>
              <TableHead className="font-bold text-blue-500 text-xl">
                Start Time
              </TableHead>
              <TableHead className="font-bold text-blue-500 text-xl">
                End Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="font-mono text-blue-400 text-center py-4"
                >
                  Loading events...
                </TableCell>
              </TableRow>
            ) : (
              upcomingContests.map((contest: Contest) => (
                <TableRow
                  key={contest.id}
                  className="hover:bg-gray-700 transition-colors duration-300"
                >
                  <TableCell>
                    <a
                      href={`${contest.base_url}/${contest.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center space-x-2"
                    >
                      {contest.site === "codeforces" ? (
                        <SiCodeforces />
                      ) : (
                        <SiCodechef />
                      )}
                      <span>{contest.name}</span>
                    </a>
                  </TableCell>
                  <TableCell>
                    {contest.startTimeSeconds
                      ? formatDate(contest.startTimeSeconds)
                      : "NA"}
                  </TableCell>
                  <TableCell>
                    {contest.startTimeSeconds
                      ? formatTime(contest.startTimeSeconds)
                      : "NA"}
                  </TableCell>
                  <TableCell>
                    {contest.startTimeSeconds
                      ? formatTime(
                          contest.startTimeSeconds + contest.durationSeconds
                        )
                      : "NA"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
