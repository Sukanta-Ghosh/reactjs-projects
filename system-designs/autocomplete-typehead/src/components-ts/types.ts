export interface AutocompleteProps {
  fetchSuggestions?: (query: string) => Promise<string[]>;
  caching?: boolean;
  dataKey?: string;
  customloading?: string;
  placeholder?: string;
  staticData?: string[];
}

export interface SuggestionsListProps {
  suggestions: Array<string>;
  highlight: string;
  onSuggestionClick: (suggestion: string) => void;
  selectedIndex: number;
  dataKey?: string;
}

// Type definition for cached data
export interface CachedData<T> {
  data: T;
  timestamp: number;
}
