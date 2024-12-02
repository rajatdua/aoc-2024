const fs = require('fs');

fs.readFile('./day-2/day-2.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const reports = data.trim().split('\n');

    const reportsWithLevels = [];

    reports.forEach(report => {
        const reportLevel = report.split(' ').map(Number);
        reportsWithLevels.push(reportLevel);
    });
    console.log({ day2a: processDayTwoA(reportsWithLevels) })
    console.log({ day2b: processDayTwoB(reportsWithLevels) })
});


const isSafeReport = (report) => {
    const delta = [1, 2, 3];
    if (report.length < 2) return false;

    let isIncreasing = null;
    for (let j = 0; j < report.length - 1; j++) {
        const diff = report[j + 1] - report[j];

        if (!delta.includes(Math.abs(diff))) return false;

        if (isIncreasing === null) {
            isIncreasing = diff > 0;
        } else if ((diff > 0) !== isIncreasing) {
            return false;
        }
    }
    return true;
};

const processDayTwoA = (reportsWithLevels) => {
    let safeCount = 0;
    for (const report of reportsWithLevels) {
        if (isSafeReport(report)) safeCount++;
    }
    return safeCount;
};
const processDayTwoB = (reportsWithLevels) => {
    let safeCount = 0;
    for (const report of reportsWithLevels) {
        if (isSafeReport(report)) {
            safeCount++;
            continue;
        }
        let canBeMadeSafe = false;
        for (let i = 0; i < report.length; i++) {
            const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
            if (isSafeReport(modifiedReport)) {
                canBeMadeSafe = true;
                break;
            }
        }
        if (canBeMadeSafe) safeCount++;
    }
    return safeCount;
};
