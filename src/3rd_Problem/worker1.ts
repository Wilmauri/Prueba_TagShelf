//NOT IMPLEMENTED

import { parentPort } from 'worker_threads';

const FrequencyMap = new Map<string, number>();


parentPort?.on('message', (line: string) => {
    const words = line.split(/\s+/);
    for (let word of words) {
        const cleanedWord = word.toLowerCase().replace(/[.,!?;:"“”'[()]/g, '');
        if (cleanedWord) {
            if (FrequencyMap.has(cleanedWord)) {
                let currentCount = FrequencyMap.get(cleanedWord)!;
                FrequencyMap.set(cleanedWord, currentCount + 1)
            } else {
                FrequencyMap.set(cleanedWord, 1)
            }
        }
    }
    console.log('Worker A received:', line);


    console.log(FrequencyMap)
    parentPort?.postMessage({ worker: 'A', result: FrequencyMap, data: line });
});

