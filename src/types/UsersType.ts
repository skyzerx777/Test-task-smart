import Address from './AddressType';
import Company from './CompanyType';

type UsersType = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
};

export default UsersType;
