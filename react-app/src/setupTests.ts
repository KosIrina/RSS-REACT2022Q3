import '@testing-library/jest-dom';
import { ILocalStorage } from 'types';
import server from './mocks/server';
import { Crypto } from '@peculiar/webcrypto';

global.crypto = new Crypto();

const localStorageMock = (function (): ILocalStorage {
  let store: Record<string, string> = {};

  return {
    getItem(key: string): string {
      return store[key];
    },

    setItem(key: string, value: string): void {
      store[key] = value;
    },

    clear(): void {
      store = {};
    },

    removeItem(key: string): void {
      delete store[key];
    },

    getAll(): Record<string, string> {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'bypass',
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
