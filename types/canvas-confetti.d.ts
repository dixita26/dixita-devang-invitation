declare module "canvas-confetti" {
  type ConfettiOptions = {
    particleCount?: number;
    angle?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    zIndex?: number;
  };

  export default function confetti(options?: ConfettiOptions): Promise<null>;
}
