export interface RouteStep {
  id: string,
  name: string,
  // input: string,
  // outputName: string,
  // outputValue: string,
  type: RouteType,
}

export type RouteStepInput = Omit<RouteStep, 'id'>;

export enum RouteType {
  Quest = 'Quest',
  Other = 'Other'
}