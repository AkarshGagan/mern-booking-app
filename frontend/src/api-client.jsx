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
  console.log(responseBody);
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
  console.log(responseBody);
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
  console.log(response, "response");
  console.log(Boolean(response.ok));
  if (!response.ok) {
    throw new Error("Token invalid");
  }
};
