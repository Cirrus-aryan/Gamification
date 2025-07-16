export const formatFileSize = (size: number) => `${(size / 1024 / 1024).toFixed(2)} MB`;

export const generateKey = (type: string) => `${type}_${Date.now()}`;
