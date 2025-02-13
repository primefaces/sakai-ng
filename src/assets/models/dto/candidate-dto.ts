import { Timing } from './timing';

export class CandidateDTO {
  roomTable!: String;
  timing!: Timing;
  day!: number;
  slot!: number;
  duration!: number;
  preferredRatio!: number;
}
