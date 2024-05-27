export function convertDate(date: Date): string {
    const now = new Date();
    const diffInMillis = now.getTime() - date.getTime();

    const diffInMinutes = diffInMillis / (1000 * 60);
    const diffInHours = diffInMillis / (1000 * 60 * 60);
    const diffInDays = diffInMillis / (1000 * 60 * 60 * 24);

    if (diffInMinutes < 60) {
        return `${Math.floor(diffInMinutes)} minutes ago`;
    }

    if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hours ago`;
    }

    return `${Math.floor(diffInDays)} days ago`;
}