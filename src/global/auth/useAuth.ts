import { useContext } from 'react';
import { AuthContext } from './jwtContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
