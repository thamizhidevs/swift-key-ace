
// Typing test passages
export const typingTexts = [
  `The quick brown fox jumps over the lazy dog. This pangram contains all the letters of the English alphabet. It's often used for typing practice, testing fonts, and other applications where you need to see what all letters look like. Typing speed and accuracy are important skills in today's digital world, where so much communication happens through keyboards and touchscreens.`,
  
  `As I sat by the window, watching the rain fall gently outside, I couldn't help but reflect on how much I love rainy days. There's something magical about the pitter-patter of raindrops against the glass, the fresh earthy smell that fills the air, and the cozy feeling of being indoors while nature puts on its show. It's on days like these that I find myself most productive and creative.`,
  
  `Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++. Created in the 1950s, FORTRAN is considered by many to be the first widely used programming language.`,
  
  `The Internet is a global network of billions of computers and other electronic devices. With the Internet, it's possible to access almost any information, communicate with anyone else in the world, and do much more. You can do all this by connecting a computer to the Internet, which is also called going online. Today, most people connect to the Internet using wireless connections like WiFi.`,
  
  `Touch typing is the ability to use muscle memory to find keys fast, without using the sense of sight, and with all the available fingers, just like piano players do. It significantly improves typing speed and eliminates errors. Touch typing simply makes you more productive and it is a skill worth learning.`,
  
  `Technology has transformed the way we live, work, and communicate. From smartphones and social media to artificial intelligence and virtual reality, our world is increasingly defined by digital innovation. While these advancements bring great benefits, they also create new challenges. Finding a balance between embracing new tools and maintaining human connection is the key to thriving in this technological era.`,
];

// Function to get a random typing test
export const getRandomTypingText = (): string => {
  const randomIndex = Math.floor(Math.random() * typingTexts.length);
  return typingTexts[randomIndex];
};

// Function to get text based on difficulty level
export const getTypingTextByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): string => {
  switch (difficulty) {
    case 'easy':
      return typingTexts[0]; // shortest text
    case 'medium':
      return typingTexts[2]; // medium text
    case 'hard':
      return typingTexts[5]; // longest text
    default:
      return getRandomTypingText();
  }
};
