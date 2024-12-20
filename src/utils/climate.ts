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
    "climate change",
    "greenhouse gases",
    "deforestation",
    "recycling",
    "carbon emissions",
    "biodiversity",
    "carbon neutral",
    "energy conservation",
    "climate action",
    "climate crisis",
    "ocean pollution",
    "climate justice",
    "green energy",
    "sustainable development",
    "environmental impact",
    "clean energy",
    "nature conservation",
    "plastic waste",
    "air quality",
    "eco-conscious",
    "climate adaptation",
    "climate mitigation",
    "carbon offset",
    "zero waste",
    "conservation",
    "green technology",
    "renewable resources",
    "environmental protection"
  ];

  // Adding greetings and related phrases for user engagement
  const greetings = [
    "hello",
    "hi",
    "good morning",
    "good afternoon",
    "good evening",
    "hey",
    "how are you",
    "what's up",
    "greetings",
    "howdy",
    "yo"
  ];

  const messageLower = message.toLowerCase();

  // Check if message contains climate-related keywords or greetings
  return keywords.some(keyword => messageLower.includes(keyword)) || greetings.some(greeting => messageLower.includes(greeting));
};
