import { ApiTypes } from 'api-types';
import { create } from 'zustand';
import { ApiError } from '../lib/api-error';
import { AuthLinks } from '../lib/auth';
import { clearAuthCookie } from '../lib/auth-cookie';
import { httpRequest, parseJson } from '../lib/http';

type CurrentUserProfile = ApiTypes.CurrentUserProfile;

interface UserStore {
  currentUser: CurrentUserProfile | null;

  isLoaded: boolean;

  handleUnauthorized(err: any): void;

  pullCurrentUser(): Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,

  isLoaded: false,

  /**
   * Handler that looks for an Unauthorized API response
   *
   * @param err any object to attempt to parse as an ApiError
   * @returns if successfully parse
   * @throws err - if the passed-in object is not an `UNAUTHORIZED` error
   */
  handleUnauthorized(err: any) {
    const errAsApiError = ApiError.fromAny(err);
    if (errAsApiError.reason === 'UNAUTHORIZED') {
      // Remove cookie
      clearAuthCookie();

      // Set global state
      set({ currentUser: null });

      window.location.href = AuthLinks.login;
      return;
    }
    // re-throw
    throw err;
  },

  /**
   * Fetch and set the current user
   */
  async pullCurrentUser() {
    const currentUser = await httpRequest('/api/me')
      .catch(get().handleUnauthorized)
      .then(parseJson(isValidResult, convert));

    set({ currentUser, isLoaded: true });
  },
}));

function isValidResult(value: unknown): value is CurrentUserProfile {
  if (!value) {
    return false;
  }
  return (
    typeof value === 'object' &&
    (value as Record<string, unknown>)['type'] === 'user'
  );
}

function convert(result: CurrentUserProfile): CurrentUserProfile {
  return result;
}
