import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearchChange: (query: string) => void;
}

export default function SearchBox({ onSearchChange }: SearchBoxProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes..."
      onChange={handleInputChange}
    />
  );
}
