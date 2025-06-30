

export const isValidHttpUrl = (string) => {
    try {
        const url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
};

export const handleCopy = (text) => {
    if (!text) return;

    navigator.clipboard.writeText(text)
        .then(() => alert("Short url copied"))
        .catch((err) => {
            console.error("Failed to copy:", err);
            alert("Not able to copy");
        });
};

export const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleTimeString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}