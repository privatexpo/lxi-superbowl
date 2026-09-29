import { readFileSync } from "node:fs";
import path from "node:path";

export default function HomePage() {
  const bodyHtml = readFileSync(
    path.join(process.cwd(), "content/home-body.html"),
    "utf8"
  );

  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
