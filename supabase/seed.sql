SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.6 (Ubuntu 15.6-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."categories" ("id", "created_at", "name", "description", "s3_image_path") VALUES
	(1, '2024-07-29 02:14:49.751959+00', 'Construction', NULL, '/categories/construction.png'),
	(2, '2024-07-29 02:14:49.751959+00', 'Consumables', NULL, '/categories/consumables.png'),
	(3, '2024-07-29 02:14:49.751959+00', 'Deviations', NULL, '/categories/deviations.png'),
	(4, '2024-07-29 02:14:49.751959+00', 'Materials', NULL, '/categories/materials.png'),
	(5, '2024-07-29 02:14:49.751959+00', 'Special', NULL, '/categories/special.png'),
	(6, '2024-07-29 02:14:49.751959+00', 'Tools', NULL, '/categories/tools.png'),
	(7, '2024-07-29 10:33:09.059461+00', 'Currency', NULL, NULL);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."items" ("id", "created_at", "name", "description", "s3_image_path", "category_id") VALUES
	(5, '2024-07-29 02:20:02.802207+00', 'Advanced Electric Rock Drill', NULL, '/items/advancedelectricrockdrill.PNG', 6),
	(19, '2024-07-29 02:20:02.802207+00', 'Glass', NULL, '/items/glass.png', 4),
	(35, '2024-07-29 02:20:02.802207+00', 'Rawhide', NULL, '/items/rawhide.png', 4),
	(20, '2024-07-29 02:20:02.802207+00', 'Gold Ingot', NULL, '/items/goldingot.PNG', 4),
	(36, '2024-07-29 02:20:02.802207+00', 'Refined Part', NULL, '/items/refinedpart.PNG', 4),
	(21, '2024-07-29 02:20:02.802207+00', 'Gold Ore', NULL, '/items/goldore.PNG', 4),
	(22, '2024-07-29 02:20:02.802207+00', 'Gravel', NULL, '/items/gravel.PNG', 4),
	(37, '2024-07-29 02:20:02.802207+00', 'Rubber', NULL, '/items/rubber.PNG', 4),
	(38, '2024-07-29 02:20:02.802207+00', 'Silver Ingot', NULL, '/items/silveringot.PNG', 4),
	(39, '2024-07-29 02:20:02.802207+00', 'Silver Ore', NULL, '/items/silverore.PNG', 4),
	(40, '2024-07-29 02:20:02.802207+00', 'Sintered Brick', NULL, '/items/sinteredbrick.png', 4),
	(41, '2024-07-29 02:20:02.802207+00', 'Special Part', NULL, '/items/specialpart.PNG', 4),
	(42, '2024-07-29 02:20:02.802207+00', 'Stardust Ore', NULL, '/items/stardustore.PNG', 4),
	(43, '2024-07-29 02:20:02.802207+00', 'Stardust Source', NULL, '/items/stardustsource.PNG', 4),
	(44, '2024-07-29 02:20:02.802207+00', 'Steel Ingot', NULL, '/items/steelingot.png', 4),
	(45, '2024-07-29 02:20:02.802207+00', 'Sulfur', NULL, '/items/sulfur.PNG', 4),
	(24, '2024-07-29 02:20:02.802207+00', 'Gunpowder', NULL, '/items/gunpowder.PNG', 4),
	(46, '2024-07-29 02:20:02.802207+00', 'Tin Ore', NULL, '/items/tinore.PNG', 4),
	(1, '2024-07-29 02:20:02.802207+00', 'Acid', NULL, '/items/acid.png', 4),
	(23, '2024-07-29 02:20:02.802207+00', 'Gravel and Log On-the-Go', NULL, '/items/gravellogonthego.PNG', 6),
	(2, '2024-07-29 02:20:02.802207+00', 'Activator', NULL, '/items/activator.png', 2),
	(47, '2024-07-29 02:20:02.802207+00', 'Tungsten Alloy Pickaxe', NULL, '/items/tungstenalloypickaxe.PNG', 6),
	(3, '2024-07-29 02:20:02.802207+00', 'Adhesive', NULL, '/items/adhesive.PNG', 4),
	(7, '2024-07-29 02:20:02.802207+00', 'Alloy Pickaxe', NULL, '/items/alloypickaxe.PNG', 6),
	(49, '2024-07-29 08:41:00.021011+00', 'Pickles', NULL, '/items/pickles.PNG', 2),
	(4, '2024-07-29 02:20:02.802207+00', 'Adrenaline Shot', NULL, '/items/adrenalineshot.png', 2),
	(50, '2024-07-29 08:41:19.49295+00', 'Cheese', NULL, '/items/cheese.PNG', 2),
	(51, '2024-07-29 08:41:41.580809+00', 'Corn Ale', NULL, '/items/cornale.PNG', 2),
	(52, '2024-07-29 08:44:09.367486+00', 'Malt Ale', NULL, '/items/maltale.PNG', 2),
	(25, '2024-07-29 02:20:02.802207+00', 'Iridium Crystal', NULL, '/items/iridiumcrystal.PNG', 4),
	(8, '2024-07-29 02:20:02.802207+00', 'Bait', NULL, '/items/bait.png', 2),
	(26, '2024-07-29 02:20:02.802207+00', 'Iron Ore', NULL, '/items/ironore.PNG', 4),
	(9, '2024-07-29 02:20:02.802207+00', 'Barreled Premium Fuel', NULL, '/items/barreledpremiumfuel.PNG', 6),
	(10, '2024-07-29 02:20:02.802207+00', 'Bronze Ingot', NULL, '/items/bronzeingot.png', 4),
	(27, '2024-07-29 02:20:02.802207+00', 'Living Armor', NULL, '/items/livingarmor.png', 2),
	(11, '2024-07-29 02:20:02.802207+00', 'Carbon Fiber Fabric', NULL, '/items/carbonfiberfabric.PNG', 4),
	(48, '2024-07-29 02:20:02.802207+00', 'Vanadium Crystal', NULL, '/items/vanadiumcrystal.PNG', 4),
	(12, '2024-07-29 02:20:02.802207+00', 'Copper Ingot', NULL, '/items/copperingot.png', 4),
	(28, '2024-07-29 02:20:02.802207+00', 'Log', NULL, '/items/log.PNG', 4),
	(13, '2024-07-29 02:20:02.802207+00', 'Copper Ore', NULL, '/items/copperore.PNG', 4),
	(54, '2024-07-29 09:38:55.465845+00', 'Pure Water', NULL, '/items/purewater.PNG', 2),
	(14, '2024-07-29 02:20:02.802207+00', 'Dough Fish Bait', NULL, '/items/doughfishbait.png', 2),
	(29, '2024-07-29 02:20:02.802207+00', 'Logging Chainsaw', NULL, '/items/loggingchainsaw.PNG', 6),
	(6, '2024-07-29 02:20:02.802207+00', 'Advanced Logging Chainsaw', NULL, '/items/advancedloggingchainsaw.PNG', 6),
	(15, '2024-07-29 02:20:02.802207+00', 'Electric Rock Drill', NULL, '/items/electricrockdrill.PNG', 6),
	(30, '2024-07-29 02:20:02.802207+00', 'Metal Scrap', NULL, '/items/metalscrap.PNG', 4),
	(17, '2024-07-29 02:20:02.802207+00', 'Engineering Plastic', NULL, '/items/engineeringplastic.PNG', 4),
	(53, '2024-07-29 09:06:56.772061+00', 'Aluminum Ingot', NULL, '/items/aluminumingot.png', 4),
	(18, '2024-07-29 02:20:02.802207+00', 'Fireproof Plastic', NULL, '/items/fireproofplastic.PNG', 4),
	(31, '2024-07-29 02:20:02.802207+00', 'Mushroom Seed', NULL, '/items/mushroomseed.PNG', 2),
	(32, '2024-07-29 02:20:02.802207+00', 'Portable Mixed Fuel', NULL, '/items/portablemixedfuel.PNG', 6),
	(16, '2024-07-29 02:20:02.802207+00', 'Energy Link', NULL, '/items/energylink.png', 7),
	(33, '2024-07-29 02:20:02.802207+00', 'Quick Activator', NULL, '/items/quickactivator.png', 2),
	(34, '2024-07-29 02:20:02.802207+00', 'Quick Long-acting Activator', NULL, '/items/quicklongactingactivator.PNG', 2),
	(55, '2024-08-04 15:06:35.831094+00', 'Solar Drill', NULL, '/items/solardrill.png', 6),
	(56, '2024-09-02 06:33:04.231004+00', 'Backpack Expansion', NULL, '/items/backpack_expansion.png', 5);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "created_at", "discord_id", "discord_email", "discord_image", "discord_name", "last_online") VALUES
	(13, '2024-08-22 17:13:07.382508+00', '218091515266859010', 'legendzeroone@yahoo.com', 'https://cdn.discordapp.com/avatars/218091515266859010/bce1789ae15b1412e114eb6ee9fe4360.png', 'moderate_yikes', '2024-08-22 17:13:37.381+00'),
	(14, '2024-08-22 18:40:34.039311+00', '582526117928370196', 'mikesumampouw@yahoo.com', 'https://cdn.discordapp.com/avatars/582526117928370196/6557d8a75c363a8c93feee38843140a8.png', 'owlman888', '2024-08-22 18:43:35.93+00'),
	(15, '2024-09-02 06:19:39.230652+00', '230882680105861120', 'michel.barrett@outlook.com', 'https://cdn.discordapp.com/avatars/230882680105861120/0dcd1751c8b82fcee8da1036dc2f2c33.png', 'baoyouming', '2024-09-02 06:53:37.812+00'),
	(7, '2024-08-04 21:20:24.452305+00', '81255853344174080', 'thestick22@gmail.com', 'https://cdn.discordapp.com/avatars/81255853344174080/42c3da089428e16717c1a7dbf978d98e.png', 'mattygorm', '2024-08-27 16:39:46.361+00'),
	(3, '2024-07-29 17:28:51.384719+00', '204802672048603136', 'anthonyyun02@gmail.com', 'https://cdn.discordapp.com/avatars/204802672048603136/f228533f2f252faa2811aebf1416a892.png', 'z3r0509', '2024-08-04 14:59:19.844+00'),
	(5, '2024-08-04 18:22:25.229914+00', '140879695150317568', 'sascha.koerner@outlook.de', 'https://cdn.discordapp.com/avatars/140879695150317568/f582ad7e976af97f5ba113ef9c00f0ff.png', 'samk2308', '2024-08-04 18:22:25.763+00'),
	(6, '2024-08-04 18:30:58.88379+00', '66209071199432704', 'skylu5ck@gmail.com', 'https://cdn.discordapp.com/avatars/66209071199432704/ffcc29dac1d3e6392b6fc12a8babd341.png', 'lu5ck', '2024-08-04 18:31:00.352+00'),
	(8, '2024-08-06 03:12:49.366555+00', '183043813311250432', 'mgolovacha@yahoo.com', 'https://cdn.discordapp.com/avatars/183043813311250432/bdda8b8317996dce43416b7ef9f7e40a.png', 'milky999', '2024-08-06 03:12:50.33+00'),
	(10, '2024-08-10 06:54:33.923169+00', '1109747148213456966', 'kesavanarix@gmail.com', 'https://cdn.discordapp.com/avatars/1109747148213456966/52114c399178416612d44ed537e73b53.png', 'kesavan9988', '2024-08-10 07:02:28.915+00'),
	(9, '2024-08-07 01:48:57.207812+00', '170360901965316096', 'chrisfrisby97@gmail.com', 'https://cdn.discordapp.com/avatars/170360901965316096/72c289dbc7e623604ed5cecf50a7019a.png', 'geekbonez', '2024-08-07 01:48:58.408+00'),
	(11, '2024-08-10 07:09:51.323779+00', '734430815706021908', 'archiety5555@gmail.com', 'https://cdn.discordapp.com/avatars/734430815706021908/cf2c61dc9397368f3b1451503f551389.png', 'tadaihome', '2024-08-10 07:09:52.555+00'),
	(12, '2024-08-19 15:59:27.575084+00', '1170164775293030526', 'zeroskater333@yahoo.com', 'https://cdn.discordapp.com/embed/avatars/0.png', 'sagerr2', '2024-08-19 15:59:28.051+00'),
	(2, '2024-07-29 09:15:25.202059+00', '266782401475117056', 'arctusfalcon@gmail.com', 'https://cdn.discordapp.com/avatars/266782401475117056/1435c25d80fcc6e9aedbe8648f971b95.png', 'knifelicker', '2024-08-20 18:32:13.839+00'),
	(16, '2024-09-02 09:57:52.236937+00', '527537042746507266', 'niclas.brolin@gmail.com', 'https://cdn.discordapp.com/embed/avatars/0.png', 'nlclas', '2024-09-02 21:05:38.498+00'),
	(4, '2024-08-04 11:14:21.753289+00', '976256609187663893', 'kylewade13731@gmail.com', 'https://cdn.discordapp.com/avatars/976256609187663893/cdf1826cbb1374c8aa4cb903dd84244d.png', 'kylewade', '2024-09-02 21:05:43.855+00'),
	(1, '2024-07-29 06:49:38.07648+00', '247142918685458433', 'hdsuperfx@gmail.com', 'https://cdn.discordapp.com/avatars/247142918685458433/35868f830425b33c9b5ba39e633076eb.png', 'superfx64', '2024-09-02 21:09:29.038+00');


--
-- Data for Name: listings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."listings" ("id", "created_at", "description", "region", "server", "user_id", "world", "location", "is_closed", "oncehuman_username", "do_not_contact_discord") VALUES
	(25, '2024-09-01 17:07:40.490597+00', NULL, 'NA', 'PVE01-00002', 1, '4', 'Meyer''s Market', true, 'SuperFX', false),
	(24, '2024-09-01 17:05:47.939451+00', NULL, 'NA', 'PVE01-00002', 1, '4', 'Meyer''s Market', true, 'SuperFX', false),
	(2, '2024-07-29 11:35:17.739429+00', NULL, 'NA', 'PVE01-00001', 2, '3', 'Meyers Market', true, 'Spearless', false),
	(6, '2024-07-31 05:18:48.109829+00', NULL, 'NA', 'PVP01-00016', 2, '7', 'Meyer''s Market', true, 'Spearless', true),
	(15, '2024-08-04 10:40:16.886386+00', NULL, 'NA', 'PVE01-00001', 1, '5', 'Meyer''s Market', true, 'SuperFX', true),
	(11, '2024-08-04 09:55:22.204204+00', NULL, 'NA', 'PVE01-00001', 1, '4', 'Meyer''s Market', true, 'SuperFX', true),
	(13, '2024-08-04 10:28:24.141741+00', NULL, 'NA', 'PVE01-00001', 1, '5', 'Blackfell', true, 'SuperFX', false),
	(12, '2024-08-04 10:25:38.702634+00', NULL, 'NA', 'PVE01-00001', 1, '3', 'Meyer''s Market', true, 'SuperFX', false),
	(4, '2024-07-30 14:25:40.660963+00', NULL, 'NA', 'PVE01-00001', 1, '3', 'Meyers Market', true, 'SuperFX', false),
	(14, '2024-08-04 10:30:21.531154+00', NULL, 'NA', 'PVE01-00001', 1, '5', 'Meyer''s Market', true, 'SuperFX', false),
	(16, '2024-08-04 10:49:27.968283+00', NULL, 'NA', 'PVE01-00001', 1, '5', 'Meyer''s Market', true, 'SuperFX', true),
	(1, '2024-07-29 11:34:52.121566+00', 'Hello this is a test yay\n\n\n\n\n\n\n\n\n', 'NA', 'PVE01-00001', 1, '2', 'Meyers Market', true, 'SuperFX', false),
	(26, '2024-09-02 17:22:05.646615+00', NULL, 'NA', 'PVE01-X0001', 1, '4', 'Meyer''s Market', true, 'SuperFX', false),
	(27, '2024-09-02 18:14:44.848448+00', NULL, 'EU', 'PVE01-X0003', 16, '9', 'Blackfell', false, 'Nicke', true),
	(17, '2024-08-04 11:42:16.49869+00', NULL, 'NA', 'PVE01-00001', 1, '2', 'Meyer''s Market', true, 'SuperFX', true),
	(18, '2024-08-04 11:46:59.409538+00', NULL, 'NA', 'PVE01-00001', 4, '8', 'Blackfell', true, 'SuperFX', true),
	(19, '2024-08-04 12:45:30.925149+00', NULL, 'NA', 'PVP01-00016', 2, '7', 'Meyer''s Market', false, 'Spearless', false),
	(20, '2024-08-04 12:46:50.536006+00', NULL, 'NA', 'PVP01-00016', 2, '7', 'Meyer''s Market', true, 'Spearless', false),
	(21, '2024-08-04 14:18:43.936336+00', NULL, 'NA', 'PVE01-00016', 3, '7', 'Blackfell', false, 'ArgoV', true),
	(22, '2024-08-05 15:07:57.942805+00', NULL, 'EU', 'PVE01-00001', 1, '5', 'Meyer''s Market', true, 'SuperFX', true),
	(23, '2024-09-01 17:04:50.545101+00', NULL, 'NA', 'PVE01-00002', 1, '4', 'Tall Grass Inn', true, 'SuperFX', false);


--
-- Data for Name: items_listings_ask; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."items_listings_ask" ("id", "created_at", "item_id", "listing_id", "amount") VALUES
	(1, '2024-07-29 11:36:24.61093+00', 31, 1, 2),
	(2, '2024-07-29 11:36:41.215437+00', 34, 2, 75),
	(3, '2024-07-29 14:22:35.122619+00', 4, 1, 232),
	(4, '2024-07-29 14:25:38.258844+00', 16, 1, 52),
	(5, '2024-07-30 14:33:29.409252+00', 4, 4, 1000),
	(6, '2024-07-31 05:19:25.088966+00', 20, 6, 1),
	(7, '2024-08-04 09:55:22.204204+00', 2, 11, 1),
	(8, '2024-08-04 10:25:38.702634+00', 53, 12, 10),
	(9, '2024-08-04 10:28:24.141741+00', 19, 13, 1),
	(10, '2024-08-04 10:30:21.531154+00', 20, 14, 1),
	(15, '2024-08-04 11:08:00.498887+00', 38, 15, 1),
	(16, '2024-08-04 11:12:15.557094+00', 38, 16, 1),
	(17, '2024-08-04 11:12:15.557094+00', 20, 16, 1),
	(21, '2024-08-04 11:44:03.767912+00', 38, 17, 12),
	(22, '2024-08-04 11:46:59.409538+00', 44, 18, 1),
	(23, '2024-08-04 12:45:30.925149+00', 16, 19, 1000),
	(24, '2024-08-04 12:46:50.536006+00', 16, 20, 500),
	(25, '2024-08-04 14:18:43.936336+00', 16, 21, 1000),
	(27, '2024-08-05 15:09:32.619234+00', 2, 22, 10),
	(28, '2024-09-01 17:04:50.545101+00', 2, 23, 2),
	(29, '2024-09-01 17:05:47.939451+00', 20, 24, 5),
	(30, '2024-09-01 17:05:47.939451+00', 35, 24, 10),
	(31, '2024-09-01 17:05:47.939451+00', 45, 24, 5),
	(32, '2024-09-01 17:07:40.490597+00', 2, 25, 10),
	(33, '2024-09-01 17:07:40.490597+00', 27, 25, 20),
	(34, '2024-09-01 17:07:40.490597+00', 10, 25, 5),
	(35, '2024-09-02 17:22:05.646615+00', 2, 26, 1),
	(36, '2024-09-02 18:14:44.848448+00', 30, 27, 10),
	(37, '2024-09-02 18:14:44.848448+00', 35, 27, 10),
	(38, '2024-09-02 18:14:44.848448+00', 37, 27, 15);


--
-- Data for Name: items_listings_sell; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."items_listings_sell" ("id", "created_at", "item_id", "listing_id", "amount", "total_stock") VALUES
	(1, '2024-07-29 11:35:42.191864+00', 21, 1, 50, 300),
	(2, '2024-07-29 11:36:04.019994+00', 24, 2, 10, 200),
	(3, '2024-07-30 14:33:48.032335+00', 21, 4, 40, 600),
	(4, '2024-07-31 05:20:44.899168+00', 1, 6, 50, 500),
	(5, '2024-08-04 09:55:22.204204+00', 21, 11, 1, 1),
	(6, '2024-08-04 10:25:38.702634+00', 21, 12, 7, 100),
	(7, '2024-08-04 10:28:24.141741+00', 26, 13, 1, 1),
	(8, '2024-08-04 10:30:21.531154+00', 26, 14, 1, 1),
	(13, '2024-08-04 11:08:00.498887+00', 20, 15, 1, 1),
	(14, '2024-08-04 11:12:15.557094+00', 34, 16, 1, 1),
	(18, '2024-08-04 11:44:03.767912+00', 21, 17, 4, 27),
	(19, '2024-08-04 11:46:59.409538+00', 26, 18, 1, 1),
	(20, '2024-08-04 12:45:30.925149+00', 1, 19, 50, 500),
	(21, '2024-08-04 12:46:50.536006+00', 23, 20, 1, 1),
	(22, '2024-08-04 14:18:43.936336+00', 32, 21, 50, 120),
	(24, '2024-08-05 15:09:32.619234+00', 21, 22, 4, 20),
	(25, '2024-09-01 17:04:50.545101+00', 20, 23, 10, 20),
	(26, '2024-09-01 17:05:47.939451+00', 39, 24, 20, 40),
	(27, '2024-09-01 17:07:40.490597+00', 19, 25, 20, 40),
	(28, '2024-09-02 17:22:05.646615+00', 56, 26, 1, 1),
	(29, '2024-09-02 18:14:44.848448+00', 56, 27, 1, 1);


--
-- Data for Name: user_reputation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('images', 'images', NULL, '2024-07-29 00:24:54.639981+00', '2024-07-29 00:24:54.639981+00', true, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('9ee618a7-04c4-42ed-bb8e-06b22b38448e', 'images', 'items/pickles.PNG', NULL, '2024-07-29 08:40:00.828407+00', '2024-07-29 08:40:00.828407+00', '2024-07-29 08:40:00.828407+00', '{"eTag": "\"4dcc6ff979ed0d43fc3ca9821874aef7-1\"", "size": 15285, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T08:40:01.000Z", "contentLength": 15285, "httpStatusCode": 200}', 'cab921ee-c5ce-4f36-9b3a-c1320fa8d07a', NULL, NULL),
	('c32a6d75-c021-4709-b443-b0da709f33da', 'images', 'items/cheese.PNG', NULL, '2024-07-29 08:40:03.1275+00', '2024-07-29 08:40:03.1275+00', '2024-07-29 08:40:03.1275+00', '{"eTag": "\"dd06e2fd3ce01f64b7b29aefbf760dee-1\"", "size": 16363, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T08:40:03.000Z", "contentLength": 16363, "httpStatusCode": 200}', 'fe20f9c4-ef57-406e-bebc-5f1bfbf92176', NULL, NULL),
	('fca0390c-6643-4b77-a2ce-f9199afa8e22', 'images', 'categories/.emptyFolderPlaceholder', NULL, '2024-07-29 00:26:53.963807+00', '2024-07-29 00:26:53.963807+00', '2024-07-29 00:26:53.963807+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:26:54.000Z", "contentLength": 0, "httpStatusCode": 200}', '08dc8575-10c6-461a-8784-f88f39c46ec6', NULL, NULL),
	('c43466de-9623-4972-b7ea-a0e90e899480', 'images', 'categories/construction.png', NULL, '2024-07-29 00:25:38.718985+00', '2024-07-29 00:27:29.461325+00', '2024-07-29 00:25:38.718985+00', '{"eTag": "\"2366889b3e1cfc712bdd5da31641bec6\"", "size": 1383, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:27:30.000Z", "contentLength": 1383, "httpStatusCode": 200}', 'a72397e4-ab5c-42cc-9fa8-1d76429b109e', NULL, NULL),
	('3cba290c-4f60-4a65-a96f-0e2b3f23936a', 'images', 'categories/consumables.png', NULL, '2024-07-29 00:25:38.89271+00', '2024-07-29 00:27:48.623919+00', '2024-07-29 00:25:38.89271+00', '{"eTag": "\"9773fd1a07edece85057949164e318a1\"", "size": 1204, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:27:49.000Z", "contentLength": 1204, "httpStatusCode": 200}', 'b655a6dd-33fd-49cc-8dc4-a0827cf7e6a3', NULL, NULL),
	('918aca71-17f7-42e4-8799-d9aed71afe60', 'images', 'categories/materials.png', NULL, '2024-07-29 00:25:38.828248+00', '2024-07-29 00:27:59.050272+00', '2024-07-29 00:25:38.828248+00', '{"eTag": "\"3b7ea355f4912de7bd02f14e0403bf81\"", "size": 1400, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:27:59.000Z", "contentLength": 1400, "httpStatusCode": 200}', '3839b5c1-94b8-4170-836b-45b1873eed71', NULL, NULL),
	('e11789a2-9b2c-4c59-84a5-47738969af7f', 'images', 'categories/deviations.png', NULL, '2024-07-29 00:25:38.802204+00', '2024-07-29 00:28:07.479149+00', '2024-07-29 00:25:38.802204+00', '{"eTag": "\"3cefdd6ace19dcf959f419f1233fe2d1\"", "size": 1733, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:08.000Z", "contentLength": 1733, "httpStatusCode": 200}', 'a8ea4c38-c43a-4d88-adcd-67a9350cf15e', NULL, NULL),
	('93c182db-488a-4568-96b8-c8659a41ebfb', 'images', 'categories/special.png', NULL, '2024-07-29 00:25:38.780377+00', '2024-07-29 00:28:17.483119+00', '2024-07-29 00:25:38.780377+00', '{"eTag": "\"6a136bd261e821c043de8cf969577191\"", "size": 1210, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:18.000Z", "contentLength": 1210, "httpStatusCode": 200}', 'a69dda5b-948f-4e82-ae6e-53c0b9e65341', NULL, NULL),
	('96c97977-1b19-48a7-976b-2ee65f3b8d80', 'images', 'categories/tools.png', NULL, '2024-07-29 00:25:38.625984+00', '2024-07-29 00:28:25.836445+00', '2024-07-29 00:25:38.625984+00', '{"eTag": "\"515b6c74c31eb61d20e49527085f2e87\"", "size": 1383, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:26.000Z", "contentLength": 1383, "httpStatusCode": 200}', '785b3643-5f1a-4388-8650-7b7a0dcd8ffa', NULL, NULL),
	('9841b319-1eae-417a-a0ba-39538543cd57', 'images', 'items/sinteredbrick.png', NULL, '2024-07-29 00:28:57.142146+00', '2024-07-29 00:28:57.142146+00', '2024-07-29 00:28:57.142146+00', '{"eTag": "\"6cca500b9a6af40987ce9ab2a506b041-1\"", "size": 13932, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:57.000Z", "contentLength": 13932, "httpStatusCode": 200}', '091c0352-9e4b-48ea-a1d1-d98ddf49f63e', NULL, NULL),
	('b5d4e2a0-1d52-4ea0-a7ed-abe9b35fea59', 'images', 'items/adrenalineshot.png', NULL, '2024-07-29 00:28:57.224116+00', '2024-07-29 00:28:57.224116+00', '2024-07-29 00:28:57.224116+00', '{"eTag": "\"2eaf57d2e5c46e64544141a81b712fb1-1\"", "size": 7447, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:57.000Z", "contentLength": 7447, "httpStatusCode": 200}', '1cff1d36-8c2f-4ac3-a154-cf57ee20de79', NULL, NULL),
	('934612a4-c5d8-4db8-98c2-e8cbd6054f54', 'images', 'items/rawhide.png', NULL, '2024-07-29 00:28:57.263985+00', '2024-07-29 00:28:57.263985+00', '2024-07-29 00:28:57.263985+00', '{"eTag": "\"728888ac8830374a79635a3d32512159-1\"", "size": 11567, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:57.000Z", "contentLength": 11567, "httpStatusCode": 200}', '991fb21f-13f9-434a-bfe2-3d33eae6fe02', NULL, NULL),
	('aab91a4d-a453-4ffc-88da-81761a3bcfae', 'images', 'items/copperingot.png', NULL, '2024-07-29 00:28:57.335961+00', '2024-07-29 00:28:57.335961+00', '2024-07-29 00:28:57.335961+00', '{"eTag": "\"3df360ebfe46d9b91142a0b5822ded5d-1\"", "size": 12671, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:57.000Z", "contentLength": 12671, "httpStatusCode": 200}', '4ee7019a-d810-4efc-8401-3235a3d2425c', NULL, NULL),
	('71469565-778c-4a3e-a948-1db389196f02', 'images', 'items/bait.png', NULL, '2024-07-29 00:28:58.654261+00', '2024-07-29 00:28:58.654261+00', '2024-07-29 00:28:58.654261+00', '{"eTag": "\"b5765f9f16afb2a204c9896cd8fffa08-1\"", "size": 6815, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:59.000Z", "contentLength": 6815, "httpStatusCode": 200}', 'f0a96f5d-56bc-45f3-8e9d-beb5fe373b31', NULL, NULL),
	('019528f8-a0ef-483b-967f-6028f513bf99', 'images', 'items/steelingot.png', NULL, '2024-07-29 00:28:59.442969+00', '2024-07-29 00:28:59.442969+00', '2024-07-29 00:28:59.442969+00', '{"eTag": "\"d99bfe29a12ff07a744aad65d69b5e9d-1\"", "size": 12959, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:59.000Z", "contentLength": 12959, "httpStatusCode": 200}', 'bc16862f-73ab-4929-941a-df2f23b182e1', NULL, NULL),
	('282a57aa-8699-4d1b-83ab-47f888433930', 'images', 'items/doughfishbait.png', NULL, '2024-07-29 00:28:59.70827+00', '2024-07-29 00:28:59.70827+00', '2024-07-29 00:28:59.70827+00', '{"eTag": "\"f0bfee263aed64b05258206e39f0441b-1\"", "size": 8012, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:59.000Z", "contentLength": 8012, "httpStatusCode": 200}', 'ce8fdd58-3871-40d2-9b4e-1710d62cbfd3', NULL, NULL),
	('72c74b29-afca-4061-a3e0-d7889a0a4461', 'images', 'items/livingarmor.png', NULL, '2024-07-29 00:28:57.038989+00', '2024-07-29 00:28:57.038989+00', '2024-07-29 00:28:57.038989+00', '{"eTag": "\"5d7a8f5824face76977db12ce7cb3dac-1\"", "size": 8639, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:57.000Z", "contentLength": 8639, "httpStatusCode": 200}', 'e0cf9623-0c52-4ceb-ba13-04b62dce5dea', NULL, NULL),
	('a06234b3-2106-4aed-b431-17e9b5e60d53', 'images', 'items/cornale.PNG', NULL, '2024-07-29 08:40:05.911015+00', '2024-07-29 08:40:05.911015+00', '2024-07-29 08:40:05.911015+00', '{"eTag": "\"9c4141c6dbed33e173ddbbe3b8281559-1\"", "size": 12458, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T08:40:06.000Z", "contentLength": 12458, "httpStatusCode": 200}', '0eb28f55-e7d2-44a0-8e43-65c40ae9fa37', NULL, NULL),
	('089e95f5-6b82-4f48-a593-81849b6acdf5', 'images', 'items/maltale.PNG', NULL, '2024-07-29 08:40:08.58148+00', '2024-07-29 08:40:08.58148+00', '2024-07-29 08:40:08.58148+00', '{"eTag": "\"776fa29589558f82460a76228e50a853-1\"", "size": 12074, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T08:40:09.000Z", "contentLength": 12074, "httpStatusCode": 200}', '3744fb64-d119-4806-9556-b2359820c5cd', NULL, NULL),
	('3eb50a31-6b23-4873-8d07-589679398cd6', 'images', 'items/quickactivator.png', NULL, '2024-07-29 00:28:57.356953+00', '2024-07-29 00:28:57.356953+00', '2024-07-29 00:28:57.356953+00', '{"eTag": "\"66c8df1e288bbeaf1ca5e346b6df22bd-1\"", "size": 9298, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:57.000Z", "contentLength": 9298, "httpStatusCode": 200}', '43a36f37-a4c1-49bd-bf3e-1c85d197b96a', NULL, NULL),
	('abe2ba1a-b9d6-4bc6-89a1-9d8f740ef7b5', 'images', 'items/aluminumingot.png', NULL, '2024-07-29 09:05:30.902945+00', '2024-07-29 09:05:30.902945+00', '2024-07-29 09:05:30.902945+00', '{"eTag": "\"f2bd31451efd3901049d99cf5ee41206-1\"", "size": 17796, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T09:05:31.000Z", "contentLength": 17796, "httpStatusCode": 200}', '2be98a6c-3ada-4046-ba32-9808a0e8b791', NULL, NULL),
	('3b573173-0d01-4aa4-a896-d078aacfdd2f', 'images', 'items/metalscrap.PNG', NULL, '2024-07-29 00:28:59.021441+00', '2024-07-29 00:28:59.021441+00', '2024-07-29 00:28:59.021441+00', '{"eTag": "\"540fe3562f1ca0655cc163ebc2373e24-1\"", "size": 12148, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:59.000Z", "contentLength": 12148, "httpStatusCode": 200}', 'f3742865-d8b5-457a-bcf3-61ebcb7707ac', NULL, NULL),
	('0cb8eccf-3f80-4612-9246-dc47a3307a97', 'images', 'items/acid.png', NULL, '2024-07-29 00:28:57.199784+00', '2024-07-29 00:28:57.199784+00', '2024-07-29 00:28:57.199784+00', '{"eTag": "\"aa08c73ec0bfcb6a17e853c267656060-1\"", "size": 3016, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:57.000Z", "contentLength": 3016, "httpStatusCode": 200}', '461c776e-c66d-4003-be92-1359ff852d1a', NULL, NULL),
	('4106ae70-0ea4-4d75-a8a7-5a09c5c7d8e4', 'images', 'items/glass.png', NULL, '2024-07-29 00:28:57.257395+00', '2024-07-29 00:28:57.257395+00', '2024-07-29 00:28:57.257395+00', '{"eTag": "\"339d06d394498e3924063b076795c823-1\"", "size": 13379, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:57.000Z", "contentLength": 13379, "httpStatusCode": 200}', 'c71ceb34-3723-4c0e-ad86-0752c65ab781', NULL, NULL),
	('d91e9f9a-4103-4a0a-ba79-9c6da8698db4', 'images', 'items/energylink.png', NULL, '2024-07-29 00:28:57.271344+00', '2024-07-29 00:28:57.271344+00', '2024-07-29 00:28:57.271344+00', '{"eTag": "\"4c665c6c417087c17ab1d8ef9d94506c-1\"", "size": 1397, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:57.000Z", "contentLength": 1397, "httpStatusCode": 200}', 'aabf4c23-76e5-4737-8af9-9e9218c2b81a', NULL, NULL),
	('77098cca-2011-49d4-9a5e-38d321824795', 'images', 'items/bronzeingot.png', NULL, '2024-07-29 00:28:59.034726+00', '2024-07-29 00:28:59.034726+00', '2024-07-29 00:28:59.034726+00', '{"eTag": "\"86139280e7a769eef7aee4d2b12e3d72-1\"", "size": 11745, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:59.000Z", "contentLength": 11745, "httpStatusCode": 200}', 'bae3d89e-417d-4ff0-af5b-fb48a40de759', NULL, NULL),
	('f34710b2-5bac-4ea2-9d71-1593ef3e1c76', 'images', 'items/activator.png', NULL, '2024-07-29 00:28:59.341196+00', '2024-07-29 00:28:59.341196+00', '2024-07-29 00:28:59.341196+00', '{"eTag": "\"3bdb0a80bc0baed284206b4b8ee80e85-1\"", "size": 5666, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:28:59.000Z", "contentLength": 5666, "httpStatusCode": 200}', '750eb49e-f5e1-4127-87d8-1dd48cf9f7b4', NULL, NULL),
	('76f718eb-9bf6-4e57-bd87-1ef9583ca897', 'images', 'items/vanadiumcrystal.PNG', NULL, '2024-07-29 00:28:59.847172+00', '2024-07-29 00:28:59.847172+00', '2024-07-29 00:28:59.847172+00', '{"eTag": "\"4ed2953194bcd90e2f8492a99868c673-1\"", "size": 13639, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:29:00.000Z", "contentLength": 13639, "httpStatusCode": 200}', 'afb83d28-1b7b-4111-bc0c-d202058ed173', NULL, NULL),
	('46725364-ab9b-4036-a534-5fa0fecbc51a', 'images', 'items/gravellogonthego.PNG', NULL, '2024-07-29 00:28:57.194707+00', '2024-07-29 00:30:44.177056+00', '2024-07-29 00:28:57.194707+00', '{"eTag": "\"0626da946ed6ea23c7345ba5fdbde628\"", "size": 11255, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T00:30:45.000Z", "contentLength": 11255, "httpStatusCode": 200}', '56940ab6-9c8b-4ef0-bae9-037835fa6e3c', NULL, NULL),
	('fd49f058-cb54-4262-ba49-65223e81520c', 'images', 'items/fireproofplastic.PNG', NULL, '2024-07-29 02:01:23.39104+00', '2024-07-29 02:01:23.39104+00', '2024-07-29 02:01:23.39104+00', '{"eTag": "\"7751626a381b096f1ca6b3671dfdcbcc-1\"", "size": 10829, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:24.000Z", "contentLength": 10829, "httpStatusCode": 200}', '4fd4a02f-9071-4f4a-8a13-61d9e34ee305', NULL, NULL),
	('ba967bff-3d04-4676-93b4-7e99989c3642', 'images', 'items/goldingot.PNG', NULL, '2024-07-29 02:01:23.499201+00', '2024-07-29 02:01:23.499201+00', '2024-07-29 02:01:23.499201+00', '{"eTag": "\"853de717e02bd40e969fc48e2309c6a0-1\"", "size": 6249, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:24.000Z", "contentLength": 6249, "httpStatusCode": 200}', '028c9b7f-4580-4033-820d-e1e5c30fe4ae', NULL, NULL),
	('06f730ef-0698-4648-b7be-2bb1fd9b14e5', 'images', 'items/engineeringplastic.PNG', NULL, '2024-07-29 02:01:23.393994+00', '2024-07-29 02:01:23.393994+00', '2024-07-29 02:01:23.393994+00', '{"eTag": "\"2fdac722e38ee07d303214639d1874a0-1\"", "size": 13815, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:24.000Z", "contentLength": 13815, "httpStatusCode": 200}', '9b92a272-d828-46a6-82e4-59d30afb2b66', NULL, NULL),
	('d49ab727-7810-45c0-9302-2598953724f7', 'images', 'items/goldore.PNG', NULL, '2024-07-29 02:01:23.592792+00', '2024-07-29 02:01:23.592792+00', '2024-07-29 02:01:23.592792+00', '{"eTag": "\"866cda6d0178bd892962bf984836a961-1\"", "size": 13338, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:24.000Z", "contentLength": 13338, "httpStatusCode": 200}', 'c1836b83-5c65-4f29-9b2f-e3602779fb89', NULL, NULL),
	('5dfa1129-9e40-4ad4-93a0-f6bce9b166b4', 'images', 'items/copperore.PNG', NULL, '2024-07-29 02:01:23.616812+00', '2024-07-29 02:01:23.616812+00', '2024-07-29 02:01:23.616812+00', '{"eTag": "\"5d421b1ce24a0e3fb22ad61f5324e765-1\"", "size": 13144, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:24.000Z", "contentLength": 13144, "httpStatusCode": 200}', '72743243-64ed-435a-bfe0-d72e11db5d11', NULL, NULL),
	('24bb7962-263f-4528-82b5-2f9ed12bd386', 'images', 'items/gunpowder.PNG', NULL, '2024-07-29 02:01:23.616285+00', '2024-07-29 02:01:23.616285+00', '2024-07-29 02:01:23.616285+00', '{"eTag": "\"e9ddabdbe96948ecf281a47619315865-1\"", "size": 9397, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:24.000Z", "contentLength": 9397, "httpStatusCode": 200}', '43ea08b0-9455-4daa-8fff-20dbf1e9ec77', NULL, NULL),
	('a9ca3625-84c9-4c61-83ba-09fd17a718e2', 'images', 'items/electricrockdrill.PNG', NULL, '2024-07-29 02:01:23.716375+00', '2024-07-29 02:01:23.716375+00', '2024-07-29 02:01:23.716375+00', '{"eTag": "\"1a3e01783574ebeff7ec87119e8fc8d8-1\"", "size": 7890, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:24.000Z", "contentLength": 7890, "httpStatusCode": 200}', 'f858f2ba-c876-4139-89d5-19fea09b5367', NULL, NULL),
	('3f5455c8-4adf-4130-9e6d-75e5dd6a62fc', 'images', 'items/gravel.PNG', NULL, '2024-07-29 02:01:24.263345+00', '2024-07-29 02:01:24.263345+00', '2024-07-29 02:01:24.263345+00', '{"eTag": "\"5a40e193ec76f87cd478647676416489-1\"", "size": 12033, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:24.000Z", "contentLength": 12033, "httpStatusCode": 200}', '5ad8a2f9-3136-4cd3-bda3-1b374541d640', NULL, NULL),
	('039c4826-958e-499d-b27a-7c39e98f35b5', 'images', 'items/barreledpremiumfuel.PNG', NULL, '2024-07-29 02:01:24.426693+00', '2024-07-29 02:01:24.426693+00', '2024-07-29 02:01:24.426693+00', '{"eTag": "\"252282290a6c1c57776ec1f2ecbe5d0c-1\"", "size": 12249, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:24.000Z", "contentLength": 12249, "httpStatusCode": 200}', '3e702349-8120-4e87-9e64-43190f5e5225', NULL, NULL),
	('a0fd2a78-d856-4c9f-aee0-60c16c77f8d1', 'images', 'items/carbonfiberfabric.PNG', NULL, '2024-07-29 02:01:24.501413+00', '2024-07-29 02:01:24.501413+00', '2024-07-29 02:01:24.501413+00', '{"eTag": "\"c3a9d2cf3c0a1189670bd16bbdb631ca-1\"", "size": 14722, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:24.000Z", "contentLength": 14722, "httpStatusCode": 200}', 'bd24e8b4-31c8-4abf-908a-a8383a92c01c', NULL, NULL),
	('e8b533e2-fdff-4a81-a241-09190fe3cce9', 'images', 'items/purewater.PNG', NULL, '2024-07-29 09:38:05.719112+00', '2024-07-29 09:38:05.719112+00', '2024-07-29 09:38:05.719112+00', '{"eTag": "\"f48e444e0e7f921f9acd8d8e5ae0905c-1\"", "size": 15287, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T09:38:06.000Z", "contentLength": 15287, "httpStatusCode": 200}', '88d6ed7c-4fc5-4e1c-8749-f1fa670d4369', NULL, NULL),
	('e819e1e3-2668-4581-b083-3e2ec524e7a8', 'images', 'items/loggingchainsaw.PNG', NULL, '2024-07-29 02:01:25.859469+00', '2024-07-29 02:01:25.859469+00', '2024-07-29 02:01:25.859469+00', '{"eTag": "\"9247c145fa64d35b36ff6655469f0374-1\"", "size": 9197, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:26.000Z", "contentLength": 9197, "httpStatusCode": 200}', '17cec4ab-6c51-4a19-b9b5-e1ebd1df5c5e', NULL, NULL),
	('9c324c92-7f3b-4f69-bcd9-1c6ac95638a8', 'images', 'items/specialpart.PNG', NULL, '2024-07-29 02:01:28.256479+00', '2024-07-29 02:01:28.256479+00', '2024-07-29 02:01:28.256479+00', '{"eTag": "\"37bbfac97d3ac63778c44481b1d76000-1\"", "size": 10762, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:28.000Z", "contentLength": 10762, "httpStatusCode": 200}', '96374428-7ddd-4847-a6fa-728ed8369801', NULL, NULL),
	('baa24f58-f47d-4c79-9a0b-8c6edec6910b', 'images', 'items/log.PNG', NULL, '2024-07-29 02:01:26.232418+00', '2024-07-29 02:01:26.232418+00', '2024-07-29 02:01:26.232418+00', '{"eTag": "\"eb41552f97a99405368c0564d5dc4d95-1\"", "size": 12956, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:26.000Z", "contentLength": 12956, "httpStatusCode": 200}', '0a60a3c1-66b5-4b19-8530-be8819b8c922', NULL, NULL),
	('5ab11dbc-fd2c-45bc-8658-ff0c0874e819', 'images', 'items/solardrill.png', NULL, '2024-08-04 15:06:04.945545+00', '2024-08-04 15:06:04.945545+00', '2024-08-04 15:06:04.945545+00', '{"eTag": "\"fe056897062c7cad004271cc7752b75f-1\"", "size": 4168, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-08-04T15:06:05.000Z", "contentLength": 4168, "httpStatusCode": 200}', '71025458-8b22-4c99-8e73-2dcae6051d9d', NULL, NULL),
	('12edde03-0780-4418-9f6f-23254343c4aa', 'images', 'items/sulfur.PNG', NULL, '2024-07-29 02:01:28.239604+00', '2024-07-29 02:01:28.239604+00', '2024-07-29 02:01:28.239604+00', '{"eTag": "\"abbef88ec44a565b19005644f64cd7d2-1\"", "size": 13627, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:28.000Z", "contentLength": 13627, "httpStatusCode": 200}', '62ca39c9-bade-490b-99c9-85cfeaf5d018', NULL, NULL),
	('c63c9873-5e2e-456c-91d5-f5bfb0f9f5d1', 'images', 'items/backpack_expansion.png', NULL, '2024-09-02 06:33:34.969846+00', '2024-09-02 06:33:34.969846+00', '2024-09-02 06:33:34.969846+00', '{"eTag": "\"a42375923b893da1ff2a15b0df3569e8-1\"", "size": 10942, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-09-02T06:33:35.000Z", "contentLength": 10942, "httpStatusCode": 200}', 'cdaf025c-6160-4a17-816b-178f0fa973dc', NULL, NULL),
	('ab81c8c7-9c67-441b-95da-88e3829a75fa', 'images', 'items/adhesive.PNG', NULL, '2024-07-29 02:01:28.630725+00', '2024-07-29 02:01:28.630725+00', '2024-07-29 02:01:28.630725+00', '{"eTag": "\"b804bcc45f2f0f01f4d977a427f4b1ae-1\"", "size": 10832, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:29.000Z", "contentLength": 10832, "httpStatusCode": 200}', '0d3738a0-f791-4b49-8c0f-80ad25719fed', NULL, NULL),
	('09c440a1-5397-49be-bf56-9e72131f5bc0', 'images', 'items/alloypickaxe.PNG', NULL, '2024-07-29 02:01:29.9973+00', '2024-07-29 02:01:29.9973+00', '2024-07-29 02:01:29.9973+00', '{"eTag": "\"cacbe7d941dc84b4f1b62c507b5fbb90-1\"", "size": 8679, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:30.000Z", "contentLength": 8679, "httpStatusCode": 200}', 'a95fba14-3fe6-4dbc-9546-a9dd452b035b', NULL, NULL),
	('9c69c9ff-c874-415a-ba21-f288d8d6f5df', 'images', 'items/rubber.PNG', NULL, '2024-07-29 02:01:26.179421+00', '2024-07-29 02:01:26.179421+00', '2024-07-29 02:01:26.179421+00', '{"eTag": "\"09bbe54f60b18662867d98c4fa8896f4-1\"", "size": 11185, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:26.000Z", "contentLength": 11185, "httpStatusCode": 200}', '61322ff0-b769-4417-86e7-05a02ae822c7', NULL, NULL),
	('d12dfcee-bf23-428d-a734-56edd4ba5009', 'images', 'items/advancedelectricrockdrill.PNG', NULL, '2024-07-29 02:01:28.093876+00', '2024-07-29 02:01:28.093876+00', '2024-07-29 02:01:28.093876+00', '{"eTag": "\"39ee20fcf4cdf1631c00562db21642a6-1\"", "size": 9589, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:28.000Z", "contentLength": 9589, "httpStatusCode": 200}', '9baea36f-4be4-4fba-a3e9-8cc037a09371', NULL, NULL),
	('f90f9615-dc7f-4442-b9f2-657f93a35162', 'images', 'items/mushroomseed.PNG', NULL, '2024-07-29 02:01:26.081074+00', '2024-07-29 02:01:26.081074+00', '2024-07-29 02:01:26.081074+00', '{"eTag": "\"82e481577fac60b79d3c4a686f3211ef-1\"", "size": 15711, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:26.000Z", "contentLength": 15711, "httpStatusCode": 200}', 'd84ed387-8270-4fcb-b249-53ab14e569ac', NULL, NULL),
	('0384092a-d676-49fc-b090-2c13c2354bce', 'images', 'items/tungstenalloypickaxe.PNG', NULL, '2024-07-29 02:01:28.229569+00', '2024-07-29 02:01:28.229569+00', '2024-07-29 02:01:28.229569+00', '{"eTag": "\"7bbbc448a4e593b93ce37c2d7aedb796-1\"", "size": 8214, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:28.000Z", "contentLength": 8214, "httpStatusCode": 200}', '3305d096-4b87-4340-b701-3d127efac1e8', NULL, NULL),
	('b9a42f30-6d08-48a4-b2f6-24d0816c94da', 'images', 'items/refinedpart.PNG', NULL, '2024-07-29 02:01:26.554163+00', '2024-07-29 02:01:26.554163+00', '2024-07-29 02:01:26.554163+00', '{"eTag": "\"ed9f38cec27f25b62faffe20bcc4970c-1\"", "size": 10452, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:26.000Z", "contentLength": 10452, "httpStatusCode": 200}', 'cae23655-f10f-464b-871f-9309370c39b5', NULL, NULL),
	('c79e55c9-76de-49ff-af86-9bfd5f357d16', 'images', 'items/silverore.PNG', NULL, '2024-07-29 02:01:28.297223+00', '2024-07-29 02:01:28.297223+00', '2024-07-29 02:01:28.297223+00', '{"eTag": "\"9124a40432fb52d221a9483a268dfc88-1\"", "size": 16406, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:28.000Z", "contentLength": 16406, "httpStatusCode": 200}', 'dc2dd3b7-7de5-4b33-a41d-7862d91bc151', NULL, NULL),
	('2e2c11b9-a1b2-42dd-a466-2fc0f65300d6', 'images', 'items/longactingactivator.PNG', NULL, '2024-07-29 02:01:26.547225+00', '2024-07-29 02:01:26.547225+00', '2024-07-29 02:01:26.547225+00', '{"eTag": "\"2bc2e5954ebf982bd7c928a43d455fa2-1\"", "size": 6049, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:27.000Z", "contentLength": 6049, "httpStatusCode": 200}', '0902d8b8-c9a9-4552-b8bd-be83be2c2ddb', NULL, NULL),
	('a8bde326-89c1-4304-93f4-c74cef2b5ceb', 'images', 'items/tinore.PNG', NULL, '2024-07-29 02:01:27.946852+00', '2024-07-29 02:01:27.946852+00', '2024-07-29 02:01:27.946852+00', '{"eTag": "\"0cc969af2ab30285fcc32c5fdbf16159-1\"", "size": 15135, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:28.000Z", "contentLength": 15135, "httpStatusCode": 200}', '126d917a-f69b-4c60-9b12-3fc081967bca', NULL, NULL),
	('2731388b-0910-4705-90e2-3adc3cab30dd', 'images', 'items/quicklongactingactivator.PNG', NULL, '2024-07-29 02:01:26.455517+00', '2024-07-29 02:01:26.455517+00', '2024-07-29 02:01:26.455517+00', '{"eTag": "\"b4cf402ffc6fc0b9bade862dd463eb9b-1\"", "size": 9081, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:26.000Z", "contentLength": 9081, "httpStatusCode": 200}', '4d543a4d-163d-40ff-a63c-c24d55e20325', NULL, NULL),
	('7ca06d06-901c-45d9-8306-1c49f941c484', 'images', 'items/stardustsource.PNG', NULL, '2024-07-29 02:01:28.144738+00', '2024-07-29 02:01:28.144738+00', '2024-07-29 02:01:28.144738+00', '{"eTag": "\"a7ec8423a9dec041eeceac64ff7cf0b7-1\"", "size": 13677, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:28.000Z", "contentLength": 13677, "httpStatusCode": 200}', 'a58e0bee-1a18-4687-8880-e37d0007503f', NULL, NULL),
	('64c43049-2a77-4d8d-8726-76b255683629', 'images', 'items/silveringot.PNG', NULL, '2024-07-29 02:01:28.402252+00', '2024-07-29 02:01:28.402252+00', '2024-07-29 02:01:28.402252+00', '{"eTag": "\"18662181f9094d89e4db916e3170fe99-1\"", "size": 6067, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:28.000Z", "contentLength": 6067, "httpStatusCode": 200}', '7dbc4dfc-b016-4b0f-932c-4b5e7022eaa5', NULL, NULL),
	('f7edb5e2-5ff6-43bd-ad16-4c46911ba0e2', 'images', 'items/iridiumcrystal.PNG', NULL, '2024-07-29 02:01:25.957209+00', '2024-07-29 02:01:25.957209+00', '2024-07-29 02:01:25.957209+00', '{"eTag": "\"1542e01cc19ee959d72d9966aa1b438f-1\"", "size": 14081, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:26.000Z", "contentLength": 14081, "httpStatusCode": 200}', '31ab582a-9e96-42cc-836a-117e1706e7ce', NULL, NULL),
	('612298e1-6027-4a1f-813d-0345d7f0059d', 'images', 'items/ironore.PNG', NULL, '2024-07-29 02:01:26.089841+00', '2024-07-29 02:01:26.089841+00', '2024-07-29 02:01:26.089841+00', '{"eTag": "\"5f367dc51e65d92340da65f1140354f4-1\"", "size": 14468, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:26.000Z", "contentLength": 14468, "httpStatusCode": 200}', '747c5507-792c-419b-ac3e-35545d8c9ad4', NULL, NULL),
	('398079af-8716-463c-bd52-108751658faf', 'images', 'items/stardustore.PNG', NULL, '2024-07-29 02:01:28.425787+00', '2024-07-29 02:01:28.425787+00', '2024-07-29 02:01:28.425787+00', '{"eTag": "\"4c09b0b30c23f33a5b3cdb58da67d526-1\"", "size": 11655, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:29.000Z", "contentLength": 11655, "httpStatusCode": 200}', '3fcfa617-8d1f-4832-97a8-18815499576c', NULL, NULL),
	('2e5feaba-3d6a-4217-817a-5439debeca98', 'images', 'items/advancedloggingchainsaw.PNG', NULL, '2024-07-29 02:01:30.354487+00', '2024-07-29 02:01:30.354487+00', '2024-07-29 02:01:30.354487+00', '{"eTag": "\"bf25aea4065715401e0fcb1ecd78529d-1\"", "size": 8807, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:31.000Z", "contentLength": 8807, "httpStatusCode": 200}', 'be3728c8-4d1b-4315-8237-7d7fb05a41a2', NULL, NULL),
	('e5b5ef54-4870-4973-8db0-6c74f900d117', 'images', 'items/portablemixedfuel.PNG', NULL, '2024-07-29 02:01:25.984316+00', '2024-07-29 02:01:25.984316+00', '2024-07-29 02:01:25.984316+00', '{"eTag": "\"162e311c1fae2f4b281c90aa81c076f1-1\"", "size": 14567, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2024-07-29T02:01:26.000Z", "contentLength": 14567, "httpStatusCode": 200}', 'f9a05695-dcee-4499-a846-75896f53b329', NULL, NULL);


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."categories_id_seq"', 7, true);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."items_id_seq"', 56, true);


--
-- Name: items_listings_ask_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."items_listings_ask_id_seq"', 38, true);


--
-- Name: items_listings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."items_listings_id_seq"', 29, true);


--
-- Name: listings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."listings_id_seq"', 27, true);


--
-- Name: user_reputation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."user_reputation_id_seq"', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 16, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
