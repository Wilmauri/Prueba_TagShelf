// Preprocess text to data
export function preprocess_text(text: string): string[] {
  text = text.toLowerCase().replace(/[.,!?;:"“”'[()]/g, '');
  return text.split(/\s+/);
}
// Data to Bag Of Word - Will be converted to token
export function text_to_bow(text: string, vocabulary: string[]): number[] {
  const tokens = preprocess_text(text);
  const tokenCounts = new Map<string, number>();
  tokens.forEach(token => {
    if (token.trim()) {
      tokenCounts.set(token, (tokenCounts.get(token) || 0) + 1);
    }
  });
  return vocabulary.map(word => tokenCounts.get(word) || 0);
}

export function classifier(englishData: any, spanishData: any, sampleText: string): string {
  const englishVocab: string[] = Object.keys(englishData.commonWords);
  const spanishVocab: string[] = Object.keys(spanishData.commonWords);

  const englishBoW = text_to_bow(sampleText, englishVocab);
  const spanishBoW = text_to_bow(sampleText, spanishVocab);

  let englishScore = 0;
  for (let i = 0; i < englishVocab.length; i++){
    englishScore += (englishBoW[i] * englishData.commonWords[englishVocab[i]]) / 100;
  }

  let spanishScore = 0;
  for (let i = 0; i < spanishVocab.length; i++){
    spanishScore += (spanishBoW[i] * spanishData.commonWords[spanishVocab[i]]) / 100;
  }

  const spanglishScore = 2;
  if (Math.abs(englishScore - spanishScore) < spanglishScore) {
    return 'Spanglish';
  } else if (englishScore > spanishScore) {
    return 'English';
  } else {
    return 'Spanish';
  }
}
