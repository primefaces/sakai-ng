import { TimingDTO } from './timing-dto';

export class CandidateDTO {
  roomTable!: String;
  timing!: TimingDTO;
  day!: number;
  slot!: number;
  duration!: number;
  preferredRatio!: number;
}
