export const emit = (awareness: any, name: string, value: any) => {
    awareness.setLocalStateField(name, value);

    setTimeout(() => {
        awareness.setLocalStateField(name, null);
    }, 20);
}