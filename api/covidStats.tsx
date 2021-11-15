import axios from "axios";

export const BASE_URL = "https://api.covid19api.com";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export interface Stats {
  Countries: [
    {
      Country: string;
      CountryCode: string;
      Date: number;
      ID: string;
      NewConfirmed: number;
      NewDeaths: number;
      NewRecovered: number;
      Premium: Object;
      Slug: string;
      TotalConfirmed: number;
      TotalDeaths: number;
      TotalRecovered: number;
    }
  ];
}

export const getStats = async () =>
  (await axiosClient.get<Stats[]>("/summary")).data;
