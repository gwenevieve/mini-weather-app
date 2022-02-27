export interface PlacesFields {
  features: Features[];
  query: [];
}

export interface Features {
  center: [];
  context: {
    id: string;
    short_code?: string;
    text: string;
    wikidata?: string;
  };
  geometry: {
    coordinates: {
      0: number;
      1: number;
    };
    type: string;
  };
  id: string;
  place_name: string;
  place_type: string[];
  properties: {
    address: string;
    category: string;
    foursquare: string;
    landmark: boolean;
    wikidata?: string;
  };
  relevance: number;
  text: string;
}
