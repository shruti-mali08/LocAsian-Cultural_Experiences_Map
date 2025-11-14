CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "created_at" timestamp
);

CREATE TABLE "review" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "body" text,
  "user_id" integer NOT NULL,
  "status" varchar,
  "created_at" timestamp
);

CREATE TABLE "user_favorites" (
  "id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "restaurant_id" integer NOT NULL,
  "saved_at" timestamp
);

CREATE TABLE "culture" (
  "id" integer PRIMARY KEY,
  "culture" varchar,
  "description" text
);

CREATE TABLE "restaurants" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "culture" varchar,
  "address" text,
  "city" text,
  "cuisine_type" varchar,
  "google_place_id" varchar,
  "rating" integer
);

COMMENT ON COLUMN "review"."body" IS 'Content of the post';

COMMENT ON COLUMN "culture"."description" IS 'About the culture';

COMMENT ON COLUMN "restaurants"."rating" IS 'from google api';

ALTER TABLE "review" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_favorites" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "restaurants" ADD FOREIGN KEY ("culture") REFERENCES "culture" ("id");

ALTER TABLE "user_favorites" ADD FOREIGN KEY ("restaurant_id") REFERENCES "restaurants" ("id");
