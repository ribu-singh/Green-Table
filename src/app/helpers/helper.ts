import { environment } from '../../environments/environment.prod';

export const createEndpoint = (url: string): string => {
  return `${environment.apiUrl}${url}`;
};
