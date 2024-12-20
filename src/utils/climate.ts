export const isClimateRelated = (message: string): boolean => {
  const keywords = [
    "climate",
    "environment",
    "global warming",
    "pollution",
    "sustainability",
    "renewable energy",
    "carbon footprint",
    "household",
    "eco-friendly",
    "conserve water",
    "climate change"
  ];
  return keywords.some(keyword => message.toLowerCase().includes(keyword));
};