export const comparisonFn = (prevProps, nextProps) => {
    if (Object.keys(prevProps).length !== Object.keys(nextProps).length) {
        return false;
    }
    return Object.entries(prevProps).reduce((acc, [key, prevValue]) => {
        const nextValue = nextProps[key];
        if (typeof prevValue === 'object') {
            return acc && typeof nextValue === 'object' && prevValue.key === nextValue.key;
        }
        return acc && prevValue === nextValue;
    }, true);
}
