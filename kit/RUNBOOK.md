# survivenight1: daily "What if" video, automated run

You are making ONE new video for Denis's faceless TikTok **@survivenight1**, then queueing it in Buffer.
Work unattended: decide routine things yourself, never stop to ask. If something truly blocks you, send Denis a short message saying what broke.

## Format (strict)
- Topic: **"What if" survival stories. NO zombies, NO couple/relationship stories, NO supernatural monsters.** Real-world danger, real survival rules.
- Length **62–67 s** (TikTok Creator Rewards needs >60 s). Check `total` printed by tts.py; add/trim a line until it fits (end card hold 4.0 s counts).
- Aimed at **US viewers**: US English, °F, miles, US places.
- Structure (copy `/home/claude/video48/script.json` + `scenes48.js`, the sinking-car episode, as the reference):
  1. **3-second hook** that works for a stranger: "If you ___ … you have ___." First caption shows the place/danger in yellow/red.
  2. One quick setup beat (what happens).
  3. **RULE 1, RULE 2, RULE 3**: real, correct survival steps (use `rulePill(n, t)`).
  4. **THE DEADLY MISTAKE** (`mistakeFx`): the common wrong move, + why it kills.
  5. You do it right → you survive.
  6. **Twist ending** (unsettling, a cliffhanger, no gore), then end card `part2Card(t, d, 'SHORT TITLE')` = "PART 2? COMMENT IF YOU WANT IT".
- **No CTA**, no links, no product mentions in the video.
- Narrator: Kokoro `am_michael` speed 1.05 (default in tts.py). Captions use `{y:…}` yellow, `{r:…}` red, `|` line break.
- **Fact-check every rule and the deadly mistake with WebSearch/WebFetch before writing** (official sources: NWS/NOAA, Red Cross, NPS, CDC, Ready.gov, USCG). If a "rule" is disputed, drop it. Never invent statistics.
- Flat 2D cartoon style built from `lib.js` / `wi.js` helpers (`youGuy`, `pill`, `vign`, `waves`, `stars`, `bigX`, `timerChip`, `zoomAt`, `recolor` …). Look at `scenes48.js` for how scenes are written (`S.<scene> = (t, d, T) => ({ svg, cam })`, `capL(scene, i, T, t)` = local start time of caption i). Keep key art out of the caption band (y≈1180–1340) where you can.

## Steps
1. **Setup**: the repo `soloprosheets-hash/survivenight1-media-Choose-Public.` is cloned at REPO (see task prompt). The kit is in `REPO/kit/`. Copy it to `/home/claude/kitsrc` and run `bash /home/claude/kitsrc/setup.sh` → must print `SETUP OK`.
2. **Pick the topic**: read `REPO/log.json`. Take the first topic in `topics.md` whose id is not in the log. Next episode number N = (highest n in log) + 1.
3. `bash /home/claude/mkep.sh N 48 <timer_scene>` (the timer scene must be a scene name that will exist in your script, e.g. `xx_float`; if you don't use a timer just pass your 3rd scene name). Then write `/home/claude/videoN/script.json` and `/home/claude/videoN/scenesN.js` (unique scene-name prefix per episode).
4. `cd /home/claude/videoN && python3 tts.py` → check total 62–67 s.
5. `bash /home/claude/preview.sh N` → **Read** `review_0.jpg` and `review_1.jpg`. Fix anything broken (missing art, overlaps, unreadable, empty frames). Repeat until it looks good.
6. `bash /home/claude/build.sh N` (≈6 min) → verifies duration. Rename output to `whatif_<slug>.mp4`. Check loudness: `ffmpeg -i f.mp4 -af volumedetect -f null -` (max ≈ -1 dB).
7. **Upload** (GitHub, NOT Netlify: Netlify credits are used up):
   - Videos must be under 50 MB (they are ~12 MB).
   - `cp whatif_<slug>.mp4 REPO/v/`, append `{"n": N, "id": "<topic id>", "title": "...", "file": "v/whatif_<slug>.mp4", "date": "<today>", "posts": "<dueAt>"}` to `REPO/log.json`.
   - Delete files in `REPO/v/` whose log entry `posts` date is more than 14 days ago (they are already published; keeps the repo small).
   - `git -C REPO add -A && git -C REPO -c user.name="survivenight1 bot" -c user.email="bot@survivenight1.local" commit -m "Episode N: <title>" && git -C REPO -c push.negotiate=true push origin HEAD`
   - Public URL: `https://raw.githubusercontent.com/soloprosheets-hash/survivenight1-media-Choose-Public./main/v/whatif_<slug>.mp4` → confirm `curl -sSL -o /dev/null -w "%{http_code} %{size_download}"` gives 200 and the full size.
8. **Queue in Buffer** (`mcp__Buffer__create_post`): channelId `6af99f84ece6dfde5fd13df3` (survivenight1, TikTok), `schedulingType: automatic`, `mode: customScheduled`, `dueAt` = **next 06:00 Europe/Bucharest** (get the offset from `get_account`; +02:00 in winter, +03:00 in summer), text = caption + hashtags, asset `{video:{url, metadata:{thumbnailOffset:2000}}}`. First check `list_posts` (status scheduled, that channel) so you never double-book a day; if that day is taken use the next free day.
8b. **Also queue the same video on YouTube Shorts and Instagram Reels**, same dueAt, same video URL. Find the channels with `list_channels` (org `6aee2596d03e073c04ea5181`): use a `youtube` channel and an `instagram` channel ONLY if its name or displayName contains "survive" (case-insensitive, ignore spaces/underscores). Never post to any other channel (e.g. anything with "solopro"). If one isn't connected, skip it and mention it in the report. Check `list_posts` for that channel first, so you never double-book a day.
   - YouTube: `metadata.youtube` = `{title: "<hook question, max 90 chars> #Shorts", categoryId: "1", privacy: "public", madeForKids: false, notifySubscribers: true}`, text = caption + hashtags.
   - Instagram: `metadata.instagram` = `{type: "reel", shouldShareToFeed: true}`, text = caption + hashtags.
9. **Report**: send Denis the mp4 with SendUserFile and a short SendUserMessage: topic, length, when it posts, the caption + hashtags, and "delete it in Buffer before then if you don't like it".

## Caption + hashtags
1–2 short lines that make people comment (a question works), 1–2 emojis, then 6–8 hashtags: always `#whatif #survival #animation #fyp` + 3–4 topic tags. US spelling.

## Do not
- Do not touch the Netlify link-in-bio site at all.
- Do not post anything except the one queued TikTok video. Do not use shareNow.
