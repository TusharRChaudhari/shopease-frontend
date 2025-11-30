const API_URL = "http://localhost:8080";

export function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  const token = getToken();
  console.log("Token:", token ? "exists" : "none");
  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  return {
    "Content-Type": "application/json",
  };
}

async function handleResponse(res, path, method) {
  console.log(`${method} ${path}:`, res.status, res.statusText);
  
  if (res.status === 204) {
    return null;
  }
  if (!res.ok) {
    let msg = `${method} ${path} failed with status ${res.status}`;
    try {
      const data = await res.json();
      console.error("Error response:", data);
      if (data && data.message) {
        msg = data.message;
      }
    } catch (e) {
      console.error("No JSON error response");
    }
    throw new Error(msg);
  }
  try {
    const data = await res.json();
    console.log(`${method} ${path} success:`, data);
    return data;
  } catch (e) {
    console.error("No JSON response:", e);
    return null;
  }
}

export async function apiGet(path) {
  console.log("Calling GET:", path);
  const res = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: authHeaders(),
  });
  return handleResponse(res, path, "GET");
}

export async function apiPost(path, body) {
  console.log("Calling POST:", path, body);
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(res, path, "POST");
}

export async function apiPut(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(res, path, "PUT");
}

export async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(res, path, "DELETE");
}
