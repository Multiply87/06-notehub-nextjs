"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import type { Note } from "@/types/note";
import { fetchNotes } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";

function NotesPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isCreateNote, setIsCreateNote] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["notes", searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, 300);

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearchChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsCreateNote(true)}>
          Create note +
        </button>
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      {isCreateNote && (
        <Modal onClose={() => setIsCreateNote(false)}>
          <NoteForm onClose={() => setIsCreateNote(false)} />
        </Modal>
      )}
    </div>
  );
}

export default NotesPage;
