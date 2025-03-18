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
};
export async function GET() {
  try {
    const response = await axios.get(
      "https://codeforces.com/api/contest.list/"
    );
    let contests: Contest[] = response.data.result;
    contests = contests.filter((contest) => contest.phase === "BEFORE");
    return NextResponse.json({ contests: contests });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load contests" },
      { status: 500 }
    );
  }
}
