import '../db'; // We load them to make sure they exist
import './exposures';
import { load } from 'graphql-load';
import EntitiesModule from './entities';
import AccountsModule from './accounts';
import UserModule from './modules/users';

load([EntitiesModule, AccountsModule, UserModule]);
