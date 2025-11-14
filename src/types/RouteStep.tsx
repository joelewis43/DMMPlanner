export interface RouteStep {
  id: string,
  name: string,
  // input: string,
  // outputName: string,
  // outputValue: string,
  // type: StepType,
}

export type RouteStepInput = Omit<RouteStep, 'id'>;