export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    title: "React Summit",
    image: "/images/event1.png",
    slug: "react-summit-2024",
    location: "Amsterdam, Netherlands",
    date: "2024-06-13",
    time: "09:00 AM",
  },
  {
    title: "TypeScript Congress",
    image: "/images/event2.png",
    slug: "typescript-congress-2024",
    location: "Berlin, Germany",
    date: "2024-07-18",
    time: "10:00 AM",
  },
  {
    title: "Node.js Interactive",
    image: "/images/event3.png",
    slug: "nodejs-interactive-2024",
    location: "Dublin, Ireland",
    date: "2024-09-12",
    time: "08:30 AM",
  },
  {
    title: "GitHub Universe",
    image: "/images/event4.png",
    slug: "github-universe-2024",
    location: "San Francisco, CA",
    date: "2024-10-29",
    time: "09:00 AM",
  },
];
