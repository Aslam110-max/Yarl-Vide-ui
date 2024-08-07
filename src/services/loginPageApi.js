const API_URL = "http://localhost:5136/";

//login
export const login = async (loginData) => {
  try {
    const response = await fetch(API_URL + "Login/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }
    if (response.ok) {
      localStorage.setItem("user", loginData.username);
      // getUser()
      document.location = "/";
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
// Logout function
export const logout = async () => {
  try {
    const response = await fetch(API_URL + "Login/logout");
    if (!response.ok) {
      throw new Error(`Failed to logout: ${response.statusText}`);
    } else {
      console.log("Logged out");
      // alert("Logout " + localStorage.getItem("user"));
      document.location = ""; 
    }
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error logging out:", error);
    alert(`Error logging out: ${error.message}`);
    throw error;
  }
};
export const getUser = async () => {
  try {
    const response = await fetch(API_URL + "Login/getUser", {
      method: "GET",
    });
    console.log(response)

    if (!response.ok) {
      throw new Error("Failed to login");
    }
    if (response.ok) {
      localStorage.setItem("user", );
      document.location = "/";
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};