import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import PracticePage from "./PracticePage";

interface Problem {
  problem_url: string;
  topic: string;
  name: string;
}

async function getProblems(): Promise<Problem[]> {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "problems.csv");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
    return records as Problem[];
  } catch (error) {
    console.error("Error reading problems:", error);
    return [];
  }
}

export default async function Page() {
  const problems = await getProblems();
  return <PracticePage problems={problems} />;
}
