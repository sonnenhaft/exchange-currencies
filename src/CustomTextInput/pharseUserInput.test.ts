import { pharseUserInput } from './pharseUserInput';
import { getUpdatedValue } from './CustomTextInput';

test('getSafeNumber should parse text input properly', () => {
    expect(pharseUserInput('-.1')).toEqual([-0.1, '-0.1']);
    expect(pharseUserInput('-.sdfSD*()[]1')).toEqual([-0.1, '-0.1']);
    expect(pharseUserInput('.1')).toEqual([0.1, '+0.1']);
    expect(pharseUserInput('.10')).toEqual([0.1, '+0.10']);
    expect(pharseUserInput('+.1-')).toEqual([-0.1, '-0.1']);
    expect(pharseUserInput('1234.5678')).toEqual([1234.5678, '+1 234.5678']);
    expect(pharseUserInput('01234.5678')).toEqual([1234.5678, '+1 234.5678']);
    expect(pharseUserInput('001234.5678')).toEqual([1234.5678, '+1 234.5678']);
    expect(pharseUserInput(' 001234.5678')).toEqual([1234.5678, '+1 234.5678']);
    expect(pharseUserInput(' 001234.5678 ')).toEqual([1234.5678, '+1 234.5678 ']);
    expect(pharseUserInput('-0.0099')).toEqual([-0.0099, '-0.0099']);
});

test('when data received in input, it should limit to 2 decimal digits', () => {
    expect(getUpdatedValue(0.0012, 1)).toEqual([0, '+0']);
    expect(getUpdatedValue(-0.0012, 1)).toEqual([-0, '-0']);
    expect(getUpdatedValue(-0.009, 1)).toEqual([-0, '-0']);
    expect(getUpdatedValue(-0.0091, 1)).toEqual([-0, '-0']);
    expect(getUpdatedValue(-0.0099, 1)).toEqual([-0, '-0']);
    expect(getUpdatedValue(0.0099, 1)).toEqual([0, '+0']);
    expect(getUpdatedValue(-0.01, 1)).toEqual([-0.01, '-0.01']);
    expect(getUpdatedValue(0.01, 1)).toEqual([0.01, '+0.01']);
});
