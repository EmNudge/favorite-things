export const dedent = (str: string) => {
    const lines = str.split('\n')
    
    let minIndent = Number.MAX_SAFE_INTEGER;
    for (let line of lines) {
        let indent = line.search(/\S/);
        if (indent === -1) continue;

        if (indent < minIndent) {
            minIndent = indent;
            if (indent === 0) break;
        }
    }

    return lines.map(line => line.slice(minIndent)).join('\n');
};