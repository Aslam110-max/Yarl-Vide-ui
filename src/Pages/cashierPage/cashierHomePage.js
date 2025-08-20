import React, { useEffect, useState } from "react";
import CashierSearchBar from "../../components/cashierPageComponent/header/searchBar";
import FoodMenu from "../../components/cashierPageComponent/foodMenuPage/foodMenu";
import FoodOrder from "../../components/cashierPageComponent/foodOrderPage/foodOrderPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getMenuDetails } from "../../services/cashierPageApi";
import "./cashierHomePage.css";
import SelectTablePage from "../../components/cashierPageComponent/selectTable/selectTable";
import MobileFoodOrderPage from "../../components/cashierPageComponent/mobileFoodOrderpPage/mobileFoodOrderPage";
import { logout } from "../../services/loginPageApi";
import Navbar from "../../components/Navbar/Navbar";


const CashierHomePage = () => {
  // State for selected foods in the order
  const [selectedFoods, setSelectedFoods] = useState([]);
  // State for the currently selected table
  const [selectedTable, setSelectedTable] = useState("");
  // State to show/hide the table selection page
  const [isShowTable, setIsShowTable] = useState(false);
  // State to show/hide the mobile order page
  const [isShowMobileOrderPage, setIsShowMobileOrderPage] = useState(false);

  // Menu data states
  const [seMenu, setSEMenuData] = useState([]);
  const [mcMenu, setMCMenuData] = useState([]);

  // Fetch menu details on mount
  useEffect(() => {
    getMenuDetails({ setSEMenuData, setMCMenuData });
  }, []);

  // Navigation hook (not currently used)
  const navigate = useNavigate();

  // Handle cart icon click to show mobile order page
  const handleCartIconClick = () => {
    setIsShowMobileOrderPage(true);
    //  navigate('/cashier-home-page/orders');
  };

  // State for search text
  const [searchText, setSearchText] = useState("");

  return (
    <div className="dark:bg-secondary dark:text-white">
      {/* Navbar with search functionality */}
      <Navbar setSearchText={setSearchText}/>

      {/* Conditional rendering for table selection, mobile order, or main page */}
      {isShowTable ? (
        <SelectTablePage
          setSelectedTable={setSelectedTable}
          setIsShowTable={setIsShowTable}
        />
      ) : isShowMobileOrderPage ? (
        <MobileFoodOrderPage
          foods={selectedFoods}
          setSelectedFoods={setSelectedFoods}
          setIsShowTable={setIsShowTable}
          selectedTable={selectedTable}
          setIsShowMobileOrderPage={setIsShowMobileOrderPage}
        />
      ) : (
        <div className="homePage">
          <div className="header-mobile">
            <CashierSearchBar setSearchText={setSearchText} />
            <FontAwesomeIcon
              icon={faCartShopping}
              className="cart-icon"
              onClick={handleCartIconClick}
            />
          </div>
          <div className="menu-row-cashier">
            <FoodMenu
              seMenu={seMenu}
              mcMenu={mcMenu}
              setSelectedFoods={setSelectedFoods}
              searchText={searchText}
            />
            <FoodOrder
              foods={selectedFoods}
              setSelectedFoods={setSelectedFoods}
              setIsShowTable={setIsShowTable}
              selectedTable={selectedTable}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierHomePage;
