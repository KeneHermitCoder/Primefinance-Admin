export default function useLocalStorage(action: 'get' | 'set', payload?: string | { name: string, value: unknown }) {
    if (action === 'get') return JSON.parse(localStorage.getItem(payload as string) as string);
    if (action === 'set') {
        if (typeof payload !== 'string' && payload?.value === null)
            localStorage.removeItem(payload?.name)
        else localStorage.setItem(
            (<{ name: string, value: unknown }>payload).name,
            JSON.stringify((<{ name: string, value: unknown }>payload).value)
        );
    }
}