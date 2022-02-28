import { useCollectionData } from './useCollectionData';

export interface Participants {
  participants: string[];
  cursor: number;
}

export function useParticipants() {
  return useCollectionData<Participants>('participants');
}
