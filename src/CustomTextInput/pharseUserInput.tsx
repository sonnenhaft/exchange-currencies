export function pharseUserInput(value: string, isNegative: boolean = false): [number, string] {
    isNegative = isNegative || (value.includes('-') && !value.endsWith('+'));
    const digitsAndSpacesAndDotStr = value.replace(/[^0-9,. ]/g, '');
    // replace all dots except last https://stackoverflow.com/questions/9694930/remove-all-occurrences-except-last/28673744
    const singleOrNoDotsStr = digitsAndSpacesAndDotStr.replace(/[.,](?=.*[.,])/g, '').replace(/[,]/g, '.');
    let withoutLeadingZeros = singleOrNoDotsStr.replace(/^0+/, '');
    if (withoutLeadingZeros.startsWith('.')) {
        withoutLeadingZeros = `0${ withoutLeadingZeros }`;
    }
    const [real, decimal = ''] = withoutLeadingZeros.split('.');
    withoutLeadingZeros =
        Number(real.replace(/ /g, '')).toLocaleString('en-US').replace(/,/g, ' ') +
        (decimal ? `.${ decimal }` : withoutLeadingZeros.endsWith('.') ? '.' : '');

    return [
        Number.parseFloat(singleOrNoDotsStr.replace(/ /g, '') || '0') * (isNegative ? -1 : 1),
        `${ singleOrNoDotsStr ? (isNegative ? '-' : '+') : '' }${
            singleOrNoDotsStr.length === 1 ? singleOrNoDotsStr : withoutLeadingZeros
        }`
    ];
}
