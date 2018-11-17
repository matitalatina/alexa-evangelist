import axios from "axios";
import { format } from "date-fns";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class LiturgyClient {
  public async getCurrentGospel(): Promise<string> {
    const options = {
      url: `https://publication.evangelizo.ws/IT/days/${format(new Date(), "YYYY-MM-DD")}?include=readings`,
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Referer": "https://vangelodelgiorno.org/IT/gospel/",
        "Origin": "https://vangelodelgiorno.org",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
      },
      method: "GET",
    };
    const response = await axios(options);
    const gospel = response.data.data.readings.filter((r: any) => r.book_type === "gospel")[0];
    return gospel ? gospel.text.replace(/\[\[.*\]\]/g, "") : "Purtroppo non riesco a recuperare il Vangelo di oggi.";
  }
}
