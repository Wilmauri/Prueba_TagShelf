// languageDetector.test.ts
import { classifier, preprocess_text, text_to_bow } from './Classifier';

describe('Language Detection Tests', () => {
  // Create dummy data matching the structure of your JSON files.
  const englishData = {
    commonWords: {
      "hello": 100,
      "there": 80,
      "how": 60,
      "are": 55,
      "you": 50,
      "doing": 45,
      "today": 40
    }
  };

  const spanishData = {
    commonWords: {
      "hola": 100,
      "ahí": 80,
      "cómo": 60,
      "estás": 55,
      "tú": 50,
      "hoy": 40,
      "bien": 35
    }
  };

  test('detects English text correctly', () => {
    const sampleText = "Hello there, how are you doing today?";
    const predicted = classifier(englishData, spanishData, sampleText);
    expect(predicted).toBe("English");
  });

  test('detects Spanish text correctly', () => {
    const sampleText = "Hola, cómo estás tú hoy?";
    const predicted = classifier(englishData, spanishData, sampleText);
    expect(predicted).toBe("Spanish");
  });

  test('detects Spanglish text as mixed if scores are close', () => {
    // Adjust sample text so it contains elements of both languages.
    const sampleText = "Hello, cómo estás hoy?";
    const predicted = classifier(englishData, spanishData, sampleText);
    // Depending on your threshold, this sample might be considered Spanglish.
    expect(predicted).toBe("Spanglish");
  });
});
