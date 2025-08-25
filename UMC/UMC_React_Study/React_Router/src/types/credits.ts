export type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type Crew = {
  id: number;
  name: string;
  job: string;
};

export type CreditResponse = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};
