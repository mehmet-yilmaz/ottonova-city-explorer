export interface IApi {
  version: number;
  cities: string;
  documentation: string;
}
export const Api: IApi = {
  version: 1.0,
  cities: '/cities',
  documentation: '/docs',
};
