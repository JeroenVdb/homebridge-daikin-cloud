export class StringUtils {
    static mask(str: unknown): string {
        const replacement = '******';

        if (typeof str !== 'string') {
            return replacement;
        }

        if (str.length <= 6) {
            return replacement;
        }

        const firstThree = str.slice(0, 3);
        const lastThree = str.slice(-3);

        return firstThree + '******' + lastThree;
    }

    static isEmpty(str: unknown): boolean {
        return typeof str !== 'string' || str.length === 0;
    }
}
