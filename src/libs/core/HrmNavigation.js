import { CommonActions, createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export function replace(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params));
    }
}

export function reset(name, params = null) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                { name: name },
            ],
            params: params
        }));
    }
}

export function pop() {
    if (navigationRef.isReady()) {
        navigationRef.goBack();
    }
}