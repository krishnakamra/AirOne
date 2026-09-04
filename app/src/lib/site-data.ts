/**
 * AirOne catalog data. Fares, stays and destinations are the agency's own
 * inventory: plausible, internally consistent and quoted in USD.
 */

export const AGENCY = {
  name: "AirOne",
  legalName: "AirOne Travel Agency",
  tagline: "Last minute flights and stays across North America",
  email: "info@airone.ca",
  phone: "+1 (942) 388-2017",
  phoneHref: "tel:+19423882017",
  street: "401 N Michigan Ave, Suite 1200",
  city: "Chicago",
  region: "IL",
  postal: "60611",
  country: "United States",
  hub: "ORD",
  hours: "24 hours, 7 days",
  founded: "2016",
} as const;

export const NAV = [
  { label: "Flights", to: "/flights" },
  { label: "Stays", to: "/stays" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export type Fare = {
  id: string;
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  depart: string;
  duration: string;
  stops: string;
  cabin: string;
  seats: number;
  price: number;
  region: "domestic" | "canada" | "mexico" | "caribbean";
};

export const FARES: Fare[] = [
  { id: "ao-1401", from: "ORD", fromCity: "Chicago", to: "MIA", toCity: "Miami", depart: "Thu 11 Sep", duration: "3h 05m", stops: "Nonstop", cabin: "Main", seats: 6, price: 148, region: "domestic" },
  { id: "ao-1402", from: "ORD", fromCity: "Chicago", to: "JFK", toCity: "New York", depart: "Wed 10 Sep", duration: "2h 20m", stops: "Nonstop", cabin: "Main", seats: 11, price: 118, region: "domestic" },
  { id: "ao-1403", from: "ORD", fromCity: "Chicago", to: "YVR", toCity: "Vancouver", depart: "Fri 12 Sep", duration: "4h 40m", stops: "Nonstop", cabin: "Main", seats: 4, price: 224, region: "canada" },
  { id: "ao-1404", from: "ORD", fromCity: "Chicago", to: "SJD", toCity: "Cabo San Lucas", depart: "Sat 13 Sep", duration: "4h 55m", stops: "Nonstop", cabin: "Main", seats: 3, price: 268, region: "mexico" },
  { id: "ao-1405", from: "ORD", fromCity: "Chicago", to: "YYC", toCity: "Calgary", depart: "Sun 14 Sep", duration: "3h 50m", stops: "Nonstop", cabin: "Main", seats: 9, price: 211, region: "canada" },
  { id: "ao-1406", from: "ORD", fromCity: "Chicago", to: "LAX", toCity: "Los Angeles", depart: "Tue 09 Sep", duration: "4h 25m", stops: "Nonstop", cabin: "Main", seats: 7, price: 179, region: "domestic" },
  { id: "ao-1407", from: "JFK", fromCity: "New York", to: "SJU", toCity: "San Juan", depart: "Thu 11 Sep", duration: "4h 05m", stops: "Nonstop", cabin: "Main", seats: 5, price: 194, region: "caribbean" },
  { id: "ao-1408", from: "DFW", fromCity: "Dallas", to: "CUN", toCity: "Cancun", depart: "Fri 12 Sep", duration: "2h 45m", stops: "Nonstop", cabin: "Main", seats: 12, price: 186, region: "mexico" },
  { id: "ao-1409", from: "SEA", fromCity: "Seattle", to: "YVR", toCity: "Vancouver", depart: "Wed 10 Sep", duration: "0h 55m", stops: "Nonstop", cabin: "Main", seats: 14, price: 89, region: "canada" },
  { id: "ao-1410", from: "ATL", fromCity: "Atlanta", to: "MBJ", toCity: "Montego Bay", depart: "Sat 13 Sep", duration: "3h 30m", stops: "Nonstop", cabin: "Main", seats: 2, price: 241, region: "caribbean" },
  { id: "ao-1411", from: "BOS", fromCity: "Boston", to: "YUL", toCity: "Montreal", depart: "Tue 09 Sep", duration: "1h 35m", stops: "Nonstop", cabin: "Main", seats: 8, price: 124, region: "canada" },
  { id: "ao-1412", from: "LAX", fromCity: "Los Angeles", to: "HNL", toCity: "Honolulu", depart: "Sun 14 Sep", duration: "5h 45m", stops: "Nonstop", cabin: "Main", seats: 6, price: 258, region: "domestic" },
];

export const FARE_REGIONS = [
  { id: "all", label: "All fares" },
  { id: "domestic", label: "United States" },
  { id: "canada", label: "Canada" },
  { id: "mexico", label: "Mexico" },
  { id: "caribbean", label: "Caribbean" },
] as const;

export type Destination = {
  code: string;
  city: string;
  region: string;
  image: string;
  note: string;
  from: number;
};

export const DESTINATIONS: Destination[] = [
  { code: "MIA", city: "Miami", region: "Florida", image: "/assets/dest-miami.jpg", note: "Ocean Drive, and a nonstop that leaves Chicago after work.", from: 148 },
  { code: "YVR", city: "Vancouver", region: "British Columbia", image: "/assets/dest-vancouver.jpg", note: "Harbour, mountains and seaplanes, four hours and change away.", from: 224 },
  { code: "JFK", city: "New York", region: "New York", image: "/assets/dest-newyork.jpg", note: "The cheapest seat we hold, most weeks of the year.", from: 118 },
  { code: "SJD", city: "Cabo San Lucas", region: "Baja California Sur", image: "/assets/dest-cabo.jpg", note: "Arch rock, pale sand, and a fare that drops midweek.", from: 268 },
  { code: "YYC", city: "Banff via Calgary", region: "Alberta", image: "/assets/dest-banff.jpg", note: "Ninety minutes from the gate to a glacial lake.", from: 211 },
  { code: "ORD", city: "Chicago", region: "Illinois", image: "/assets/dest-chicago.jpg", note: "Home base. The desk sits twelve floors above Michigan Avenue.", from: 0 },
];

export type Stay = {
  id: string;
  name: string;
  city: string;
  region: string;
  kind: string;
  rate: number;
  nights: string;
  image: string;
  blurb: string;
};

export const STAYS: Stay[] = [
  { id: "st-01", name: "The Ellsworth", city: "Chicago", region: "Illinois", kind: "Boutique hotel", rate: 164, nights: "2 night minimum", image: "/assets/stay-hotel.jpg", blurb: "Twenty eight rooms in a converted 1920s office block, four blocks from the desk." },
  { id: "st-02", name: "Cedar & Pine Lodge", city: "Banff", region: "Alberta", kind: "Lodge", rate: 198, nights: "3 night minimum", image: "/assets/stay-cabin.jpg", blurb: "Timber walls, a stone hearth, and conifers pressed against every window." },
  { id: "st-03", name: "Casa Marea", city: "Cabo San Lucas", region: "Baja California Sur", kind: "Beach suite", rate: 232, nights: "4 night minimum", image: "/assets/stay-beach.jpg", blurb: "Doors that open straight onto the terrace, and the sea past the sand." },
  { id: "st-04", name: "Warehouse No. 9", city: "Vancouver", region: "British Columbia", kind: "Loft apartment", rate: 176, nights: "2 night minimum", image: "/assets/stay-loft.jpg", blurb: "Brick, black steel and a long table, in a converted Gastown warehouse." },
];

export const STAY_CITIES = ["All cities", "Chicago", "Banff", "Cabo San Lucas", "Vancouver"] as const;

export const DESK_STEPS = [
  { n: "01", title: "Tell us the window", body: "Give the desk your dates, or the two weeks you could move inside. Rough is fine, and often cheaper." },
  { n: "02", title: "We work the fare", body: "An agent searches live inventory across our partner platforms and calls back with what is actually bookable." },
  { n: "03", title: "You confirm and fly", body: "Say yes and we ticket it. Your itinerary, seats and stay confirmations land in one email." },
] as const;

export const DESK_FACTS = [
  { value: "24/7", label: "Desk hours" },
  { value: "48h", label: "Fare hold" },
  { value: "$0", label: "Booking fee" },
  { value: "ORD", label: "Home base" },
] as const;

export const FLIGHT_FAQ = [
  { q: "What makes a fare last minute?", a: "Anything departing inside twenty one days. Carriers release unsold seats in that window, and the desk watches for them rather than waiting for you to refresh a results page." },
  { q: "How long will you hold a quoted price?", a: "Forty eight hours. We put the fare on hold under your name, and it either gets ticketed in that window or it goes back." },
  { q: "Do you charge a booking fee?", a: "No. AirOne is paid by the platforms and carriers we book through, so the fare you are quoted is the fare you pay." },
  { q: "Can I change or cancel?", a: "That depends on the fare rules, which we read to you out loud before you confirm. Most discounted last minute fares are changeable for a difference and are not refundable." },
  { q: "What about baggage?", a: "Every quote states the carry on and checked allowance for that specific ticket. If a bag is not included we will price it before you confirm rather than after." },
  { q: "Do you book stays as well?", a: "Yes. Most callers take a flight and a stay together, and the desk will hold both on the same forty eight hour clock." },
] as const;

export const TEAM = [
  { name: "Dana Whitfield", role: "Head of the desk", image: "/assets/team-1.jpg", note: "Nineteen years behind an agency counter, thirteen of them in Chicago." },
  { name: "Marcus Reyes", role: "Fares and contracts", image: "/assets/team-2.jpg", note: "Reads fare rules for a living so that nobody else has to." },
  { name: "Elias Fournier", role: "Stays and ground", image: "/assets/team-3.jpg", note: "Books the rooms, the transfers, and the thing you forgot to ask about." },
] as const;
