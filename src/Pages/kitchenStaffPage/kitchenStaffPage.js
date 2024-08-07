import { useEffect, useState } from "react";
import KitchenOrderDetailsComponent from "../../components/kitchenStaffComponents/kitchenOrderDetailsComponent";
import "./kitchenStaffPage.css";
import OrderDetailsKitchen from "../../components/kitchenStaffComponents/orderDetailsKitchen";
import { getOrderData } from "../../services/kitchenStaffPageApi";
import Navbar from "../../components/Navbar/Navbar";


const KitchenStaffPage = () => {
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isOrderSelected, setIsOrderSelected] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    getOrderData({ setOrderData });
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (

    <div className="dark:bg-secondary dark:text-white">
      <Navbar setSearchText={setSearchText}/>




      {(isMobileScreen&&isOrderSelected)?<div style={{justifyContent:"center",width:"100%",height:"100%"}}>
        <OrderDetailsKitchen
            orderId={orderId}
            dateAndTime={dateAndTime}
            setIsOrderSelected={setIsOrderSelected}
            ordersDetails={ordersDetails}
          />
      </div>:
      <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            className={`kitchen-titles`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom:"20px",
            }}
          >
            <div className="kitchen-page-titleContainer dark:bg-gray-900 dark:text-white">
              <div className="kitchen-page-row">
                <div className="kitchen-page-label">OrderID</div>
                <div className="kitchen-page-label">Date and Time</div>
                <div className="kitchen-page-label">Status</div>
              </div>
            </div>
          </div>
          <div className="kitchen-order-details">
            <div className="detailsContainer dark:bg-secondary dark:text-white">
              {orderData.map((dataItem) => (
                <div key={dataItem.OrderID} className="kitchen-order-row">
                  {dataItem.OrderID.toString().includes(searchText) ? (
                    <KitchenOrderDetailsComponent
                      id={dataItem.OrderID}
                      dateAndTime={
                        dataItem.DateAndTime.replace("T", " ").split(":")[0] +
                        ":" +
                        dataItem.DateAndTime.replace("T", " ").split(":")[1]
                      }
                      setIsOrderSelected={setIsOrderSelected}
                      setOrderId={setOrderId}
                      setDateAndTime={setDateAndTime}
                      foodStatus = {dataItem.FoodStatus}
                      setOrdersDetails={setOrdersDetails}
                    />
                  ) : (
                    <div></div>
                  )}
                  <div />
                </div>
              ))}
            </div>
          </div>
        </div>
        {!isMobileScreen&& isOrderSelected && (
          <OrderDetailsKitchen
            orderId={orderId}
            dateAndTime={dateAndTime}
            setIsOrderSelected={setIsOrderSelected}
            ordersDetails={ordersDetails}
          />
        )}
      </div>
    </div>
      
    }
    </div>
  );
};
export default KitchenStaffPage;