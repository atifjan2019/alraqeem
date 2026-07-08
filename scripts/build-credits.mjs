// Aggregate every public/images/tours/<slug>/_credits.json into lib/photoCredits.json,
// the source for the /photo-credits page. Run after each image download batch.
import fs from "node:fs";
import path from "node:path";
const root = "public/images/tours";
const out = [];
if (fs.existsSync(root)) {
  for (const slug of fs.readdirSync(root)) {
    const f = path.join(root, slug, "_credits.json");
    if (!fs.existsSync(f)) continue;
    const arr = JSON.parse(fs.readFileSync(f, "utf8"));
    for (const c of arr) out.push({ slug, ...c });
  }
}
out.sort((a,b)=> a.slug.localeCompare(b.slug) || a.key.localeCompare(b.key));
fs.writeFileSync("lib/photoCredits.json", JSON.stringify(out, null, 2));
console.log(`Wrote lib/photoCredits.json with ${out.length} entries from ${new Set(out.map(x=>x.slug)).size} pages.`);
