export type ModuleStatus = "available" | "coming-soon";

export interface ModuleConfig {
  id: string;
  name: string;
  shortName: string;
  description: string;
  basePath: string;
  status: ModuleStatus;
}
