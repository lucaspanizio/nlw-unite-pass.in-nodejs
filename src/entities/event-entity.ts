export interface EventProps {
  id: string;
  title: string;
  details?: string | null;
  slug: string;
  maxAttendees?: number | null;
}

export class Event {
  constructor(private props: EventProps) {}

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get slug() {
    return this.props.slug;
  }

  get details() {
    return this.props.details;
  }

  get maxAttendees() {
    return this.props.maxAttendees;
  }
}
