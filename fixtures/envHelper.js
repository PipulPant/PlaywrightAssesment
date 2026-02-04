import path from 'path';

// Define the path for the session storage state
export const STORAGE_STATE_USER_PATH = path.join(process.cwd(), 'playwright/.auth/userState.json');