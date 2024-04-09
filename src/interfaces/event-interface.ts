export interface EventProps {
  id: string;
  title: string;
  details?: string | null;
  slug: string;
  maxAttendees?: number | null;
}
