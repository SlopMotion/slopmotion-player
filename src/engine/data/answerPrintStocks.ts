/** Twelve lab-timed print stocks for the Answer Print grade layer. */
export const ANSWER_PRINT_STOCKS = [
  { id: 0, key: "goldenrod", label: "Goldenrod" },
  { id: 1, key: "moonGate", label: "Moon Gate" },
  { id: 2, key: "bleachSkip", label: "Bleach Skip" },
  { id: 3, key: "tealSplit", label: "Teal Split" },
  { id: 4, key: "nitrate", label: "Nitrate" },
  { id: 5, key: "magicHour", label: "Magic Hour" },
  { id: 6, key: "wetNeon", label: "Wet Neon" },
  { id: 7, key: "acetate", label: "Acetate" },
  { id: 8, key: "polar", label: "Polar" },
  { id: 9, key: "crossBath", label: "Cross Bath" },
  { id: 10, key: "dayNite", label: "Day-Nite" },
  { id: 11, key: "sodium", label: "Sodium" },
] as const;

export const ANSWER_PRINT_STOCK_COUNT = ANSWER_PRINT_STOCKS.length;
export const ANSWER_PRINT_STOCK_IDS = ANSWER_PRINT_STOCKS.map((stock) => stock.id);

export const ANSWER_PRINT_STOCK_LABEL = `Stock (${ANSWER_PRINT_STOCKS.map(
  (stock) => `${stock.id}=${stock.label}`,
).join(", ")})`;
