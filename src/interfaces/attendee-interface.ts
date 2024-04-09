export interface AttendeeProps {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  eventId: string;
  checkInId?: number | null;
}
