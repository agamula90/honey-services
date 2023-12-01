import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NavigationItemType =
    | 'main'
    | 'news'
    | 'products'
    | 'offers'
    | 'about'
    | 'contacts';

export interface NavigationItem {
    type: NavigationItemType;
    selectedAt: number;
    updatedAt: number;
}

export interface NavigationState {
    items: NavigationItem[];
    currentItemType: NavigationItemType;
}

const navItemTypes: NavigationItemType[] = [
    'main',
    'news',
    'products',
    'offers',
    'about',
    'contacts',
];

const initialNavItemType: NavigationItemType = 'main';

const initialState: NavigationState = {
    items: navItemTypes.map((type) => {
        if (type === initialNavItemType) {
            return { type, selectedAt: new Date().getTime(), updatedAt: 0 };
        }
        return { type, selectedAt: 0, updatedAt: 0 };
    }),
    currentItemType: initialNavItemType,
};

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setActive: (state, action: PayloadAction<NavigationItemType>) => {
            state.currentItemType = action.payload;
            const indexOfNavItem = state.items
                .map((item) => item.type)
                .indexOf(action.payload);
            state.items[indexOfNavItem].selectedAt = new Date().getTime();
        },

        setLoaded(state, action: PayloadAction<NavigationItemType>) {
            const indexOfNavItem = state.items
                .map((item) => item.type)
                .indexOf(action.payload);
            state.items[indexOfNavItem].updatedAt = new Date().getTime();
        },
    },
});

// Action creators are generated for each case reducer function
export const { setActive, setLoaded } = navigationSlice.actions;

export default navigationSlice.reducer;

export function getNavItemTitle(navigationItem: NavigationItemType) {
    switch (navigationItem) {
        case 'about':
            return 'Про нас';
        case 'contacts':
            return 'Контакти';
        case 'offers':
            return 'Послуги';
        case 'products':
            return 'Продукція';
        case 'main':
            return 'Головна';
        case 'news':
            return 'Новини';
    }
}
