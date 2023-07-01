import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import type { RootState, AppDispatch } from 'redux/store';
import { Query } from 'types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ok work on client 

export const useNavigateSearch = () => {
    const navigate = useNavigate();
    return (pathname : string, params : Partial<Query>) =>
        navigate(`${pathname}?${createSearchParams(params)}`)
};