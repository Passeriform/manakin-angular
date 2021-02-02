import { LoaderConfig } from '../harmonic-loader/loader.interface';

export function drawDot({ context, x, y, radius, color }): void {
  context.beginPath();
  context.fillStyle = color;

  context.arc(x, y, radius, 0, 2 * Math.PI, true);

  context.fill();
}

export function getDotsPos(splitDist: number): number[] {
  const dotsCount = window.innerWidth / splitDist;
  const splitLocs: number[] = Array.from({ length: dotsCount }).fill(0).map((_, idx) => (idx - ((dotsCount - 0.5) / 2)) * splitDist);
  return splitLocs;
}

export function getInPhase(percentage: number): number {
  return 3.14 - (percentage * 3.14 / 100);
}

export function generateLoaderConfig(width: number, height: number): LoaderConfig {
  return {
    amplitude: height / 12,
    // frequency: width / 10,
    yoffset: height / 2,
    speed: 25,
    basePhase: 0,
    retardationRate: 0.5,
    dotsDist: width / 10,
    dotRadius: 2 + (width / 600)
  };
}
