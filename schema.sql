-- MSFS Pilot Portal – database schema
-- Compatible with PostgreSQL. For MySQL: use AUTO_INCREMENT, DATETIME, and adjust types as needed.

-- =============================================================================
-- Users (for login/register)
-- =============================================================================
CREATE TABLE users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- Duty (clock in/out events)
-- =============================================================================
CREATE TABLE duty_events (
  id            SERIAL PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  clocked_in_at TIMESTAMPTZ NOT NULL,
  clocked_out_at TIMESTAMPTZ,  -- NULL = currently clocked in
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_duty_events_user_id ON duty_events(user_id);
CREATE INDEX idx_duty_events_clocked_in ON duty_events(clocked_in_at);

-- =============================================================================
-- Pilot XP & progress (total XP per user; level = floor(xp / 1000))
-- =============================================================================
CREATE TABLE pilot_progress (
  user_id    UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  total_xp   INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- Fleet (aircraft with health and status)
-- =============================================================================
CREATE TYPE aircraft_class AS ENUM ('A', 'B', 'C', 'D', 'E');
CREATE TYPE aircraft_status AS ENUM ('available', 'in_maintenance');

CREATE TABLE aircraft (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name               TEXT NOT NULL,
  icao               TEXT NOT NULL,
  class              aircraft_class NOT NULL,
  health             INTEGER NOT NULL DEFAULT 100 CHECK (health >= 0 AND health <= 100),
  status             aircraft_status NOT NULL DEFAULT 'available',
  min_runway_length_m INTEGER NOT NULL DEFAULT 0,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_aircraft_class ON aircraft(class);
CREATE INDEX idx_aircraft_status ON aircraft(status);

-- =============================================================================
-- Landing events (each landing: fpm, xp gained, type)
-- =============================================================================
CREATE TYPE landing_type AS ENUM ('butter', 'firm', 'hard');

CREATE TABLE landing_events (
  id           SERIAL PRIMARY KEY,
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  aircraft_id  UUID NOT NULL REFERENCES aircraft(id) ON DELETE CASCADE,
  fpm          INTEGER NOT NULL,
  xp_gained    INTEGER NOT NULL,
  landing_type landing_type NOT NULL,
  hard_landing BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_landing_events_user_id ON landing_events(user_id);
CREATE INDEX idx_landing_events_created_at ON landing_events(created_at);

-- =============================================================================
-- SimBrief cache (last fetched plan per user)
-- =============================================================================
CREATE TABLE simbrief_cache (
  id          SERIAL PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username    TEXT NOT NULL,
  route       TEXT,
  fuel_lbs    INTEGER,
  etd         TIMESTAMPTZ,
  origin      TEXT,
  destination TEXT,
  fetched_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_simbrief_cache_user_id ON simbrief_cache(user_id);

-- =============================================================================
-- Seed default fleet (optional)
-- =============================================================================
INSERT INTO aircraft (id, name, icao, class, health, status, min_runway_length_m) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'Cessna 172', 'C172', 'A', 100, 'available', 0),
  ('a0000002-0000-0000-0000-000000000002', 'King Air 350', 'B350', 'B', 100, 'available', 900),
  ('a0000003-0000-0000-0000-000000000003', 'A320 Neo', 'A20N', 'C', 100, 'available', 1500),
  ('a0000004-0000-0000-0000-000000000004', 'Boeing 747', 'B748', 'D', 100, 'available', 2500),
  ('a0000005-0000-0000-0000-000000000005', 'F-18', 'F18', 'E', 100, 'available', 2000);
