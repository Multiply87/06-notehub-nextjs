"use client";
import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function NoteDetails() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
  });

  return (
    <main className={css.main}>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
      {data && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data.title}</h2>
            </div>
            <p className={css.tag}>{data.tag}</p>
            <p className={css.content}>{data.content}</p>
            <p className={css.date}>
              {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
