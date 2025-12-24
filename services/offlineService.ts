
export class OfflineManager {
  private static STORAGE_KEY = 'marvelous_manager_data';

  static save(data: any) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        ...data,
        lastUpdated: new Date().toISOString()
      }));
      return true;
    } catch (e) {
      console.error('Failed to save data locally', e);
      return false;
    }
  }

  static load() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to load local data', e);
      return null;
    }
  }

  static isOnline(): boolean {
    return navigator.onLine;
  }
}
