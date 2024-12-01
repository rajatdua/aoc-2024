const fs = require('fs');

fs.readFile('day-1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const lines = data.trim().split('\n');

    const column1 = [];
    const column2 = [];

    lines.forEach(line => {
        const [num1, num2] = line.split('   ').map(Number);
        column1.push(num1);
        column2.push(num2);
    });
    console.log({ day1a: processDayOneA(column1, column2) })
    console.log({ day1b: processDayOneB(column1, column2) })
});

const processDayOneA = (list1, list2) => {
    const sortedList1 = list1.sort();
    const sortedList2 = list2.sort();
    let result = 0;
    for (let i = 0; i < sortedList1.length; i++) {
        const a = sortedList1[i];
        const b = sortedList2[i];
        result += Math.abs(a - b);
    }
    return result;
};

const processDayOneB = (list1, list2) => {
    const list2FrequencyMap = new Map();
    for (let i = 0; i < list2.length; i++) {
        if (list2FrequencyMap.has(list2[i])){
            list2FrequencyMap.set(list2[i], list2FrequencyMap.get(list2[i]) + 1)
        } else {
            list2FrequencyMap.set(list2[i], 1);
        }
    }

    let totalSimilarityScore = 0;
    for (let j = 0; j < list1.length; j++) {
        const currentSimilarityScore = list1[j] * (list2FrequencyMap.get(list1[j]) ?? 0);
        totalSimilarityScore += currentSimilarityScore;
    }

    return totalSimilarityScore;
};