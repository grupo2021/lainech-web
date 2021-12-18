import { createAction, props } from '@ngrx/store';

export const initLoading = createAction('[UI] init loading');

export const stopLoading = createAction('[UI] stop loading');
