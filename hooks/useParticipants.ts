import { useCollectionData } from './useCollectionData';

interface Participants {
  participants: string[];
  cursor: number;
}

export function useParticipats() {
  return useCollectionData<Participants>('participants');
}
