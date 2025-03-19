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
  base_url: string;
  site: string;
};

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
export async function GET() {
  try {
    const codeforcesResponse = await axios.get(
      "https://codeforces.com/api/contest.list/"
    );
    let codeforcesContests: Contest[] = codeforcesResponse.data.result.map(
      (contest: Contest) => ({
        id: contest.id,
        name: contest.name,
        type: contest.type,
        phase: contest.phase,
        frozen: contest.frozen,
        durationSeconds: contest.durationSeconds,
        startTimeSeconds: contest.startTimeSeconds,
        relativeTimeSeconds: contest.relativeTimeSeconds,
        base_url: "https://codeforces.com/contest",
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
        base_url: "https://codechef.com",
        site: "codechef",
      })
    );

    const contests: Contest[] = [...codeforcesContests, ...codechefContests];
    return NextResponse.json({ contests: contests });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load contests" },
      { status: 500 }
    );
  }
}
