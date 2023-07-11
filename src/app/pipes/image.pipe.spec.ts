import { ImagePipe } from './image.pipe';

describe('ImagePipe', () => {
  let pipe: ImagePipe;

  beforeEach(() => {
    pipe = new ImagePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the value into the correct image URL', () => {
    const value = 1;
    const result = pipe.transform(value);
    expect(result).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    );
  });
});
