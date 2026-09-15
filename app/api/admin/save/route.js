// Server-side route that commits admin panel changes directly to GitHub.
// This runs ONLY on the server -- the GitHub token never reaches the
// browser, unlike everything else in this project which ships to the
// client as-is.
//
// Requires these to be set in Vercel -> Project Settings -> Environment
// Variables (NOT written into any file in this repo):
//
//   GITHUB_TOKEN         A GitHub personal access token with
//                        "Contents: Read and write" permission on this
//                        one repo (see the setup steps you were given).
//   GITHUB_REPO          "your-github-username/marquee-club-directory"
//   GITHUB_BRANCH        Usually "main".
//   ADMIN_API_PASSWORD   A password only you know. Keep it the same as
//                        ADMIN_PASSWORD in lib/adminConfig.js so you
//                        only have to remember one -- but this one is
//                        the real gate, since lib/adminConfig.js ships
//                        to every visitor's browser and this one never
//                        leaves the server.
//
// Until those are set, this route safely fails with a clear error
// instead of doing anything -- the admin panel's "Copy" buttons still
// work as a manual fallback regardless.

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const { password, files } = body || {};

  if (!password || password !== process.env.ADMIN_API_PASSWORD) {
    return Response.json({ error: "Wrong password." }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return Response.json(
      {
        error:
          "Live save isn't set up yet -- GITHUB_TOKEN or GITHUB_REPO is missing in Vercel's environment variables. Use the Copy buttons for now.",
      },
      { status: 500 }
    );
  }

  if (!files || typeof files !== "object" || Object.keys(files).length === 0) {
    return Response.json({ error: "Nothing to save." }, { status: 400 });
  }

  const results = {};

  for (const [path, content] of Object.entries(files)) {
    try {
      // GitHub requires the current file's SHA to update it -- fetch that first.
      const getRes = await fetch(
        `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        }
      );
      if (!getRes.ok) {
        throw new Error(`Couldn't read ${path} from GitHub (status ${getRes.status}).`);
      }
      const getData = await getRes.json();

      const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          message: `Update ${path} via admin panel`,
          content: Buffer.from(content, "utf-8").toString("base64"),
          sha: getData.sha,
          branch,
        }),
      });

      if (!putRes.ok) {
        const err = await putRes.json().catch(() => ({}));
        throw new Error(err.message || `GitHub rejected the update to ${path}.`);
      }

      results[path] = "ok";
    } catch (err) {
      results[path] = `error: ${err.message}`;
    }
  }

  const anyError = Object.values(results).some((r) => r.startsWith("error"));
  return Response.json({ results }, { status: anyError ? 207 : 200 });
}
