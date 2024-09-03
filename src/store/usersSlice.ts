import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import UsersType from '../types/UsersType';

export type FiltersType = {
	name: string;
	username: string;
	email: string;
	phone: string;
};

type UsersState = {
	users: UsersType[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	filters: FiltersType;
};

const initialState: UsersState = {
	users: [],
	status: 'idle',
	error: null,
	filters: {
		name: '',
		username: '',
		email: '',
		phone: '',
	},
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	if (!response.ok) {
		throw new Error('Failed to fetch users');
	}
	const data = await response.json();
	return data as UsersType[];
});

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setFilter: (
			state,
			action: PayloadAction<{ field: keyof FiltersType; value: string }>
		) => {
			state.filters[action.payload.field] = action.payload.value;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Something went wrong';
			});
	},
});

export const { setFilter } = usersSlice.actions;

export default usersSlice.reducer;
