import { useSelector } from 'react-redux';

const Loader = () => {

    //fetching loader state from store
    const isLoading = useSelector((state: {loader: {loading: boolean}}) => state.loader.loading); // Access loader state from Redux store

    if (!isLoading) {
      return null; // If loading state is false, do not render the loader
    }
  
    return (
      <div className="loader-overlay">
        <div className="loader"></div>
      </div>
    );
}

export default Loader;