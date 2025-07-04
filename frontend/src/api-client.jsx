const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const registerUser = async (formadata) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formadata),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formadata) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include", //! this tells the browser to send the http cookies stored in browser along with the request
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formadata),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include", //tells the fetch request to tell browser to send any cookies along with reuest which include http auth token cookie
  });
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Token invalid");
  }
};

export const addMyHotel = async (hotelFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
    method: "POST",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  return response.json();
};

export const fetchMyHotel = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};

export const fetchMyHotelById = async (hotelId) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels//${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("error fetching the hotel");
  }
  return response.json();
};

export const updateMyHotelById = async (hotelData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelData,
      credentials: "include",
    }
  );
  if (!response.ok) {
    return new Error("Failed to fetch update hotel");
  }

  return response.json();
};

export const searcHotels = async (searchParams) => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) => {
    queryParams.append("facilities", facility);
  });

  searchParams.types?.forEach((type) => queryParams.append("types", type));

  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  //console.log(queryParams);

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );
  if (!response.ok) {
    return new Error("Failed to fetch update hotel");
  }

  return response.json();
};

export const fetchHotelById = async (hotelId) => {
  console.log(hotelId, "hotelid");

  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }
  return response.json();
};
