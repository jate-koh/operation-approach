
//================================================================
export function joinClassNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function joinStrings(...strings: (string | false | null | undefined)[]): string {
    return strings.filter(Boolean).join(' ');
}

export function randomId(minNumStrings: number, maxNumStrings?: number) {
    const numStrings = maxNumStrings ? Math.floor(Math.random() * (maxNumStrings - minNumStrings + 1)) + minNumStrings : minNumStrings;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < numStrings; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
//================================================================