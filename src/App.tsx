import { Provider } from 'react-redux';
import './App.scss';
import UsersTable from './components/UsersTable/UsersTable';
import { store } from './store/store';

function App() {
	return (
		<>
			<Provider store={store}>
				<div className='container'>
					<UsersTable></UsersTable>
				</div>
			</Provider>
		</>
	);
}

export default App;
