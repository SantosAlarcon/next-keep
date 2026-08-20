"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { useNewNoteStore } from "@/app/store/newNoteStore";

export function useKeyboardShortcuts(lang: string) {
	const router = useRouter();
	const reset = useNewNoteStore((state) => state.reset);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			const target = e.target as HTMLElement;
			const isInput =
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.isContentEditable;

			if ((e.ctrlKey || e.metaKey) && e.key === "n") {
				e.preventDefault();
				reset();
				router.push(`/${lang}/notes/new`);
			}

			if ((e.ctrlKey || e.metaKey) && e.key === "e") {
				e.preventDefault();
				const path = window.location.pathname;
				const noteMatch = path.match(/\/notes\/(?:all|pinned)\/([^/]+)/);
				const groupNoteMatch = path.match(/\/groups\/[^/]+\/([^/]+)/);
				const noteId = noteMatch?.[1] || groupNoteMatch?.[1];
				if (noteId) {
					router.push(`/${lang}/notes/edit/${noteId}`);
				}
			}

			if (e.key === "Escape") {
				router.back();
			}

			if (e.key === "/" && !isInput) {
				e.preventDefault();
				const filterInput = document.querySelector<HTMLInputElement>(
					'input[placeholder]',
				);
				if (filterInput) {
					filterInput.focus();
				}
			}
		},
		[lang, router, reset],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);
}
