import axios from "axios";
import type { Note, NoteFormValues } from "@/types/note";

const apiKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesHttpResponse {
  "notes": Note[],
  "totalPages": number
}

export const fetchNotes = async (
  search: string,
  page: number
): Promise<NotesHttpResponse> => {
  const response = await axios.get<NotesHttpResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        search,
        perPage: 12,
        page,
      },
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data;
};

export const createNote = async (noteData: NoteFormValues): Promise<Note> => {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    noteData,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data;
}