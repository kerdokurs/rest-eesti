export const DEFAULT_LIMIT = 20;

export default interface URLQuery {
  fields?: string;
  limit?: number;
  order?: string;
}
