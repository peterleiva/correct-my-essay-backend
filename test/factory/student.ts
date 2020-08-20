import { Factory } from 'rosie';
import UserFactory from './user';
import { UserType } from 'src/user/user';


export default new Factory()
	.extend(UserFactory)
	.attr('__t', UserType.Student);
