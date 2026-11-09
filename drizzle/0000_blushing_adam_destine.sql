CREATE TABLE `listings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`condition` text NOT NULL,
	`equipment` text NOT NULL,
	`district` text NOT NULL,
	`price` real NOT NULL,
	`deposit` real NOT NULL,
	`available_from` text NOT NULL,
	`available_to` text NOT NULL,
	`image` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`listing_id` integer NOT NULL,
	`title` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text NOT NULL
);
