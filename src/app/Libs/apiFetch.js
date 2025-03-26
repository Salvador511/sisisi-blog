const apiFetch = async ({ payload, method = 'GET', url, token = '' }) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    if (payload) {
      options.body = JSON.stringify(payload)
    }
    const response = await fetch(url, options)
    return response.json()
  } catch (err) {
    return { error: err }
  }
}

export default apiFetch