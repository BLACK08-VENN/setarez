import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

export default function Home() {
  const source = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
  const content = source.match(/<body>([\s\S]*?)<script src="script\.js"><\/script>[\s\S]*?<\/body>/)?.[1] ?? "";

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
