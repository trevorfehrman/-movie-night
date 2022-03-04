import { useCollectionData } from './useCollectionData';

export interface Participants {
  participants: string[];
  cursor: number;
}

export function useParticipants() {
  console.log('useparticipants');
  return useCollectionData<Participants>('participants');
}
