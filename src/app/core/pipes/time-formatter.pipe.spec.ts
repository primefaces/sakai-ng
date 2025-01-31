import { TimeFormatterPipe } from './time-formatter.pipe';

describe('TimeFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
