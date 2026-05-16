import { fadeIn } from '../motionConfig';

test('fadeIn preset includes opacity array [0,1]', () => {
  expect(fadeIn.opacity).toEqual([0, 1]);
});
