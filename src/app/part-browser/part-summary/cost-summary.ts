export interface CostCategory {
  name: string;
  id: string;
  items: number;
  cost: number;
  icon: string;
}

export interface CostSummary {
  categories: CostCategory[];
  totalItems: number;
  totalCost: number;
}
