import { AppUserAuth } from './app-user-auth';

export const LOGIN_MOCKS: AppUserAuth[] = [
    {
        userName: 'Jojo',
        bearerToken: 'abi393kdkd9393idd',
        isAuthenticated: true,

        canAccessProducts: true,
        canAddProducts: true,
        canSaveProduct: true,
        canAccessCategories: true,
        canAddCategory: true,
    },
    {
        userName: 'David',
        bearerToken: 'tyi393214sd9393id6',
        isAuthenticated: true,

        canAccessProducts: false,
        canAddProducts: false,
        canSaveProduct: false,
        canAccessCategories: true,
        canAddCategory: true,
    }
];
