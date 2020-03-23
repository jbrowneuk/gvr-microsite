export interface PartData {
  [key: string]: any;
}

export interface Part {
  id: string;
  manufacturer: string;
  name: string;
  image: string;
  retailCost: number;
  actualCost: number;
  required: number;
  acquired: number;
  data?: PartData;
}

export interface PartCategory {
  name: string;
  id: string;
  icon: string;
  parts: Part[];
}

export interface PartList {
  lastUpdate: string;
  categories: PartCategory[];
}

export interface KeyValuePair {
  key: string;
  value: any;
}
