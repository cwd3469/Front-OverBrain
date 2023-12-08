export type TermConcept = {
  system: string;
  code: string;
  display: string;
  designation?: any;
};

export type Expansion = {
  id: string;
  total: number;
  offset: number;
  contains: TermConcept[];
};
/**용어 코드 value set */
export type TermValueSet = {
  resourceType: string;
  id: string;
  url: string;
  version: string;
  name: string;
  title: string;
  status: string;
  expansion: Expansion;
  compose?: any;
};

export type BaseRequest = {
  patientID?: string | number;
  inquiryID?: string | number;
  url?: string;
  _format?: string;
  count?: number;
  termUrl?: string;
  filter?: string; //keyword
  displayLanguage?: string;
  includeDefinition?: boolean;
};

export type Concept = {
  code?: string;
  display?: string;
  designation?: string;
};

export type Include = {
  system: string;
  concept: Concept[];
};

export type Compose = {
  include: Include[];
};

export type ValueSet = {
  resourceType: string;
  compose: Compose;
  status: string; //active
};
