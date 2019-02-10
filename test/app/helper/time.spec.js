import assert from 'assert';
import { timeToHours, hoursToTime } from '../../../app/helper/time';

const workingDays = 5;
const workingHours = 8;

describe('Time Helper', () => {
  it('should convert time to hours', () => {
    let hours = timeToHours('2w 6d 12h', workingDays, workingHours);
    let expectedHours = 140;
    assert.strictEqual(hours, expectedHours);

    hours = timeToHours('2w6d12h', workingDays, workingHours);
    expectedHours = 140;
    assert.strictEqual(hours, expectedHours);

    hours = timeToHours('2w 12h', workingDays, workingHours);
    expectedHours = 92;
    assert.strictEqual(hours, expectedHours);

    hours = timeToHours('6d 12h', workingDays, workingHours);
    expectedHours = 60;
    assert.strictEqual(hours, expectedHours);

    hours = timeToHours('12h', workingDays, workingHours);
    expectedHours = 12;
    assert.strictEqual(hours, expectedHours);
  });

  it('should convert hours to time', () => {
    let time = hoursToTime(140, workingDays, workingHours);
    let expectedTime = '3w 2d 4h';
    assert.strictEqual(time, expectedTime);

    time = hoursToTime(40, workingDays, workingHours);
    expectedTime = '1w';
    assert.strictEqual(time, expectedTime);

    time = hoursToTime(38, workingDays, workingHours);
    expectedTime = '4d 6h';
    assert.strictEqual(time, expectedTime);

    time = hoursToTime(12, workingDays, workingHours);
    expectedTime = '1d 4h';
    assert.strictEqual(time, expectedTime);

    time = hoursToTime(8, workingDays, workingHours);
    expectedTime = '1d';
    assert.strictEqual(time, expectedTime);

    time = hoursToTime(4, workingDays, workingHours);
    expectedTime = '4h';
    assert.strictEqual(time, expectedTime);
  });

  it('should throw an error for the wrong time format', () => {
    assert.throws(() => timeToHours('foo', workingDays, workingHours), Error);
    assert.throws(() => timeToHours('2 6 12', workingDays, workingHours), Error);
    assert.throws(() => timeToHours('12h 6d 2w', workingDays, workingHours), Error);
    assert.throws(() => timeToHours('2w foo 6d bar 12h', workingDays, workingHours), Error);
    assert.throws(() => timeToHours('2612', workingDays, workingHours), Error);
  });
});
