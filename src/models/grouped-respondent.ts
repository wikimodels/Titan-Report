export interface RespondentsData {
  groupedRespondents: GroupedRespondent[];
  total_count_of_respondents: number;
}
export interface GroupedRespondent {
  country: string;
  city: string;
  count: number;
  flag_url: string;
}

export interface GroupedRespondentsApi {
  groupedRespondents: GroupedRespondent[];
  groupedRespondentsCount: number;
}
