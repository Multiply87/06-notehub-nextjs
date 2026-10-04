import NotesPage from "./Notes.client";
import { fetchNotes } from "../../lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page() {
  const queryClient = new QueryClient();
  const page = 1;
  const searchQuery = "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage />
    </HydrationBoundary>
  );
}
