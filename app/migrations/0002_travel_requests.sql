-- Travel requests taken from the contact page. Additive only: the deploy runs
-- against the one live database, so this never drops or rewrites anything.
CREATE TABLE IF NOT EXISTS travel_requests (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT NOT NULL DEFAULT '',
  travelers     TEXT NOT NULL DEFAULT '1',
  travel_window TEXT NOT NULL DEFAULT '',
  destination   TEXT NOT NULL DEFAULT '',
  reference     TEXT NOT NULL DEFAULT '',
  message       TEXT NOT NULL,
  created_at    TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_travel_requests_created_at
  ON travel_requests (created_at DESC);
