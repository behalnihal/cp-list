import axios from "axios";
import { NextResponse } from "next/server";
export type Contest = {
  id: number;
  name: string;
  type: string;
  phase: string;
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds?: number;
  relativeTimeSeconds?: number;
  url: string;
  site: string;
};

export interface Codeforces {
  id: number;
  name: string;
  type: string;
  phase: string;
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds?: number;
  relativeTimeSeconds?: number;
  url: string;
  site: string;
}
export interface Codechef {
  contest_code: string;
  contest_name: string;
  contest_start_date: string;
  contest_end_date: string;
  contest_start_date_iso: string;
  contest_end_date_iso: string;
  contest_duration: number;
  distinct_users: number;
}

export interface Leetcode {
  title: string;
  startTime: number;
  duration: number;
  titleSlug: string;
}
export async function GET() {
  try {
    const codeforcesResponse = await axios.get(
      "https://codeforces.com/api/contest.list/"
    );
    let codeforcesContests: Codeforces[] = codeforcesResponse.data.result.map(
      (contest: Codeforces) => ({
        id: contest.id,
        name: contest.name,
        type: contest.type,
        phase: contest.phase,
        frozen: contest.frozen,
        durationSeconds: contest.durationSeconds,
        startTimeSeconds: contest.startTimeSeconds,
        relativeTimeSeconds: contest.relativeTimeSeconds,
        url: `https://codeforces.com/contests/${contest.id}`,
        site: "codeforces",
      })
    );
    codeforcesContests = codeforcesContests.filter(
      (contest) => contest.phase === "BEFORE"
    );

    const codechefResponse = await axios.get(
      "https://www.codechef.com/api/list/contests/future/"
    );
    const codechefContests = codechefResponse.data.contests.map(
      (contest: Codechef) => ({
        id: contest.contest_code,
        name: contest.contest_name,
        type: "codechef",
        phase: "BEFORE",
        frozen: false,
        durationSeconds: contest.contest_duration * 60,
        startTimeSeconds:
          new Date(contest.contest_start_date_iso).getTime() / 1000,
        relativeTimeSeconds: null,
        url: `https://www.codechef.com/${contest.contest_code}`,
        site: "codechef",
      })
    );

    const leetcodeResponse = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: `
      query getContestList {
      allContests {
      title
      startTime
      duration
      titleSlug}}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const allContests = leetcodeResponse.data.data.allContests;
    const now = Date.now();

    const leetcodeContests = allContests
      .filter((contest: Leetcode) => contest.startTime * 1000 > now)
      .map((contest: Leetcode) => ({
        id: contest.titleSlug,
        name: contest.title,
        type: "leetcode",
        phase: "BEFORE",
        frozen: false,
        durationSeconds: contest.duration,
        startTimeSeconds: contest.startTime,
        relativeTimeSeconds: null,
        url: `https://leetcode.com/contest/${contest.titleSlug}`,
        site: "leetcode",
      }));

    const contests: Contest[] = [
      ...codeforcesContests,
      ...codechefContests,
      ...leetcodeContests,
    ];
    contests.sort((a, b) => {
      if (a.startTimeSeconds && b.startTimeSeconds) {
        return a.startTimeSeconds - b.startTimeSeconds;
      } else {
        return 0;
      }
    });
    return NextResponse.json({ contests: contests });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load contests" },
      { status: 500 }
    );
  }
}
