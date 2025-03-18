"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { useEffect, useState } from "react";
import { Contest } from "./api/contests/route";
import Head from "next/head";

export default function Home() {
  const [upcomingContests, setUpcomingContests] = useState<Contest[]>([]);

  useEffect(() => {
    const loadContests = async () => {
      fetch("/api/contests")
        .then((res) => res.json())
        .then((data) => {
          setUpcomingContests(data.contests);
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
      <Head>
        <title>CP List</title>
        <meta
          name="description"
          content="Check out upcoming conding contests schedule"
        />
      </Head>
      <span className="text-sm">
        {day}, {date}
      </span>

      {/* Contest Table  */}
      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingContests.map((contest) => (
              <TableRow
                key={contest.id}
                className=" hover:bg-gray-700 transition-colors duration-300"
              >
                <TableCell>
                  <a
                    href={`https://codeforces.com/contest/${contest.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {contest.name}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
