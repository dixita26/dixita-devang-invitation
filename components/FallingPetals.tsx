const petals = [
  [5, 13, "#c97968", 8, -1, -18], [14, 11, "#b9785a", 11, -5, 12],
  [23, 15, "#a97878", 10, -8, -24], [32, 12, "#d89b74", 13, -3, 20],
  [41, 14, "#b9785a", 9, -6, -14], [50, 11, "#c97968", 12, -10, 16],
  [59, 16, "#a97878", 11, -2, -22], [68, 12, "#d89b74", 10, -7, 18],
  [77, 14, "#c97968", 14, -4, -16], [86, 11, "#a97878", 9, -9, 24],
  [94, 15, "#b9785a", 12, -1, -20], [9, 12, "#d89b74", 14, -12, 15],
  [28, 11, "#c97968", 10, -11, -12], [47, 14, "#b9785a", 13, -5, 20],
  [64, 11, "#a97878", 12, -13, -18], [82, 13, "#d89b74", 11, -8, 14],
] as const;

export default function FallingPetals() {
  return <div className="falling-petals" aria-hidden="true">
    {petals.map(([left, size, color, duration, delay, drift], i) => <i
      className="falling-petal"
      key={i}
      style={{
        "--petal-left": `${left}%`,
        "--petal-size": `${size}px`,
        "--petal-color": color,
        "--petal-duration": `${duration}s`,
        "--petal-delay": `${delay}s`,
        "--petal-drift": `${drift}px`,
      } as React.CSSProperties}
    />)}
  </div>;
}
