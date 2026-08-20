<p align="center"><img src="https://next-keep.netlify.app/NextKeepText.svg" width=640 /></p>

# Table of contents
* [Introduction](#introduction)
* [Features](#features)
    * [Note Taking and Group Management](#note-taking-and-group-management)
    * [Markdown Support](#markdown-support)
    * [Other Features](#other-features)
* [Tech Stack](#tech-stack)
* [Deployment](#deployment)
* [Localization](#localization)

## Introduction
**Next Keep** is a web application where users can take notes and manage groups for easy organization. This application has a built-in **Markdown** editor, so the user can use this markup language to stylize its notes.

The main purpose of this project is to help **programmers**, **tech users**, **content creators**, among others, to keep their ideas well organized to **become more productive** and keep them in one place.

<p align="center"><img src="https://next-keep.netlify.app/mockup.webp" width=1024 /></p>

## Features
### Note Taking and Group Management

* Create and organize notes within groups for better structure.
* Easily manage groups to keep your notes categorized.

### Markdown Support
* Leverage the power of Markdown for rich text formatting in your notes.
* Enhance your notes with headings, bold, italics, and more.

### Other Features

* Light and Dark theme options for user preference.
* Keyboard shortcuts for power users (Ctrl+N, Ctrl+E, Escape, /).
* Note export as Markdown files.
* Mobile-responsive layout with collapsible sidebar.
* Unsaved changes warning when leaving the editor.

## Tech Stack
+ [**Next.js 16**](https://www.nextjs.org): React framework by [**Vercel**](https://www.vercel.com) with App Router.
+ [**PrimeReact**](https://primereact.org): UI component library by **Prime**.
+ [**Sonner**](https://sonner.emilkowal.ski/): toast and notification library.
+ [**@uiw/react-md-editor**](https://uiwjs.github.io/react-markdown-editor/): Markdown editor with plugin support.
+ [**@uiw/react-markdown-preview**](https://uiwjs.github.io/react-markdown-preview/): Markdown previewer with plugin support.
+ [**Appwrite**](https://appwrite.io): BaaS with NO-SQL database, auth management, storage, and API.
+ [**Zustand**](https://zustand.docs.pmnd.rs/getting-started/introduction): lightweight global state library.
+ [**TanStack Query**](https://tanstack.com/query): async state management and data fetching.
+ [**Zod**](https://zod.dev): TypeScript-first schema validation.
+ [**i18next**](https://www.i18next.com): internationalization framework with **next-i18next** integration.
+ [**Rehype**](https://rehypejs.com) / [**Remark**](https://remark.js.org): Markdown processing plugins (GFM, syntax highlighting, sanitization).

## Deployment
This project is currently hosted at **Netlify**. Any commit made on this repo triggers a new redeploy.

## Localization
Next Keep is available in **6 languages**: English, Castilian Spanish, Catalan, Simplified Chinese, Japanese, and Korean.
