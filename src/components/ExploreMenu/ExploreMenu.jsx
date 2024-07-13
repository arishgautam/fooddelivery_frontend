
import PropTypes from 'prop-types';
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((items, index) => (
          <div
            onClick={() => setCategory(prev => prev === items.menu_name ? "All" : items.menu_name)}
            key={index}
            className="explore-menu-list-items"
          >
            <img className={category === items.menu_name ? "active" : ""} src={items.menu_image} alt={items.menu_name} />
            <p>{items.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};


ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default ExploreMenu;
