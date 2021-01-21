export interface UserInfo {
  city: string;
  country: string;
  countryCode: string;
  deviceType: string;
  flagUrl: string;
  ip: string;
  lat: number;
  lon: number;
  os?: string;
  os_version?: string;
  browser?: string;
  location?: Location;
}

export interface Location {
  type: string;
  coordinates: number[];
}
