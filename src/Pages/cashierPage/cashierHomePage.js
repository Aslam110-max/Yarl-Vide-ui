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
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [isShowTable, setIsShowTable] = useState(false);
  const [isShowMobileOrderPage, setIsShowMobileOrderPage] = useState(false);
  // Calling Api
  const [seMenu, setSEMenuData] = useState([]);
  const [mcMenu, setMCMenuData] = useState([]);
  useEffect(() => {
    getMenuDetails({ setSEMenuData, setMCMenuData });
  }, []);
  /////////////////////////////////
  const navigate = useNavigate();
  const handleCartIconClick = () => {
    setIsShowMobileOrderPage(true);
    //  navigate('/cashier-home-page/orders');
  };
  const [searchText, setSearchText] = useState("");
  return (

    <div className="dark:bg-secondary dark:text-white">
      <Navbar setSearchText={setSearchText}/>




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
