import { readdir } from "fs/promises";
import { spawn } from "child_process";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "docs-projects");

const entries = await readdir(PROJECTS_DIR, { withFileTypes: true });
const projects = entries
  .filter((e) => e.isDirectory() && !e.name.startsWith("."))
  .map((e) => e.name)
  .sort();

if (projects.length === 0) {
  console.log("No projects found in docs-projects/");
  process.exit(0);
}

function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: "inherit" });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

for (const name of projects) {
  const projectDir = path.join(PROJECTS_DIR, name);
  console.log(`\n→ Building ${name}...`);
  await run("npm", ["install"], projectDir);
  await run("npm", ["run", "build"], projectDir);
}

console.log(`\n✓ Built ${projects.length} project${projects.length === 1 ? "" : "s"}: ${projects.join(", ")}`);
