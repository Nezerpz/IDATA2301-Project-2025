export async function refreshToken() {
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/refresh-token", {
            method: "POST",
            credentials: "include", // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        localStorage.setItem("jwt", data["accessToken"]);
        return data["accessToken"];
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
}


export async function fetchJSON(endpoint, options = {}) {
    let response = await fetchWithAuth(endpoint, options)
    let data = await response.json()
    return data
}

export async function fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem("jwt");
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + ":" +
            import.meta.env.VITE_BACKEND_PORT + endpoint,
            {...options, headers }
        )

        // Refresh token if expired
        if (response.status === 401) {
            try {
                const newToken = await refreshToken();
                headers.Authorization = `Bearer ${newToken}`;
                const retryResponse = await fetch(url, { ...options, headers });

                if (!retryResponse.ok) {
                    throw new Error(`Retry failed with status: ${retryResponse.status}`);
                }

                return retryResponse;
            } 

            catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                throw new Error("Failed to refresh token and retry request.");
            }
        }

        if (!response.ok) {
            console.log(response)
            throw new Error(`Request failed with status: ${response.status}`);
        }

        return response;
    } 

    catch (error) {
        console.error("Error in fetchWithAuth:", error);
        throw error;
    }
}
