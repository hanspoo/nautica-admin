--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.2)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.2)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book (
    id text NOT NULL,
    title text NOT NULL,
    author text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "modifiedAt" timestamp(6) with time zone
);


ALTER TABLE public.book OWNER TO postgres;

--
-- Name: planet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planet (
    id text NOT NULL,
    name text NOT NULL,
    diameter integer NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "modifiedAt" timestamp(6) with time zone
);


ALTER TABLE public.planet OWNER TO postgres;

--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book (id, title, author, "createdAt", "modifiedAt") FROM stdin;
\.


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planet (id, name, diameter, description, "createdAt", "modifiedAt") FROM stdin;
a2a2c58e-8c19-4288-8949-d3e7e5d7de8e	Mars	6779	The red planet	2025-04-17 09:22:45.748-04	\N
c87d56ce-1286-4a05-bc28-47d84779f609	Venus	12104	The planet of love	2025-04-17 09:28:55.139-04	\N
07a0f817-bee2-45ff-82ca-5a8141c99440	Earth	12756	Best planet	2025-04-17 08:38:24.783-04	\N
\.


--
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (id);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (id);


--
-- Name: book_title_author_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX book_title_author_key ON public.book USING btree (title, author);


--
-- Name: planet_name_description_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX planet_name_description_key ON public.planet USING btree (name, description);


--
-- PostgreSQL database dump complete
--

