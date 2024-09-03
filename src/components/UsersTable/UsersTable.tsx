import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchUsers, setFilter } from '../../store/usersSlice';
import { FiltersType } from '../../store/usersSlice.ts';
import UsersType from '../../types/UsersType';
import './UsersTable.scss';

export default function UsersTable() {
	const dispatch = useDispatch<AppDispatch>();
	const { users, status, error, filters } = useSelector(
		(state: RootState) => state.users
	);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchUsers());
		}
	}, [status, dispatch]);

	const handleFilterChange = (field: keyof FiltersType, value: string) => {
		dispatch(setFilter({ field, value }));
	};

	const filteredUsers = users.filter(user => {
		return (
			user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
			user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
			user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
			user.phone.toLowerCase().includes(filters.phone.toLowerCase())
		);
	});

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (status === 'failed') {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='table'>
			<div className='row row_head'>
				<div className='col'>
					<p>Name</p>
					<input
						type='text'
						value={filters.name}
						onChange={e => handleFilterChange('name', e.target.value)}
						className='table__input'
					/>
				</div>
				<div className='col'>
					<p>Username</p>
					<input
						type='text'
						value={filters.username}
						onChange={e => handleFilterChange('username', e.target.value)}
						className='table__input'
					/>
				</div>
				<div className='col'>
					<p>Email</p>
					<input
						type='text'
						value={filters.email}
						onChange={e => handleFilterChange('email', e.target.value)}
						className='table__input'
					/>
				</div>
				<div className='col'>
					<p>Phone</p>
					<input
						type='text'
						value={filters.phone}
						onChange={e => handleFilterChange('phone', e.target.value)}
						className='table__input'
					/>
				</div>
			</div>
			{filteredUsers.map((user: UsersType, index) => (
				<div
					key={user.id}
					className={`row ${index % 2 !== 0 ? 'row_even' : ''}`}
				>
					<div className='col'>{user.name}</div>
					<div className='col'>{user.username}</div>
					<div className='col'>
						<a href={`mailto:${user.email}`}>{user.email}</a>
					</div>
					<div className='col'>
						<a href={`tel:${user.phone}`}>{user.phone}</a>
					</div>
				</div>
			))}
		</div>
	);
}
