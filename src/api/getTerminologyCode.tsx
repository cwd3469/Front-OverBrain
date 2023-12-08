import axios from 'axios';

export type GetTerminologyCodeParams = {
  terminologyServer: string;
  answerValueSet: string;
  filter?: string;
};

const getTerminologyCode = async ({ terminologyServer, answerValueSet, filter }: GetTerminologyCodeParams) => {
  const query = {
    url: answerValueSet,
    displayLanguage: 'ko,en;q=0.9,en-US;q=0.8,ja;q=0.7,ko-KR;q=0.6',
    includeDefinition: true,
    includeDesignations: true,
    count: 100,
    filter: filter,
  };
  const valueSetExpend = '/ValueSet/$expand';
  return await axios.get(terminologyServer + valueSetExpend, { params: { ...query } });
};

export default getTerminologyCode;
