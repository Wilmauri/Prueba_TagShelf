import fs from 'fs';
import readline from 'readline';
import { workerData } from 'worker_threads';
const filePath = "/Users/wilma/Documents/Para_tagshelf/Prueba_TagShelf/src/3rd_Problem/text.txt";

function WordCount(filePath: string): Promise<{ FrequencyMap: Map<String, number>, top10: [string, number][] }> {
    return new Promise((resolve, reject) => {
        //creating readstream
        const fileStream = fs.createReadStream(filePath)
        //creating rl
        const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })
        //Now set up what are we gonna use inside the readline
        const FrequencyMap = new Map<string, number>();

        //event "line" to start reading the file
        rl.on("line", (line) => {
            //creating a variable that give us the lines without the spaces
            const words = line.split(/\s+/);
            for (let word of words) {
                const cleanWord = word.toLowerCase().replace(/[.,!?;:"“”'[()]/g, '');
                if (cleanWord) {
                    if (FrequencyMap.has(cleanWord)) {
                        let currentCount = FrequencyMap.get(cleanWord)!;
                        FrequencyMap.set(cleanWord, currentCount + 1)
                    } else {
                        FrequencyMap.set(cleanWord, 1)
                    }
                }
            }
            //console.log(FrequencyMap)
        });
        //When its done reading
        rl.on('close', () => {
            console.log('Finished reading the file.');
            const sortedEntries = Array.from(FrequencyMap.entries()).sort((a, b) => b[1] - a[1]);
            const top10 = sortedEntries.slice(0, 10)
            resolve({ FrequencyMap, top10 });
        });
        //Promise reject
        rl.on("error", reject);
    });
}
//test case
async function runWordCount() {
    try {
        const { FrequencyMap, top10 } = await WordCount(filePath);
        console.log("FrequencyMap:", FrequencyMap);
        console.log("Top 10 words:", top10);
    } catch (error) {
        console.error("Error counting words:", error);
    }
}

runWordCount();