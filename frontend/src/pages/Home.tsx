import { Navigate } from 'react-router';
import useAuthStore, { AuthStore } from '../store';

const Home = () => {
    const store:AuthStore = useAuthStore()


    if (store.token==="") {
        return <Navigate to="/login" />;
    } else {
        return <Navigate to="/todos" />;
    }
};

export default Home;
