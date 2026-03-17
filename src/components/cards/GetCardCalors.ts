const GRADIENTS = [
    'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', // Indigo/Purple
    'linear-gradient(135deg, #059669 0%, #10b981 100%)', // Emerald/Green
    'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', // Deep Blue
    'linear-gradient(135deg, #be123c 0%, #fb7185 100%)', // Rose
    'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)', // Amber
    'linear-gradient(135deg, #0f172a 0%, #334155 100%)', // Slate/Dark
    'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)', // Violet/Pink
    'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)', // Sky/Cyan
    'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', // Orange
    'linear-gradient(135deg, #4d7c0f 0%, #65a30d 100%)', // Lime/Green
    'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)', // Indigo
    'linear-gradient(135deg, #9f1239 0%, #e11d48 100%)', // Crimson
];

const BRAND_COLORS: Record<string, string> = {
    nubank: 'linear-gradient(135deg, #820ad1 0%, #a333ff 100%)',
    inter: 'linear-gradient(135deg, #ff7a00 0%, #ff9500 100%)',
    picpay: 'linear-gradient(135deg, #11c76f 0%, #21e683 100%)',
    santander: 'linear-gradient(135deg, #ec0000 0%, #ff3333 100%)',
    itau: 'linear-gradient(135deg, #ff7800 0%, #004a8d 100%)',
    bradesco: 'linear-gradient(135deg, #cc092f 0%, #ff1a4a 100%)',
    neon: 'linear-gradient(135deg, #00e5ff 0%, #00b0ff 100%)',
    c6: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    xp: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    btg: 'linear-gradient(135deg, #00234b 0%, #003a7a 100%)',
    ifood: 'linear-gradient(135deg, #EA1D2C 0%, #FF3B4D 100%)',
};

function getCardColors(id: string, name: string, closingDay: number, dueDay: number) {
    const lowercaseName = name.toLowerCase();
    for (const brand in BRAND_COLORS) {
        if (lowercaseName.includes(brand)) {
            return BRAND_COLORS[brand];
        }
    }

    const seed = `${id}-${closingDay}-${dueDay}`;

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
    }

    hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
    hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
    hash = (hash >> 16) ^ hash;

    const index = Math.abs(hash) % GRADIENTS.length;
    return GRADIENTS[index];
}

export default getCardColors;
