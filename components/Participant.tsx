import { Participants } from 'hooks/useParticipants';

export function Participant({ participant }: { participant: string }) {
  return <h1 className='text-3xl font-bold text-gray-800 mr-10'>{participant}</h1>;
}
