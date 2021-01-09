export interface GroupedRespondent {
  country: string;
  city: string;
  count: number;
  flagUrl: string;
}

export interface GroupedRespondentsApi {
  groupedRespondents: GroupedRespondent[];
  groupedRespondentsCount: number;
}
