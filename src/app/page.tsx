import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SiCodechef, SiCodeforces, SiLeetcode } from "react-icons/si";

import { Contest } from "./api/contests/route";
import axios from "axios";

async function getContests() {
  try {
    const response = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contests`
    );
    const result: Contest[] = (await response).data.contests;
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const revalidate = 60;

export default async function Home() {
  const upcomingContests: Contest[] = await getContests();

  const formatTime = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    return formattedTime;
  };
  const formatDate = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);
    const formattedDate = date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "numeric",
    });
    return formattedDate;
  };
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[now.getDay()];
  const date = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return days[date.getDay()];
  };
  return (
    <>
      <span className="text-sm font-mono text-black dark:text-green-500">
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
                Start Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingContests &&
              upcomingContests.map((contest: Contest) => (
                <TableRow
                  key={contest.id}
                  className=" transition-colors duration-300"
                >
                  <TableCell>
                    <a
                      href={contest.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center space-x-2"
                    >
                      {contest.site === "codeforces" ? (
                        <SiCodeforces className="h-6 w-6" />
                      ) : contest.site === "codechef" ? (
                        <SiCodechef className="h-6 w-6" />
                      ) : (
                        <SiLeetcode className="h-6 w-6" />
                      )}
                      <span>{contest.name}</span>
                    </a>
                  </TableCell>
                  <TableCell className="font-mono">
                    {contest.startTimeSeconds
                      ? formatDate(contest.startTimeSeconds)
                      : ""}{" "}
                    {contest.startTimeSeconds
                      ? getDay(contest.startTimeSeconds)
                      : ""}{" "}
                    {contest.startTimeSeconds
                      ? formatTime(contest.startTimeSeconds)
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
