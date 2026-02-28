import { fetchHtml } from './fetchHtml';
import scrapSchedule from "@/lib/scrapeSchedule";

const schedule = async () => {
  const data = await fetchHtml(`/jadwal-rilis`);
  const result = scrapSchedule(data);

  return result;
};

export default schedule;